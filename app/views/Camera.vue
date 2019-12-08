<template>
    <Page enableSwipeBackNavigation="true">
        <!-- <TabView >
          <TabViewItem title="Location">
            <StackLayout verticalAlignment="center">
                <Label horizontalAlignment="center" >Please Select Bodypart</Label>
                <BodyPartSelector class="xdxd"  horizontalAlignment="center"/>
            </StackLayout>
          </TabViewItem>
          <TabViewItem class="color" title="Photo">
            <StackLayout verticalAlignment="center">
                <FlexboxLayout justifyContent="space-between">
                    <Button class="button-solid" @tap="takePhoto">Take photo</Button>
                    <Button class="button-solid" textWrap=true @tap="openGalery">Select photo from gallery</Button>
                </FlexboxLayout>
                <Image :src="pictureSource ? pictureSource : '~/assets/camera/dummyImage.png'"/>
            </StackLayout>
          </TabViewItem>
          <TabViewItem title="Aditional Info">
            <StackLayout>
                <Label text="This is Label in Tab 2" />
                <Button class="button-solid" v-if="pictureSource" @tap="sendPhoto">Send Photo</Button>
            </StackLayout>
          </TabViewItem>
        </TabView> -->




        <BottomNavigation>
          <TabStrip>
            <TabStripItem>
              <Label text="Location"></Label>
            </TabStripItem>
            <TabStripItem>
              <Label text="Photo"></Label>
            </TabStripItem>
            <TabStripItem>
              <Label text="Info"></Label>
            </TabStripItem>
          </TabStrip>
          <TabContentItem>
            <StackLayout verticalAlignment="center">
                <Label horizontalAlignment="center" >Please Select Bodypart</Label>
                <SegmentedBar class="wrapper">
                    <SegmentedBarItem title="Front" />
                    <SegmentedBarItem title="Back" />
                    </SegmentedBar>
                <BodyPartSelector @selectionChange="changeSelection" class="xdxd"  horizontalAlignment="center"/>
            </StackLayout>
          </TabContentItem>
          <TabContentItem>
            <StackLayout verticalAlignment="center">
                <FlexboxLayout justifyContent="space-between">
                    <Button class="button-solid" @tap="takePhoto">Take photo</Button>
                    <Button class="button-solid" textWrap=true @tap="openGalery">Select photo from gallery</Button>
                </FlexboxLayout>
                <Image :src="pictureSource ? pictureSource : '~/assets/camera/dummyImage.png'"/>
            </StackLayout>
          </TabContentItem>
          <TabContentItem>
            <StackLayout>
                <FlexboxLayout justifyContent="space-between">
                    <Label class="bodyPartSum" >Location : {{getName(bodyPart)}}</Label>
                    <Image class="small bodyPartSum" :src="pictureSource ? pictureSource : '~/assets/camera/dummyImage.png'"/>
                </FlexboxLayout>
                <TextField hint="Provide additional info"/>
                <TextField hint="Provide name"/>
                <FlexboxLayout justifyContent="center">
                    <Label text="notification" textWrap="true" />
                    <Switch  />
                </FlexboxLayout>
                
                
                
                <Button class="button-solid" :enable="pictureSource" @tap="sendPhoto">Send Photo</Button>

            </StackLayout>
          </TabContentItem>
        </BottomNavigation>
        
        <!-- <ScrollView>
            <StackLayout class="wrapper" >
                
                
            </StackLayout>
        </ScrollView> -->
        
    </Page>
</template>
<script lang="ts">
    import * as camera from "nativescript-camera";
    import * as imagepicker from "nativescript-imagepicker";
    import { Image } from "tns-core-modules/ui/image";
    import BodyPartSelector from '@/components/bodypartSelector/BodyPartSelector.vue'
    import Vue from 'vue';
    import App from '@/views/App.vue';
    const imageSourceModule = require("tns-core-modules/image-source");
    import { path, knownFolders } from "tns-core-modules/file-system";

    export default {
        name: 'Camera',
        components: {
            BodyPartSelector
        },
        data() {
            return {
                image: {} as Image,
                selectedSpace: '',
                pictureSource : '',
                newFilename : '',
                bodyPart: '',
                locationButton: 'notYet',
                photoButton: 'notYet',
                infoButton: 'notYet'       
            }
        },
       
        methods: {

            takePhoto() {
                camera.takePicture({ width: 200, height: 200, keepAspectRatio: true, saveToGallery: false})
                    .then( imageAsset => {
                        this.pictureSource = '1';
                        imageSourceModule.fromAsset(imageAsset).then(
                            savedImage => {
                                console.log("saving to file");
                                let filename ="xdddd.jpg";
                                let folder = knownFolders.documents();
                                let fullpath = path.join(folder.path, filename);
                                savedImage.saveToFile(fullpath, "jpeg");
                                this.pictureSource = fullpath;
                                // this.pictureSource = 'xdxd';
                                this.newFilename = filename;
                            }
                        )
                        // let image = new Image();
                        // image.src = imageAsset;
                        // this.image = image;
                    })
                    .catch(err => {
                        console.log("Error -> " + err.message);

                    }); 
            },
            openGalery () {
                let context = imagepicker.create({ mode: "single" });
                context.authorize()
                    .then(() => context.present())
                    .then(selected => {
                        let image = new Image();
                        image.src = selected[0];
                        this.image = image;
                    }).catch( err => {
                        console.log("Error -> " + err.message);                    
                    });
            },
            changeSelection(name){
                this.bodyPart = name;
            },
            getName(key){
                if(key === '') return 'Not selected'
                let array = [...key],
                result = '',
                firstUpper = array.findIndex(x => x === x.toUpperCase());
                array[0] = array[0].toUpperCase();
                if(firstUpper !== -1){
                    array = array.join('');
                    let firstPart = array.substr(0, firstUpper),
                    secondPart = array.substr(firstUpper)
                    result = `${firstPart} ${secondPart}`
                }
                else result = array.join('');

                return result;


        },
            sendPhoto() {
                //TODO 
                if( this.bodyPart && this.pictureSource){
                    confirm('Are you sure you want to submit this form?')
                    .then(result => {
                        console.log(result)
                            this.$store.dispatch('saveImage', {src: this.pictureSource, part: this.bodyPart});
                            console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
                        
                    });
                }
                else {
                    alert('Photo or bodypart is not selected.')
                }

                
            }
        },
    }
</script>
<style lang="scss" scoped>
    Button, .button-solid{
        width: 45%;
        margin: 10 20;
        height: 50;
        text-align: center;
    }
    Image{
        // height: 1400px;
        // margin: 0 10 100;
        width: 100%
    }
    .small{
        width: 40%;
    }
    .wrapper {
        width: 90%;
        height: 50;
        margin-top:10;
    }
    .xdxd{
        // margin: 0 0;
        // margin-left: 80;
        // margin-top: 20;
        // margin-bottom: 20;
        // height: 300;
        // width: 100%;
        // height: 500;
        margin-top: 30;
    }
    .bodyPartSum{
        margin: 20;
    }
    Label{
        margin-top: 20;
        text-align: center;
        // color: red;
    }
    .color{
        background-color: blue;
    }
    .notSelected{
        // color: red;
    }
    .selected{
        color: green
    }
    TextField{
        // height: 100
    }
    
</style>
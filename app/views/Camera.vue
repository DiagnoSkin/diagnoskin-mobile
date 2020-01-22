<template>
    <Page enableSwipeBackNavigation="true">
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
                <Button class="button-solid smaller" @tap="selectPhoto">Select photo</Button>
                <GridLayout rows="auto" columns="*">
                    <Image ref="imageSize" class="photo" :src="pictureSource ? pictureSource : '~/assets/camera/dummyImage.png'" row="0" col="0" />
                    <AbsoluteLayout row="0" col="0" @pinch="larger">
                      <Image v-if="pictureSource ? true : false" :style="getIndicatorSize"  src="~/assets/navigation/marker.png"  :top="y"   :left="x" @pan="move" />
                    </AbsoluteLayout>
                </GridLayout>
            </StackLayout>
          </TabContentItem>
          <TabContentItem>
            <StackLayout verticalAlignment="center">
                <FlexboxLayout justifyContent="space-between">
                    <Label class="bodyPartSum">Location : {{getName(bodyPart)}}</Label>
                    <Image class="small bodyPartSum" :src="pictureSource ? pictureSource : '~/assets/camera/dummyImage.png'"/>
                </FlexboxLayout>
                <TextField v-model="addidtionalInfo" hint="Provide additional info"/>
                <TextField v-model="nameText" hint="Provide name"/>
                <Button class="button-solid" :enable="pictureSource" @tap="sendPhoto">Send Photo</Button>
            </StackLayout>
          </TabContentItem>
        </BottomNavigation>
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
import { ImageSource, fromFile, fromAsset, fromBase64 } from 'tns-core-modules/image-source/image-source';
import firebase from 'nativescript-plugin-firebase';
import axios from 'axios';
import ResponseView from '@/views/Response.vue'

export default {
    name: 'Camera',
    components: {
        BodyPartSelector
    },
    data() {
        return {
            x: 100,
            y: 100,
            lastX: 100,
            lastY: 100,
            scale: 1,
            indicatorSize: 150,
            lastIndicatorSize: 150,
            lastScale: 1,
            nameText : '',
            addidtionalInfo: '',
            selectedSpace: '',
            pictureSource : '',
            resultPictureSource: '',
            newFilename : '',
            bodyPart: '',
            locationButton: 'notYet',
            photoButton: 'notYet',
            infoButton: 'notYet',
            imageSource: {} as ImageSource
        }
    },
    computed: {
        getIndicatorSize: function () {
            return {
                'height' : `${this.indicatorSize}`,
                'width' : `${this.indicatorSize}`
            }
        }
    },
    methods: {
        move(a) {
            let x = Object.keys(a);
            // alert(a.state)
            
            if(a.state === 3){
                // console.log("xdddddd")
                this.lastX = this.x;
                this.lastY = this.y;
            }
            else{
                if(this.lastX + a.deltaX > 0 && this.lastY + a.deltaY > 0){
                    this.x = this.lastX + a.deltaX;
                    this.y = this.lastY + a.deltaY;
                    console.log(this.x, this.y)
                }
                
            }
            // console.log(this.x, this.y)

            
            
        },
        larger(a){
            let last = this.indicatorSize;
            this.indicatorSize = a.scale * this.lastIndicatorSize;
            if(a.scale >= 1){
                this.x -= (this.indicatorSize - last) / 2;
                this.y -= (this.indicatorSize - last) / 2;
                
            }
            else if(a.scale < 1){
                this.x += (last - this.indicatorSize) / 2;
                this.y += (last - this.indicatorSize) / 2;
                
            }
            if(a.state === 3){
                this.lastIndicatorSize = this.indicatorSize
                this.lastX = this.x;
                this.lastY = this.y;
            }
            
        },
        selectPhoto() {
            action("Select image source", "Cancel", ["Camera", "Gallery"])
                .then(result => {
                    console.log(result);
                    if(result === 'Camera'){
                        this.takePhoto()
                    } else {
                        this.selectFromGallery()
                    }
                }); 
        },
        takePhoto() {
            camera.takePicture({ width: 200, height: 200, keepAspectRatio: true, saveToGallery: false})
                .then( imageAsset => {
                    this.imageAsset = imageAsset
                    imageSourceModule.fromAsset(imageAsset).then(
                        savedImage => {
                            let filename ="xdddd.jpg" + Math.ceil(Math.random() * 100000);
                            let folder = knownFolders.documents();
                            let fullpath = path.join(folder.path, filename);
                            savedImage.saveToFile(fullpath, "jpeg");
                            this.pictureSource = fullpath;
                            this.newFilename = filename;
                        }
                    )
                })
            .catch(err => {
                console.log("Error -> " + err.message);
            }); 
        },
        selectFromGallery() {

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
        async sendPhoto() {
            let radius = this.indicatorSize/2;
            let objectToSend = {
                imageSize : this.$refs.imageSize.nativeView.getActualSize(),
                pictureSource : this.pictureSource,
                radius : radius,
                center : [this.lastX + radius, this.lastY + radius]
            };
            let objectToSave = {
                src: this.pictureSource,
                part: this.bodyPart,
                name: this.nameText,
                info: this.addidtionalInfo,
                side: 'front'
            };
            //TODO 
            if( this.bodyPart && this.pictureSource){
                confirm('Are you sure you want to submit this form?')
                .then(result => {
                    // console.log(result)
                    // this.$store.dispatch('saveImage', {src: this.pictureSource, part: this.bodyPart, name:this.nameText, info: this.addidtionalInfo, side: 'front'});
                    if(result){
                        this.$navigateTo(ResponseView, {
                            props: {
                                objectToSave,
                                objectToSend,
                                buttons : true,
                            },
                            clearHistory: true 
                        });
                    }
                    
                });
            }
            else {
                alert('Photo or Bodypart is not selected.')
            }
            

            
        },
        
    }
}
</script>
<style lang="scss" scoped>
    .photo{
        // height: 1400px;
        // margin: 0 10 100;
        width: 100%
    }
    .small{
        width: 40%;
    }
    .smaller{
        width: 70%;
    }
    .wrapper {
        width: 90%;
        height: 50;
        margin-top:10;
    }
    .xdxd{
        margin-top: 30;
    }
    .bodyPartSum{
        margin: 20;
    }
    Label{
        margin-top: 20;
        text-align: center;
    }
    .color{
        background-color: blue;
    }
    .selected{
        color: green
    }

    
</style>
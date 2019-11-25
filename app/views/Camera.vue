<template>
    <Page enableSwipeBackNavigation="true">
        <ScrollView>
            <StackLayout class="wrapper" >
                <ListPicker :items="sapcesList" v-model="selectedSpace" />
                <FlexboxLayout justifyContent="space-between">
                    <Button class="button-solid" @tap="takePhoto">Take photo</Button>
                    <Button class="button-solid" textWrap=true @tap="openGalery">Select photo from gallery</Button>
                </FlexboxLayout>
                <Image :src="image.src ? image.src : '~/assets/camera/dummyImage.png'"/>
                <Button class="button-solid" v-if="image.src" @tap="sendPhoto">Send Photo</Button>
            </StackLayout>
        </ScrollView>
        
    </Page>
</template>
<script lang="ts">
    import * as camera from "nativescript-camera";
    import * as imagepicker from "nativescript-imagepicker";
    import { Image } from "tns-core-modules/ui/image";
    export default {
        name: 'Camera',
        data() {
            return {
                image: {} as Image,
                sapcesList: ['arm', 'head', 'leg', 'shoulder', 'forearm', 'hand'] as String[],
                selectedSpace: ''             
            }
        },
        methods: {
            takePhoto() {
                camera.takePicture({ width: 200, height: 200, keepAspectRatio: true, saveToGallery: false})
                    .then( imageAsset => {
                        let image = new Image();
                        image.src = imageAsset;
                        this.image = image;
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
            sendPhoto() {
                //TODO 
                confirm('Are you sure you want to submit this form?')
                    .then(result => {
                        console.log(result);
                    });
            }
        },
    }
</script>
<style lang="scss" scoped>
    Button{
        width: 45%;
        margin: 0px 60px 100px;
        height: 200px;
    }
    ListPicker{
        height: 400px
    }
    Image{
        // height: 1400px;
        margin: 0 60px 100px;
    }
    
</style>
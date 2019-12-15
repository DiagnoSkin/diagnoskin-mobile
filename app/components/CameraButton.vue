<template>
    <Button text="add" @tap="buttonClicked" />
</template>
<script lang="ts">
    
    import * as camera from "nativescript-camera";
    const imageSourceModule = require("tns-core-modules/image-source");
    import { path, knownFolders } from "tns-core-modules/file-system";
    import ImageAdd from '@/modals/ImageAdd.vue'

    const Detail = {
    template: `
        <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
            <Image :src="pictureSource" stretch="aspectFit" />
            <Button @tap="$modal.close" text="XDDDDDD" />
            <Button @tap="$modal.close" text="Close" />
            </StackLayout>
        </Page>
        </Frame>
    `}

    export default {
        name: 'CameraButton',
        components: {
        },
        props: {
            image: String 
        },
        data() {
            return {
                photos: [],
                img: '',
                pictureSource:'',
                newFilename: ''
            }
        },
        computed: {
           
        },
       
        methods: {
            buttonClicked(){
                action("Your message", "Cancel button text", ["Aparat", "Galeria"])
                    .then(result => {
                        console.log(result);
                        if(result === 'Aparat'){
                                    // this.$showModal(Detail);

                            camera.takePicture({ width: 200, height: 200, keepAspectRatio: true, saveToGallery: false})
                                .then( imageAsset => {
                                    imageSourceModule.fromAsset(imageAsset).then(
                                        savedImage => {
                                            console.log("saving to file");
                                            let filename ="xdddd.jpg";
                                            let folder = knownFolders.documents();
                                            let fullpath = path.join(folder.path, filename);
                                            savedImage.saveToFile(fullpath, "jpeg");
                                            this.pictureSource = fullpath;
                                            this.newFilename = filename;
                                            setTimeout(() => {
                                                this.$showModal(ImageAdd, { props: { src: fullpath }});
                                            },800)
                                        }
                                    )
                                })
                        }
                    });
            }
        },
        watch: {
           
        }
    }
</script>

<style lang="scss" scoped>
    Image{
        height: 200;
    }
</style>
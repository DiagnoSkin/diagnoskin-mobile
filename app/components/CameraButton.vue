<template>
    <Button class="addButton margin" text="" @tap="buttonClicked" />
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
                action("Select image source", "Cancel", ["Camera", "Gallery"])
                    .then(result => {
                        console.log(result);
                        if(result === 'Camera'){
                            camera.takePicture({ width: 200, height: 200, keepAspectRatio: true, saveToGallery: false})
                                .then( imageAsset => {
                                    imageSourceModule.fromAsset(imageAsset).then(
                                        savedImage => {
                                            console.log("saving to file");
                                            let filename =`xdd${new Date().getTime()}.jpg`;
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
    .addButton{
        background-image: url('~/assets/navigation/addButton.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        height: 125px;
        width: 125px;
    }  
    .margin{
        margin: 50px;
    }
</style>
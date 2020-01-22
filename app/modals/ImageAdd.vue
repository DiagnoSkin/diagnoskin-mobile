<template>
    <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
                <GridLayout rows="auto" columns="*">
                    <Image ref="imageSize" :src="src" stretch="aspectFit" row="0" col="0"/>
                    <AbsoluteLayout row="0" col="0" @pinch="larger">
                      <Image  :style="getIndicatorSize" src="~/assets/navigation/marker.png"  :top="y"   :left="x" @pan="move" />
                    </AbsoluteLayout>
                </GridLayout>
                <Button class="button-solid" @tap="sendPhoto" text="Send"/>
                <Button class="button-solid" @tap="$modal.close" text="Close" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script>
import ResponseView from '@/views/Response.vue'

export default {
    props: {
        src: String
    },
    data(){
        return {
            x: 100,
            y: 100,
            lastX: 100,
            lastY: 100,
            scale: 1,
            indicatorSize: 150,
            lastIndicatorSize: 150,
            lastScale: 1,
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
        sendPhoto(){
            
            this.$store.dispatch('saveAdditionalImage', {src: this.src});
            let radius = this.indicatorSize/2;
            let objectToSend = {
                imageSize : this.$refs.imageSize.nativeView.getActualSize(),
                pictureSource : this.src,
                radius : radius,
                center : [this.lastX + radius, this.lastY + radius]
            }
            let objectToSave = {}
            this.$modal.close()
            this.$navigateTo(ResponseView, {
                props: {
                    objectToSave,
                    objectToSend,
                    buttons: false
                }
            });
        },
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
                    // console.log(this.x, this.y)
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
    }
}
</script>

<style scoped>
    Image{
        /* height: 70%; */
    }
</style>
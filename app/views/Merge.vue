<template>
    <Page enableSwipeBackNavigation="true">
        <StackLayout>
            <!-- <Label  textWrap="true" >{{`${v1} ${v2} ${v3}`}}</Label> -->
            
            <SegmentedBar  v-model="selected" @selectedIndexChange="onSelectedIndexChange">
                <SegmentedBarItem title="First" />
                <SegmentedBarItem title="Second" />
                <SegmentedBarItem title="Third" />
            </SegmentedBar>
            <Slider  v-model="value" minValue="0" maxValue="100"/>
            <GridLayout rows="*" columns="*">
                <Image :style="v1o" class="transparent" src="~/assets/examples/stan1.png" row="0" col="0" />
                <Image :style="v2o" class="transparent" src="~/assets/examples/stan2.png" row="0" col="0" />
                <Image :style="v3o" class="transparent" src="~/assets/examples/stan3.png" row="0" col="0" />
            </GridLayout>
        </StackLayout>
        
    </Page>
</template>
<script lang="ts">
    

    export default {
        name: 'MergeView',
        components: {
        },
        data() {
            return {
                selected: 0,
                v1: 50,
                v2: 30,
                v3: 20,
                value: 50
            }
        },
        computed: {
            v1o: function () {
                return {
                    'opacity' : `${this.v1/100}`
                }
            },
            v2o: function () {
                return {
                    'opacity' : `${this.v2/100}`
                }
            },
            v3o: function () {
                return {
                    'opacity' : `${this.v3/100}`
                }
            }
        },
       
        methods: {
            onSelectedIndexChange (e) {
                switch (this.selected){
                    case 0:
                        this.value = this.v1
                        break;
                    case 1:
                        this.value = this.v2
                        break;
                    case 2:
                        this.value = this.v3
                        break;
                }
            }
        },
        watch: {
            value(newValue, oldValue){
                switch (this.selected){
                    case 0:
                        this.v1 = newValue
                        break;
                    case 1:
                        this.v2 = newValue
                        break;
                    case 2:
                        this.v3 = newValue
                        break;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
   .transparent{
    //    opacity: 0.3;
   }
   Image{
       margin: 0 10;
   }
   Slider{
       margin: 0 10;
       margin-top: 20;
   }
   SegmentedBar{
       height: 50;
   }
//    GridLayout{
//        width: 100%;
//    }
    
</style>
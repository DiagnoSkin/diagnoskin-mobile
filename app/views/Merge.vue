<template>
    <Page enableSwipeBackNavigation="true">
        <StackLayout>
            <!-- <Label  textWrap="true" >{{`${v1} ${v2} ${v3}`}}</Label> -->
            
            <SegmentedBar  v-model="selected" @selectedIndexChange="onSelectedIndexChange">
                <SegmentedBarItem title="First" v-if="src1"/>
                <SegmentedBarItem title="Second" v-if="src2"/>
                <SegmentedBarItem title="Third" v-if="src3"/>
            </SegmentedBar>
            <Slider  v-model="value" minValue="0" maxValue="100"/>
            <GridLayout rows="*" columns="*">
                <Image v-if="src1" :style="v1o" class="transparent" :src="src1" row="0" col="0" />
                <Image v-if="src2" :style="v2o" class="transparent" :src="src2" row="0" col="0" />
                <Image v-if="src3" :style="v3o" class="transparent" :src="src3" row="0" col="0" />
                <!-- <Image v-for="item in imagesArray" :src="item.src" :key="item.id" row="0" col="0"/> -->
            </GridLayout>
        </StackLayout>
        
    </Page>
</template>

<script lang="ts">
    

    export default {
        name: 'MergeView',
        components: {
        },
        props: ['images'],
        data() {
            return {
                imagesArray: [],
                selected: 0,
                v1: 50,
                v2: 30,
                v3: 20,
                value: 50,
                src1: '',
                src2: '',
                src3: ''
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
        },
        created(){
            
            this.images.forEach(element => {
                console.log(element)
            });
            this.src1 = '';
            this.src2 = '';
            this.src3 = '';
            this.src1 = this.images[0];
            this.src2 = this.images[1];
            this.src3 = this.images[2];
            // this.imagesArray = this.images.map((e, nr) => {
            //     return {
            //         id: nr,
            //         src : e,
            //         v: 0.5
            //     }
            // })
            // alert(this.images.length)
        }
    }
</script>
<style lang="scss" scoped>
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
</style>
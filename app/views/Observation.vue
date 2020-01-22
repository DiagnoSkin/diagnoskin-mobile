<template>
    <Page enableSwipeBackNavigation="true">
        
        <StackLayout>
            <GridLayout columns="5*, *, *, *" rows="auto" >
                <Label  row="0" col="0" class="margin titleLable" :text="observation.nickname || 'Obesrvation'"></Label>
                <Button row="0" col="2" v-if="!mergeMode"  @tap="turnOnMergeMode" class="merge buttonIcon"/>
                <Button row="0" col="1" v-if="mergeMode"  @tap="cancelMerge" class="cancel buttonIcon"/>
                <Button row="0" col="2" v-if="mergeMode"  @tap="goMerge" class="go buttonIcon"/>
                <CameraButton row="0" col="3"/>
            </GridLayout>
            <Label text="Body Part"/>
            <Label :text="getName(observation.part)"/>
            <Label text="First Date"/>
            <Label :text="getDate(observation.date)"/>
            <StackLayout verticalAlignment="center" v-if="!photosLoaded" class="full">
                <ActivityIndicator :busy="!photosLoaded"  />
                <FlexboxLayout justifyContent="space-around">
                    <Label text="Waiting for data" textWrap="true" />  
                </FlexboxLayout>
            </StackLayout>
            <ListView v-if="photosLoaded" for="item in photos" @itemTap="onItemTap">
                <v-template>
                    <FlexboxLayout justifyContent="space-between" alignItems="center">
                        <Label :text="getDate(item.date)" textWrap="true" order="2"/>
                        <Switch v-if="item.merge" v-model="item.selected" order="1"/>
                        <Image :src="item.src" stretch="aspectFit" order="3"/>
                    </FlexboxLayout>
                    
                </v-template>
            </ListView>
            
        </StackLayout>
        
    </Page>
</template>
<script lang="ts">
    import ImageModal from '@/modals/Image.vue'
    import CameraButton from '@/components/CameraButton.vue'
    import MergeView from '@/views/Merge.vue'
    export default {
        name: 'Observation',
        components: {
            CameraButton
        },
        data() {
            return {
                mergeMode: false,
                photosLoaded: false,
                photos: [],
                obervation: {}
            }
        },
        computed: {
           
        },
       
        methods: {
            onItemTap(e){
                this.$showModal(ImageModal, { props: { src: e.item.src }});
                // alert(this.observation.part)
            },
            goMerge(){
                let selectedImages = []
                this.photos.forEach(element => {
                    if(element.selected) selectedImages.push(element.src);
                })
                while(selectedImages.length < 3){
                    selectedImages.push('')
                }
                this.cancelMerge();
                console.log("xdxd--------------merge")
                this.$navigateTo(MergeView, {
                    props: {
                        images: selectedImages,
                    }
                });
            },
            cancelMerge(){
                this.mergeMode = false;
                this.photos.forEach(element => {
                    element.merge = this.mergeMode;
                    element.selected = false;
                });
            },
            turnOnMergeMode(){
                this.mergeMode = true;
                this.photos.forEach(element => {
                    element.merge = this.mergeMode;
                });
            },
            getDate(data){
            let date = new Date(data),
                month = date.getMonth() + 1,
                day = date.getDate(),
                year = date.getFullYear();
            return `${day < 10 ? '0' + day: day}.${month < 10 ? '0' + month:month}.${year}`

            },
            getName(key){
                if(key === '') return 'Not selected'
                let array = [...key],
                result = '',
                firstUpper = array.findIndex(x => x === x.toUpperCase());
                array[0] = array[0].toUpperCase();
                if(firstUpper !== -1){
                    let arrayString = array.join('');
                    let firstPart = arrayString.substr(0, firstUpper),
                    secondPart = arrayString.substr(firstUpper)
                    result = `${firstPart} ${secondPart}`
                }
                else result = array.join('');

                return result;


            },
        },
        watch: {
           
        },
        async created() {
            this.observation = this.$store.getters.getCurrentObservation;
            // this.observation.date = new Date(this.observation.date)
            await this.$store.dispatch('getObservationPhotos')
            this.photos = this.$store.getters.getObservationPhotos;

            this.photos = this.photos.map(elemenet => {
                return {
                    src: elemenet.downloadedFile,
                    date: elemenet.date,
                    merge: false,
                    selected: false
                }
            })
            this.photos.sort((a,b) => {
                return a.date - b.date;
            })

            this.photosLoaded = true;
            console.log(this.img)
        }
    }
</script>

<style lang="scss" scoped>
    Image{
        height: 200;
    }
    ListView{
        height: 80%;
    }
    .addButton{
        background-image: url('~/assets/navigation/addButton.png');
        
    }
    .buttonIcon{
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        height: 125px;
        width: 125px;
    }
    .merge{
        background-image: url('~/assets/navigation/merge.png');
    }
    .cancel{
        background-image: url('~/assets/navigation/cancel.png');
    }
    .go{
        background-image: url('~/assets/navigation/accept.png');
    }
    .full{
        height: 100%;
    }
</style>
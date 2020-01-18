<template>
    <Page enableSwipeBackNavigation="true">
        
        <StackLayout>
            <GridLayout columns="*, *, *, *" rows="auto" >
                <Label  row="0" col="0" class="margin titleLable" :text="observation.nickname || 'Obesrvation'"></Label>
                <Button row="0" col="2" v-if="!mergeMode" text="merge" @tap="turnOnMergeMode" />
                <Button row="0" col="1" v-if="mergeMode" text="cancel" @tap="cancelMerge" />
                <Button row="0" col="2" v-if="mergeMode" text="go" @tap="goMerge" />
                <CameraButton ow="0" col="3"/>
            </GridLayout>
            <Label :text="observation.part" textWrap="true" />
            <Label :text="observation.date" textWrap="true" />
            
            <ActivityIndicator :busy="!photosLoaded"  />
            <ListView v-if="photosLoaded" for="item in photos" @itemTap="onItemTap">
                <v-template>
                    <FlexboxLayout justifyContent="space-between" alignItems="center">
                        <Switch v-if="item.merge" v-model="item.selected" />
                        <Image :src="item.src" stretch="aspectFit" />
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
                // this.$showModal(ImageModal, { props: { src: e.item }});
                alert(this.observation.part)
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
            }
        },
        watch: {
           
        },
        async created() {
            this.observation = this.$store.getters.getCurrentObservation;
            this.observation.date = new Date(this.observation.date)
            await this.$store.dispatch('getObservationPhotos')
            this.photos = this.$store.getters.getObservationPhotos;

            this.photos = this.photos.map(elemenet => {
                return {
                    src: elemenet,
                    merge: false,
                    selected: false
                }
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
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        height: 150px;
        width: 150px;
    }   
</style>
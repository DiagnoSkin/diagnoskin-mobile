<template>
    <Page enableSwipeBackNavigation="true">
        
        <StackLayout>
            <FlexboxLayout justifyContent="space-between" alignItems="center">
                <Label class="margin titleLable" text="Observations"></Label>
                <CameraButton/>
            </FlexboxLayout>
            <ListView for="item in photos" @itemTap="onItemTap">
                <v-template>
                    <Image :src="item" stretch="aspectFit" />
                </v-template>
            </ListView>
            
        </StackLayout>
        
    </Page>
</template>
<script lang="ts">
    import ImageModal from '@/modals/Image.vue'
    import CameraButton from '@/components/CameraButton.vue'
    export default {
        name: 'Observation',
        components: {
            CameraButton
        },
        data() {
            return {
                photos: [],
                img: '',
            }
        },
        computed: {
           
        },
       
        methods: {
            onItemTap(e){
                this.$showModal(ImageModal, { props: { src: e.item }});
            }
        },
        watch: {
           
        },
        async created() {
            await this.$store.dispatch('getObservationPhotos')
            this.photos = this.$store.getters.getObservationPhotos;
            // console.log(this.observations)
            this.img = this.photos[0]
            console.log(this.img)
            this.buttonText = "xxddd" 
        }
    }
</script>

<style lang="scss" scoped>
    Image{
        height: 200;
    }
    ListView{
        height: 100%;
    }
</style>
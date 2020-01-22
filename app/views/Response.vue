<template>
    <Page enableSwipeBackNavigation="true">
        
        <StackLayout verticalAlignment="center" v-if="resultSrc">
            <Image :src="resultSrc"/>
            <ListView for="item in results" class="autoHeight">
              <v-template>
                <StackLayout>
                  <Label :text="item.text" />
                  <Label :text="item.value" />
                </StackLayout>
              </v-template>
            </ListView>
            <!-- <Label text="Result" textWrap="true" />
            <Label :text="mappedResult" textWrap="true" />
            <Label text="Recomended action" textWrap="true" />
            <Label :text="mappedResult" textWrap="true" /> -->
            <Button class="button-solid" text="Save Result" @tap="saveResult" v-if="buttonsV"/>
            <Button class="button-solid" text="Dissmiss" @tap="cancel" v-if="buttonsV"/>

            <StackLayout verticalAlignment="center" v-if="sending">
                <ActivityIndicator :busy="sending"  />
                <FlexboxLayout justifyContent="space-around">
                    <Label text="Saving results" textWrap="true" />  
                </FlexboxLayout>
            </StackLayout>

        </StackLayout>
        <StackLayout verticalAlignment="center" v-else>
            <ActivityIndicator :busy="!resultSrc"  />
            <FlexboxLayout justifyContent="space-around">
                <Label text="Waiting for diagnosis" textWrap="true" />  
            </FlexboxLayout>
        </StackLayout>
        
    </Page>
</template> 
<script lang="ts">

    import { ImageSource, fromFile, fromAsset, fromBase64 } from 'tns-core-modules/image-source/image-source';
    import firebase from 'nativescript-plugin-firebase';
    import axios from 'axios';
    import App from '@/views/App.vue';
    export default {
        name: 'Respone',
        components: {
        },
        props: ['objectToSave', 'objectToSend', 'buttons'],
        data() {
            return {
                resultSrc: '',
                result: '',
                buttonsV: false,
                sending : false,
                results: []
            }
        },
        computed: {
            

        },
       
        methods: {
            async saveResult() {
                
                const result = await confirm('Are you sure you want to save this record')
                if(result){
                    this.buttonsV = false;
                    this.sending = true;
                    await this.$store.dispatch('saveImage', this.objectToSave);
                    this.sending = false;
                    this.$navigateTo(App, { clearHistory: true })
                }
            },
            cancel(){
                this.$navigateTo(App, { clearHistory: true })
                
            },
            async sendPhotoToDiagnosis() {
                // console.log(this.objectToSave)
                const {imageSize, pictureSource, radius, center} = this.objectToSend;
                // const imageSize = this.$refs.imageSize.nativeView.getActualSize()
                const backendUrl = 'https://diagnoskin-48e89.appspot.com/api/diagnosis';
                const tokenResult = await firebase.getAuthToken({forceRefresh: true})
                const img = await fromFile(pictureSource)
                // const radius = this.indicatorSize/2
                // const center = [this.lastX + radius, this.lastY + radius]

                
                // console.log(`Dupa radius:${radius}, center: ${center}, imageSize: ${imageSize.height} ${imageSize.width}`)
                try {
                    const response = await axios.post(backendUrl,
                        {
                            center: center,
                            radius: radius,
                            refImageSize: [imageSize.width,imageSize.height],
                            image: img.toBase64String('jpg')
                        },
                        { headers: { Authorization: `Bearer ${tokenResult.token}` }})
                    // alert(`Response status: ${response.status}, Data: ${response.data.diagnosis}`)
                    const resultSource = fromBase64(response.data.result)
                    this.resultSrc = resultSource;
                    this.results = [
                        {
                            text: 'Result',
                            value : this.mappedResult(response.data.diagnosis)
                        },
                        {
                            text: 'Recomended Action',
                            value : this.mappedSolution(response.data.diagnosis)
                        },
                    ]
                }
                catch(e) {
                    alert(`Error sending: ${e.message}`)
                }
            },
            mappedResult(value){
                switch(value){
                    case '':
                        return '';
                        break;
                    case 'mel':
                        return 'melanoma ;('
                        break;
                    default:
                        return 'other'

                }
            },
            mappedSolution(value){
                switch(value){
                    case '':
                        return '';
                        break;
                    case 'mel':
                        return 'Contact doctor'
                        break;
                    default:
                        return 'prepare'

                }
            }
        },
        watch: {
           
        },
        async created() {
            this.buttonsV = this.buttons
            await this.sendPhotoToDiagnosis()
            
        }
    }
</script>

<style lang="scss" scoped>
.autoHeight{
    height: 200;
}
    
</style>
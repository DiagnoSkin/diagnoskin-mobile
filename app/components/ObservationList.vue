<template>
    <StackLayout>
        <ListView for="observation in observations" @itemTap="onItemTap">
            <v-template>
                <FlexboxLayout alignContent="center" class="observationItem">
                    <BodyPartIndicator :selected="observation.part" alignSelf="center"/>
                    <FlexboxLayout class="observationItemDesc" flexDirection="column" >
                        <Label :text="getDate(observation.date)"/>  
                        <Label :text="getName(observation.part)"/>
                    </FlexboxLayout>
                </FlexboxLayout>
            </v-template>
        </ListView>
    </StackLayout>
   
</template>

<script lang="ts">
// import Observation from '@/components/Observation.vue'
import BodyPartIndicator from '@/components/bodypartIndicator/BodyPartIndictor.vue'
import Observation from '@/views/Observation.vue';
export default {
    name: 'ObservationList',
    components: {
        BodyPartIndicator
    },
    data() {
        return {
            observations:[{
                part: 'leg',
                date: '342343423'
            }],
            buttonText: 'update'
        }
    },
    created() {
        let data = this.$store.getters.getObservations;
        data.sort((a, b) => {
            return a.date - b.date
        })
        this.observations = data
        console.log(this.observations)
        this.buttonText = "xxddd" 
    },
    computed: {
        
    },
    methods: {
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
        onItemTap(event) {
            this.$store.dispatch('setCurrentObservation', {observation: event.item})
            this.$navigateTo(Observation)
        },
        updateList(){
            this.observations = this.$store.getters.getObservations;
        },

    }
}
</script>

<style scoped>
Button{
    width: 100;
}
ListView{
    height: 100%;
    padding: 30;
}
.observationItem{
    height: 150;
    margin: 0 20;
}
BodyPartIndicator{
    margin-left: 10;
    margin-right: 10;
}
.observationItemDesc{
    /* width: 100%; */
    margin-left: 30;
    margin-top: 20;
}
</style>
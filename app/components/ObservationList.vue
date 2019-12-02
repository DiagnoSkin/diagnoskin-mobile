<template>
    <StackLayout>
        <!-- <Button @tap="updateList">{{buttonText}}</Button> -->
        <ListView for="observation in observations" @itemTap="onItemTap">
            <v-template>
                <!-- Shows the list item label in the default color and style. -->
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

<script>
import Observation from '@/components/Observation.vue'
import BodyPartIndicator from '@/components/BodyPartIndicator/BodyPartIndictor.vue'
export default {
    name: 'ObservationList',
    components: {
        Observation,
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
        this.observations = this.$store.getters.getObservations;
        console.log(this.observations)
        this.buttonText = "xxddd" 
    },
    computed: {
        
    },
    methods: {
        getDate(data){
            let date = new Date(data),
            month = date.getMonth() + 1,
            day = date.getDate() + 1,
            year = date.getFullYear();
            if(month < 10) month = '0' + month;
            if(day < 10) day = '0' + day;
            return `${day}.${month}.${year}`

        },
        getName(key){
            let array = [...key],
            result = '',
            firstUpper = array.findIndex(x => x === x.toUpperCase());
            array[0] = array[0].toUpperCase();
            if(firstUpper !== -1){
                array = array.join('');
                let firstPart = array.substr(0, firstUpper),
                secondPart = array.substr(firstUpper)
                result = `${firstPart} ${secondPart}`
            }
            else result = array.join('');

            return result;


        },
        onItemTap(event) {
            console.log(event.index)
            console.log(event.item)
            alert(event.item.part)
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
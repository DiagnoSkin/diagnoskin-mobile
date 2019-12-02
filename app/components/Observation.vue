<template>
    <StackLayout class="box">
        <Label :text="date"/>
        <Label :text="part"/>
    </StackLayout>
</template>

<script>
export default {
    name: 'Observation',
    props: {
        dateInMil : String,
        part: String
    },
    data(){
        return {
            
        }
    },
    computed: {
        date() {
            return this.dateInMil;
        }
    }

}
</script>

<style scoped>
    .box{
        border: solid black 1px;
    }
</style>
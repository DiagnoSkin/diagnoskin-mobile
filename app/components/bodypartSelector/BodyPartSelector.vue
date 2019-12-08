<template>
    <GridLayout columns="75.0, 52.5, 52.5, 75.0" rows="100, 100, 125, 62.5, 37.5, 100, 50">
        <BodyPartButton v-for="part in parts"
            :key="part.id"
            :data="part"
            @selectionChange="changeSelection"/>
    </GridLayout>
</template>

<script>
    import BodyPartButton from '@/components/bodypartSelector/BodyPartButton.vue'
    import { BodyPart } from '@/model';
    export default {
        name: 'BodyPartSelector',
        components: {
            BodyPartButton
        },
        data() {
            return {
                parts: [
                    {
                        id: 0,
                        name: 'head',
                        col: '1',
                        row: '0',
                        colSpan: '2',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 1,
                        name: 'chest',
                        col: '1',
                        row: '1',
                        colSpan: '2',
                        rowSpan: '2',
                        selected: false
                    },
                    {
                        id: 2,
                        name: 'leftArm',
                        col: '0',
                        row: '1',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 3,
                        name: 'leftForearm',
                        col: '0',
                        row: '2',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 4,
                        name: 'leftHand',
                        col: '0',
                        row: '3',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 5,
                        name: 'rightArm',
                        col: '3',
                        row: '1',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 6,
                        name: 'rightForearm',
                        col: '3',
                        row: '2',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 7,
                        name: 'rightHand',
                        col: '3',
                        row: '3',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 8,
                        name: 'leftThigh',
                        col: '1',
                        row: '3',
                        colSpan: '1',
                        rowSpan: '2',
                        selected: false
                    },
                    {
                        id: 9,
                        name: 'leftLeg',
                        col: '1',
                        row: '5',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 10,
                        name: 'leftFoot',
                        col: '0',
                        row: '6',
                        colSpan: '2',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 11,
                        name: 'rightThigh',
                        col: '2',
                        row: '3',
                        colSpan: '1',
                        rowSpan: '2',
                        selected: false
                    },
                    {
                        id: 12,
                        name: 'rightLeg',
                        col: '2',
                        row: '5',
                        colSpan: '1',
                        rowSpan: '1',
                        selected: false
                    },
                    {
                        id: 13,
                        name: 'rightFoot',
                        col: '2',
                        row: '6',
                        colSpan: '2',
                        rowSpan: '1',
                        selected: false
                    },
                ],
                currentlySelected : {},
            }
        },
        methods: {
            changeSelection(name){
                let selected = this.parts.find((element) => {
                    return element.name === name;
                })
                if(this.currentlySelected.name){
                    this.currentlySelected.selected = false;
                }
                selected.selected = true;
                this.currentlySelected = selected;

                this.$emit('selectionChange', name)
            }
        }
        
    }
</script>

<style scoped>
    
</style>
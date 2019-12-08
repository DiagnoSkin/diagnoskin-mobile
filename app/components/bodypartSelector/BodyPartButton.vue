<template>
    <Button @tap="select" :col="data.col" :row="data.row" :colSpan="data.colSpan" :rowSpan="data.rowSpan" :style="isSelected"/>
</template>

<script>
    import { BodyPart } from '@/model';

    export default {
        name: 'BodyPartButton',
        props: {
            data: {}
        },
        data() {
            return {
                name : ''
            }
        },
        computed: {
            isSelected () {
                let path = `~/assets/bodyPartSelector/${this.data.name}`
                if(this.data.selected) path += 'Selected';
                return {
                    backgroundImage : `url('${path}')`
                }
                
            }
        },
        methods: {
            select() {
                this.name = this.data.name
                this.$emit('selectionChange', this.data.name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    Button{
        border-radius: 0;
        height: 100%;
        width: 100%;
        background-color: white;
        margin: 0;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        transition-duration: 5s;
    }
</style>
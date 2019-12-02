<template>
    <Image :src="src" :col="data.col" :row="data.row" :colSpan="data.colSpan" :rowSpan="data.rowSpan" />
</template>

<script>
    import { BodyPart } from '@/model';

    export default {
        name: 'GuyBodypart',
        props: {
            data: {},
            selected: String
        },
        data() {
            return {
                name : '',
            }
        },
        computed: {
            isSelected () {
                let path = `~/assets/bodyPartSelector/${this.data.name}`
                if(this.data.selected) path += 'Selected';
                return {
                    backgroundImage : `url('${path}')`
                }
                
            },
            src () {
                let path = `~/assets/bodyPartSelector/${this.data.name}`
                if(this.selected === this.data.name) path += 'Selected';
                return path
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
    Image{
        border-radius: 0;
        height: 100%;
        width: 100%;
        margin: 0;
        // background-repeat: no-repeat;
        // background-position: center center;
        // background-size: contain;
        // transition-duration: 5s;
    }
</style>
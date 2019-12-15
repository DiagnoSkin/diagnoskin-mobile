<template>
    <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
            <Image :src="src" stretch="aspectFit" />
            <Button @tap="sendPhoto" text="send"/>
            <Button @tap="$modal.close" text="Close" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script>
export default {
    props: {
        src: String
    },
    methods: {
        sendPhoto(){
            this.$store.dispatch('saveAdditionalImage', {src: this.src});
        }
    }
}
</script>

<style scoped>
    Image{
        /* height: 70%; */
    }
</style>
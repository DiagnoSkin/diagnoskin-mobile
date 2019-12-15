<template>
    <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
            <Image :src="src" stretch="aspectFit" />
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
        
    }
}
</script>

<style scoped>
    Image{
        /* height: 70%; */
    }
</style>
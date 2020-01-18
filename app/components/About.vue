<template>
    <StackLayout  class="wrapper" verticalAlignment="top">
        <Label class="title" text="About"></Label>
    </StackLayout>
</template>
<script lang="ts">
import Vue from 'vue'
import { fromFile } from 'tns-core-modules/image-source/image-source';
import firebase from 'nativescript-plugin-firebase';
import axios from 'axios';

export default Vue.extend({
    name: 'About',
})
</script>
<style lang="scss" scoped>
</style>
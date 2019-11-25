<template>
    <StackLayout  class="wrapper" verticalAlignment="top">
        <Label class="title" text="User profile"></Label>
        <Button class="button-solid important" text="Log out" @tap="logout()"></Button>
    </StackLayout>
</template>
<script lang="ts">
import Vue from 'vue'
import Login from '@/views/Login.vue'
import firebase from 'nativescript-plugin-firebase'

import { NavigationEntry } from 'tns-core-modules/ui/frame/frame'
export default Vue.extend({
    name: 'Profile',
    methods: {
        logout() {
            firebase.logout()
                .then(() => {
                    this.$store.commit('SET_LOGGED_OUT')
                    this.$navigateTo(Login, { clearHistory: true })
                })
        }
    }
})
</script>
<style lang="scss" scoped>
.wrapper {
    width: 90%;
}
</style>
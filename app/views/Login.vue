<template>
    <Page backgroundSpanUnderStatusBar="true">
        <ActionBar></ActionBar>
        <StackLayout class="wrapper" verticalAlignment="center">
            <Label class="title" text="Spotter"></Label>
            <TextField v-model="email"></TextField>
            <TextField v-model="password" secure="true"></TextField>
            <Button class="button-solid" text="Log in" v-on:tap="login()"></Button>
            <Button class="button-outline" text="Sign up" v-on:tap="signup()"></Button>
            <Button id="google-login-button" class="button-link" text="Log in with Google"></Button>
            <Button id="anon-login-button" class="button-link" text="Anonymous login"></Button>
        </StackLayout>
    </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import { Credential } from '@/model';
import App from '@/views/App.vue';
import { NavigationEntry } from 'tns-core-modules/ui/frame/frame';

export default Vue.extend({
    name: 'Login',
    data() {
        return {
            email: 'bartlomiej.szal@gmail.com',
            password: 'P@ssw0rd'
        }
    },
    methods: {
        async login() {
            const credential = {
                email: this.email,
                password: this.password
            } as Credential;
            await this.$store.dispatch('loginUserEmailPassword', credential);
            if (this.$store.getters.getLoggedIn) {
                this.$store.dispatch('getObservationCollerction')
                this.navigateToAppView();    
            }
        },
        async signup() {
            const credential = {
                email: this.email,
                password: this.password
            } as Credential;
            await this.$store.dispatch('signUpEmailPassword', credential);
            if (this.$store.getters.getLoggedIn) {
                this.navigateToAppView();    
            }
        },
        navigateToAppView() {
            this.$navigateTo(App, {
                clearHistory: true,
            } as NavigationEntry)
        }
    }
});
</script>
<style lang="scss" scoped>
.wrapper {
    width: 90%;
}
.title {
    margin-bottom: 100;
}
#google-login-button {
    margin-top: 30;
    margin-bottom: 0;
}
#anon-login-button {
    margin-top: 10;
    margin-bottom: 0;
}
</style>
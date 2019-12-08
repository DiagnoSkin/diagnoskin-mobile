<template>
    <Page>
        <StackLayout class="wrapper">    
            <StackLayout>
                <Label class="title" text="DiagnoSkin"></Label>
            </StackLayout>
            <StackLayout class="full-height" verticalAlignment="center">
                <TextField v-model="email" type="email" hint="Email address"></TextField>
                <Label class="error" v-bind:text="emailErrorMessage"></Label>
                <TextField v-model="password" secure="true" hint="Password"></TextField>
                <Label class="error" v-bind:text="passwordErrorMessage"></Label>
                <Label class="error" v-bind:text="firebaseErrorMessage"></Label>
                <Button class="button-solid" text="Log in" @tap="login()"></Button>
                <Button class="button-outline" text="Sign up" @tap="signup()"></Button>
                <Button id="google-login-button" class="button-grey" text="Log in with Google" @tap="loginGoogle()"></Button>
                <Button id="anon-login-button" class="button-grey" text="Anonymous login" @tap="loginAnon()"></Button>
            </StackLayout>
        </StackLayout>
    </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import App from '@/views/App.vue';
import { NavigationEntry } from 'tns-core-modules/ui/frame/frame';
import firebase, { LoginOptions, FirebasePasswordLoginOptions, CreateUserOptions } from 'nativescript-plugin-firebase';

export default Vue.extend({
    name: 'Login',
    async beforeCreate() {
        try {
            let user = await firebase.getCurrentUser()
            if (user !== null) {
                this.$store.commit('SET_LOGGED_IN', user)
                this.$store.dispatch('getObservationCollerction')
                this.$navigateTo(App, { clearHistory: true })
            }
        } catch(error) { }
    },
    data() {
        return {
            email: 'bartlomiej.szal@gmail.com',
            password: 'P@ssw0rd',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            firebaseErrorMessage: '',
            loggingIn: false
        }
    },
    watch: {
        email: function (newValue){
            this.validateEmail(newValue)
        },
        password: function(newValue) {
            this.validatePassword(newValue)
        }
    },
    methods: {
        validateFormFields(credential: FirebasePasswordLoginOptions): boolean {
            this.clearErrorMessages()
            let valid = false
            this.validateEmail(credential.email)
            this.validatePassword(credential.password)
            if (this.emailErrorMessage === '' && this.passwordErrorMessage === '') {
                valid = true
            }
            return valid
        },
        login() {
            let credential = { email: this.email, password: this.password }
            if (this.validateFormFields(credential)) {
                const firebaseLoginOptions = {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: credential
                } as LoginOptions;
                this.loginFirebase(firebaseLoginOptions)
            }
        },
        loginGoogle() {
            const firebaseLoginOptions = <LoginOptions> {
                type: firebase.LoginType.GOOGLE
            }
            this.loginFirebase(firebaseLoginOptions)
        },
        loginAnon() {
            const firebaseLoginOptions = <LoginOptions> {
                type: firebase.LoginType.ANONYMOUS
            }
            this.loginFirebase(firebaseLoginOptions)
        },
        loginFirebase(loginOptions: LoginOptions) {
            firebase.login(loginOptions)
                .then((user) => {
                    if (user) {
                        this.$store.commit('SET_LOGGED_IN', user)
                        this.$store.dispatch('getObservationCollerction')
                        this.$navigateTo(App, { clearHistory: true })
                    }
                })
                .catch((error) => {
                    this.loggingIn = false
                    this.firebaseErrorMessage = error
                })
        },
        signup() {
            const credential = <FirebasePasswordLoginOptions> {
                email: this.email,
                password: this.password
            };
            if (this.validateFormFields(credential)) {
                firebase.createUser(credential)
                    .then((user) => {
                        if (user) {
                            this.$store.commit('SET_LOGGED_IN', user)
                            this.$navigateTo(App, { clearHistory: true })
                        }
                    })
                    .catch((error) => {
                        this.loggingIn = false
                        this.firebaseErrorMessage = error
                    })
            }
        },
        validateEmail(email: string) {
            let message = ''
            if (email !== '') {
                let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                if (!regex.test(email)) {
                    message = 'Email format is not valid'
                }
            } else {
                message = 'Email cannot be empty'
            }
            this.emailErrorMessage = message
        },
        validatePassword(password: string) {
            let message = ''
            if (password === '') {
                message = 'Password cannot be empty'
            }
            this.passwordErrorMessage = message
        },
        clearErrorMessages() {
            this.emailErrorMessage = ''
            this.passwordErrorMessage = ''
        },
    }
});
</script>
<style lang="scss" scoped>
.wrapper {
    width: 90%;
}
.title {
    margin-top: 50;
}
#google-login-button {
    margin-top: 20;
    margin-bottom: 0;
}
#anon-login-button {
    margin-top: 10;
    margin-bottom: 0;
}
.error {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12;
    height: 12;
}
.full-height {
    height: 100%;
}
</style>
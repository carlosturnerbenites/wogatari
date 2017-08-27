<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                        type="email"
                        v-model="email"
                        placeholder="Your email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Your password"
                        required>
                    </b-input>
                </b-field>

                <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <!-- <button class="button" type="button" @click="$parent.close()">Close</button> -->
                <button type="button" class="button is-primary" @click="login">Ingresar</button>
                <button type="button" class="button is-primary" @click="register">Registrarse</button>
            </footer>
        </div>
    </form>
</template>

<script>
    import firebase from '@/firebase'

    export default {
        props: ['email', 'password'],
        methods: {
            login(){
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    this.$toast.open({
                        message: `Opps, '${errorMessage}'`,
                    })
                });
                firebase.auth().onAuthStateChanged((user) =>  {
                    if (user) {
                        var userId = firebase.auth().currentUser.uid;
                        this.$parent.close()
                    } else {
                        // User is signed out.
                    }
                });
            },
            register(){
                firebase.auth().createUserWithEmailAndPassword(this.email,this.password).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    this.$toast.open({
                        message: `Opps, '${errorMessage}'`,
                    })
                });
                firebase.auth().onAuthStateChanged((user) =>  {
                    console.log(user)
                    if (user) {
                        var userId = firebase.auth().currentUser.uid;
                        this.$parent.close()
                    } else {
                        // User is signed out.
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .modal-card {
        width: auto;
    }
</style>
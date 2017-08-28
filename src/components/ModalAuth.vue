<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Autenticación</p>
            </header>
            <section class="modal-card-body">
                <b-field label="">
                    <b-input
                        type="text"
                        v-model="displayName"
                        placeholder="Nombre"
                        required>
                    </b-input>
                </b-field>

                <b-field label="">
                    <b-input
                        type="email"
                        v-model="email"
                        placeholder="Email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Santo y Seña"
                        required>
                    </b-input>
                </b-field>
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
        // props: ['email', 'password', 'user'],
        data() {
            return {
                email: 'carlosturnerbenites@gmail.com',
                password: '123456',
                displayName: 'Carlos Turner',
            }
        },
        methods: {
            login(){
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    this.$toast.open({ message: `Opps, '${errorMessage}'`, })
                });
                firebase.auth().onAuthStateChanged((user) =>  {
                    if (user) {
                        var userId = firebase.auth().currentUser.uid;
                        this.$toast.open({ message: `Hola ${userId}`, })
                        this.$parent.close()
                    } else {
                        // User is signed out.
                    }
                });
            },
            register(){
                firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then((p) => {
                    alert("newuser");
                    var currentUser = firebase.auth().currentUser;
                    firebase.database().ref(`users/${currentUser.uid}`).set({ displayName: currentUser.displayName })
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    this.$toast.open({ message: `Opps, '${errorMessage}'`, })
                });
                firebase.auth().onAuthStateChanged((user) =>  {
                    console.log(user)
                    if (user) {
                        var currentUser = firebase.auth().currentUser;
                        currentUser.displayName = this.displayName

                        this.$toast.open({ message: `Hola. Bienvenido ${currentUser.uid}. `, })
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
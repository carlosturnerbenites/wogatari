<template>
    <section>
        <button class="button is-primary is-medium"
            @click="isComponentModalActive = true">
            Launch component modal
        </button>

        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <modal-auth v-bind="formProps"></modal-auth>
        </b-modal>
    </section>
</template>

<script>
    import ModalAuth from '@/components/ModalAuth'

    export default {
        components: {
            ModalAuth
        },
        data() {
            return {
                isComponentModalActive: false,
                formProps: {
                    email: 'carlosturnerbenites@gmail.com',
                    password: 'testing'
                }
            }
        }
    }
</script>
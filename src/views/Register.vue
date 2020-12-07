<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Need a acoount?</router-link>
          </p>
          VALIDATION ERRORS
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-primary pull-xs-right"
              :disabled="isSubmiting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvRegister',
  computed: {
    isSubmiting() {
      return this.$store.state.auth.isSubmiting;
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('register', {
        email: 'dawdwdw@adwdw.dsda',
        username: 'adwdawdawdw21',
        password: '123456789'
      })
      .then(user => {
        console.log('success user', user)
      })
    }
  }
};
</script>

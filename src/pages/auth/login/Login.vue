<template>
  <form @submit.prevent="onsubmit">
    <va-input
      class="mb-3"
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      class="mb-3"
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div
      class="auth-layout__options d-flex align--center justify--space-between"
    >
      <va-checkbox
        v-model="keepLoggedIn"
        class="mb-0"
        :label="$t('auth.keep_logged_in')"
      />
      <router-link class="ml-1 link" :to="{ name: 'recover-password' }">{{
        $t("auth.recover_password")
      }}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button @click="onsubmit" class="my-0">{{
        $t("auth.login")
      }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    };
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
  },
  methods: {
    onsubmit() {
      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }
      axios
        .get("http://csb.certit.eu/passwd")
        .then((resp) => {
          const data = resp.data;
          //         `user1:cGFzczE=
          // user2:cGFzczI=`;

          const users = data.split("\n");
          let found = false;
          for (let i = 0; i < users.length; i++) {
            const element = users[i];
            const namePassPair = element.split(":");
            if (
              namePassPair[0] == this.email &&
              namePassPair[1] == btoa(this.password)
            ) {
              found = true;
              break;
            }
          }
          if (found) {
            this.$router.push({ name: "dashboard" });
          } else {
            this.emailErrors = [];
            this.passwordErrors = [`Incorrect username or password`];
          }
        })
        .catch((err) => {
          console.log(err);
          this.emailErrors = [];
          this.passwordErrors = [`Couldn't connect to the server`];
        });
      // window.open(`http://${this.email}:${this.password}@csb.certit.eu/admin/dashboard`,"_self")
    },
  },
};
</script>

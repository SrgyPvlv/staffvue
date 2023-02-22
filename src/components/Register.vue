<template>
    <div class="col-md-12 myregisterform">
      <div class="card">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="card-img-top"
        />
        <div class="card-body">
        <Form @submit="handleRegister" :validation-schema="schema">
          <div v-if="!successful">
            <div class="form-group">
              <label for="username" class="fw-bold">Логин</label>
              <Field name="username" type="text" class="form-control mt-1" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group mt-3">
              <label for="password" class="fw-bold">Пароль</label>
              <Field name="password" type="password" class="form-control mt-1" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
  
            <div class="form-group mt-3">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Зарегистрировать
              </button>
            </div>
          </div>
        </Form>
  
        <div
          v-if="message"
          class="alert mt-3"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  
  export default {
    name: "Register",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        username: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
      });
  
      return {
        successful: false,
        loading: false,
        message: "",
        schema,
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push("/register");
      }
    },
    methods: {
      handleRegister(user) {
        this.message = "";
        this.successful = false;
        this.loading = true;
  
        this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
          }
        );
      },
    },
  };
  </script>

<style>
.myregisterform {
  max-width: 350px;
}
.error-feedback {
  color: red;
}
</style>
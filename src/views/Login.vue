<template>
  <div id="AuthWithSlots">
    <amplify-authenticator>
      <amplify-sign-up
        slot="sign-up"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
      <amplify-sign-in slot="sign-in"></amplify-sign-in>
    </amplify-authenticator>
    <!-- <vue-recaptcha
      v-if="customConfirmSignIn"
      sitekey="6LcjwjEaAAAAAOr6mjLL-8I0yMQuOfZ1G2E0Pl-T"
      @verify="onVerify"
    ></vue-recaptcha> -->
  </div>
</template>

<script>
// import VueRecaptcha from "vue-recaptcha";
export default {
  name: "AuthWithSlots",
  data() {
    return {
      formFields: [
        {
          type: "username",
          required: true,
        },
        {
          type: "password",
          required: true,
        },
        {
          type: "email",
          required: true,
        },
      ],
    };
  },
};
</script>
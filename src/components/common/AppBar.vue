<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <h3>Oxymeter</h3>
    </div>
    <v-spacer></v-spacer>
    <v-btn v-if="!signedIn" link router to="/login" text>
      <span class="mr-2">Login</span>
    </v-btn>
    <v-btn v-if="!signedIn" link router to="/register" text>
      <span class="mr-2">Register</span>
    </v-btn>
    <v-btn v-if="signedIn" link @click="logout" text>
      <span class="mr-2">Logout</span>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", ["signedIn"]),
  },
  methods: {
    ...mapActions("auth", ["AUTH_LOGOUT"]),
    logout() {
      this.AUTH_LOGOUT();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
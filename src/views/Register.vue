<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="form">
                <div style="text-align: center; margin-bottom: 20px">
                  <img src="@/assets/oxymeter-logo.png" alt="Oxymeter Logo" />
                </div>
                <h2 style="text-align: center">Register</h2>
                <v-text-field
                  label="Name"
                  v-model="userInfo.Name"
                  :rules="[(v) => !!v || 'Name is required']"
                  required
                ></v-text-field>
                <v-text-field
                  label="Surname"
                  v-model="userInfo.Surname"
                  :rules="[(v) => !!v || 'Surname is required']"
                  required
                ></v-text-field>
                <v-text-field
                  label="TCKN"
                  v-model="userInfo.Tckn"
                  :rules="usernameRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="userInfo.Password"
                  min="8"
                  :append-icon="e1 ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="e1 ? 'password' : 'text'"
                  @click:append="e1 = !e1"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Re-enter Password"
                  v-model="reEnterPassword"
                  min="8"
                  :append-icon="showRePass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showRePass ? 'password' : 'text'"
                  @click:append="showRePass = !showRePass"
                  :rules="reEnterPasswordRules"
                  required
                ></v-text-field>
                <v-menu
                  v-model="dateMenuVisibility"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="userInfo.Birthdate"
                      label="BirthDate"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="userInfo.Birthdate"
                    @input="dateMenuVisibility = false"
                  ></v-date-picker>
                </v-menu>
                <v-select
                  v-model="userInfo.Gender"
                  :items="genderList"
                  label="Gender"
                  solo
                ></v-select>
                <v-layout justify-space-between>
                  <v-btn
                    @click="register"
                    :class="{
                      'blue darken-4 white--text': valid,
                      disabled: !valid,
                    }"
                    >Register</v-btn
                  >
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      e1: true,
      showRePass: true,
      userInfo: {
        Tckn: "",
        Password: "",
        Name: "",
        Surname: "",
        Birthdate : new Date().toISOString().substr(0, 10),
        Gender: "",
        Role:"client"
      },
      reEnterPassword: "",
      passwordRules: [(v) => !!v || "Password is required"],
      reEnterPasswordRules: [
        (v) => !!v || "Re-enter password is required",
        (value) => value === this.userInfo.Password || "Password must match",
      ],
      usernameRules: [(v) => !!v || "Username is required"],
      genderList: ["Male", "Female"],
      dateMenuVisibility:false
    };
  },
  methods: {
    ...mapActions("auth", ["AUTH_REGISTER"]),
      
    register() {
       
      this.AUTH_REGISTER(this.userInfo).then((response) => {
        if (response.data.isSucceed == true) {
          localStorage.setItem(
              "currentUser",
              JSON.stringify({ Tckn: this.userInfo.Tckn, Role:"client" })
            );
          this.$router.push("/recordList");
        } else {
          alert(response.Data.response.errorCode);
        }
      });
    },
  },
};
</script>

<style>
</style>
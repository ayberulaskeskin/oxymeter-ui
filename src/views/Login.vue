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
                <h2 style="text-align: center">Login</h2>
                <v-text-field
                  label="Tckn"
                  v-model="Tckn"
                  :rules="TcknRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="Password"
                  min="8"
                  :append-icon="e1 ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="e1 ? 'password' : 'text'"
                  @click:append="e1 = !e1"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-layout class="mt-5" justify-space-between>
                  <v-btn
                    @click="submit"
                    :class="{
                      'blue darken-4 white--text': valid,
                      disabled: !valid,
                    }"
                    >Login
                  </v-btn>
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
  name: "Login",
  data() {
    return {
      valid: false,
      e1: true,
      Password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      Tckn: "",
      TcknRules: [(v) => !!v || "Tckn is required"],
    };
  },
  methods: {
    ...mapActions("auth", ["AUTH_REQUEST"]),
    submit() {
      this.AUTH_REQUEST({ Tckn: this.Tckn, Password: this.Password }).then(response => {
        if(response.data.isSucceed == true){//Credentials are true so we can authenticate
          this.$router.push("/");
        } else{
          alert("Login credentials are not correct. Please try again!");
        }
      });
    },
  },
};
</script>

<style>
</style>
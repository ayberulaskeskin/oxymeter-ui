<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 md10 elevation-6>
        <v-col md="12">
          <v-row>
            <v-col md="8">
              <v-card outlined elevation="6">
            <v-card-title>Please give a search criteria</v-card-title>
            <v-container class="ml-5 mr-5">
              <v-row>
                <v-col md="8"
                  ><v-text-field
                    label="Tckn"
                    v-model="searchTckn"
                  ></v-text-field
                ></v-col>
                <v-col md="4" class="mt-3"
                  ><v-btn color="primary" @click="submitSearch">
                    Search
                  </v-btn></v-col
                >
              </v-row>
            </v-container>
          </v-card>
            </v-col>
            <v-col  md="4" class="mt-3"><v-btn x-large height="65px" style="color:white" color="green" @click="openRegister">
              Register Authorized
            </v-btn></v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-card elevation="6">
            <v-data-table
              :headers="headers"
              :items="medicalRecordList"
              sort-by="hearthRate"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>My Medical Records</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-flex>
      <v-dialog v-model="registerDialog" max-width="500px">
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
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
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
        Birthdate: new Date().toISOString().substr(0, 10),
        Gender: "",
        Role: "admin",
      },
      reEnterPassword: "",
      passwordRules: [(v) => !!v || "Password is required"],
      reEnterPasswordRules: [
        (v) => !!v || "Re-enter password is required",
        (value) => value === this.userInfo.Password || "Password must match",
      ],
      usernameRules: [(v) => !!v || "Username is required"],
      genderList: ["Male", "Female"],
      dateMenuVisibility: false,
      registerDialog: false,
      searchTckn: "",
      search: "",
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
        },
        { text: "Hearth Rate (bpm)", value: "hearthRate" },
        { text: "Oxygen Rate (%)", value: "oxygenRate" },
      ],
    };
  },
  computed: {
    ...mapState("medicalRecord", ["medicalRecordList"]),
  },
  methods: {
    ...mapActions("medicalRecord", ["GET_MEDICAL_RECORDS"]),
    ...mapActions("auth", ["AUTH_REGISTER"]),
    openRegister() {
      this.registerDialog = true;
    },
    submitSearch() {
      this.GET_MEDICAL_RECORDS({ Tckn: this.searchTckn }).then((response) => {
        if (response.data.isSucceed) {
          console.log("Medical Records gathered successfully");
        } else {
          alert(response.data.errorCode);
        }
      });
    },
    register() {
      this.AUTH_REGISTER(this.userInfo).then((response) => {
        if (response.data.isSucceed == true) {
          alert("Authorized user created successfully");
          this.registerDialog = false;
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
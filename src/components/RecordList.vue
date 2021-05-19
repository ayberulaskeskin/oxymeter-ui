<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 md10 elevation-6>
        <v-card>
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
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.recordDate"
                              label="Record Date"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.hearthRate"
                              label="Hearth Rate (bpm)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.oxygenRate"
                              label="Oxygen Rate (%)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
    editedIndex: -1,
    editedItem: {
      date: "",
      hearthRate: 0,
      oxygenRate: 0,
    },
    defaultItem: {
      date: "",
      hearthRate: 0,
      oxygenRate: 0,
    },
  }),

  computed: {
    ...mapState("auth",["currentUser","signedIn"]),
    ...mapState("medicalRecord",["medicalRecordList"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Record" : "Edit Record";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("medicalRecord",["GET_MEDICAL_RECORDS"]),
    initialize() {
      var currentUserTckn = JSON.parse(localStorage.getItem('currentUser')).Tckn;
      this.GET_MEDICAL_RECORDS({tckn : currentUserTckn}).then(response => {
        if(response.data.isSucceed){
          console.log("Medical Records gathered successfully");
        } else{
          alert(response.data.errorCode)
        }
      }
      );
    },

    editItem(item) {
      this.editedIndex = this.recordList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.recordList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.recordList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.recordList[this.editedIndex], this.editedItem);
      } else {
        this.recordList.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

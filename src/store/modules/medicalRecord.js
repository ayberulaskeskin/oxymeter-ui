import {
  GET_MEDICAL_RECORDS,
  GET_MEDICAL_RECORDS_SUCCESS
} from "../actions/medicalRecord";
import MedicalRecordService from "@/services/MedicalRecordService";

const state = {
  medicalRecordList : []
};


const getters = {
  medicalRecordList: (state) => !!state.medicalRecordList,
};

const actions = {
  [GET_MEDICAL_RECORDS]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      MedicalRecordService.GetMedicalRecords(request)
        .then((response) => {
          console.log(response);
          
          if (response.data.isSucceed) {
            commit(GET_MEDICAL_RECORDS_SUCCESS, response);
            resolve(response)
          }
        })
        .catch(error => {
          //commit(AUTH_ERROR);
          reject(error)
        });
    });
  },
};

const mutations = {
  [GET_MEDICAL_RECORDS_SUCCESS]: (state, response) => {
    state.medicalRecordList = response.data.response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

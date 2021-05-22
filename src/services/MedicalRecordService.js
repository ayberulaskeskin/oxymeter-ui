import Axios from "axios";

export default class MedicalRecordService {
  
  static async GetMedicalRecords(request) {
    return new Promise((resolve, reject) => {
      let baseUrl = "http://localhost:5000/api/";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      Axios.post(baseUrl + "MedicalRecord/GetMedicalRecord", request, headers)
        .then((response) => {
          if (response.data.isSucceed) {
            resolve(response);
          } else{
            console.log(response.data.errorCode);
          }
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  }
}

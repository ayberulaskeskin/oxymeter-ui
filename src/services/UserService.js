import Axios from "axios";

export default class UserService {
  static async Register(request) {
    return new Promise((resolve, reject) => {
      let baseUrl = "http://localhost:5000/api/";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      Axios.post(baseUrl + "user/Register", request, headers)
        .then((response) => {
          if (response.data.isSucceed) {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  }
  static async Login(request) {
    return new Promise((resolve, reject) => {
      let baseUrl = "http://localhost:5000/api/";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      Axios.post(baseUrl + "user/Login", request, headers)
        .then((response) => {
          if (response.data.isSucceed) {
            console.log(response);
            localStorage.setItem(
              "currentUser",
              JSON.stringify({ Tckn: response.data.response.tckn, Role: response.data.response.role })
            );
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  }
}

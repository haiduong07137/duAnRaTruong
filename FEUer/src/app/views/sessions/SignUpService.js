import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/public";

export const saveAngency = (Angency, UserId) => {
  var url = API_PATH + "/" + UserId
  return axios.post(url, Angency);

};


export const checkSignUp = KeyWord => {
  var url = API_PATH + "/" + KeyWord
  return axios.post(url);

};



export const createOffer = (AgencyId) => {
  var url = API_PATH + "/signup/createOffer/"+AgencyId
  return axios.post(url);
};



export const saveUser = (User) => {
  var url = API_PATH + "/signup"
  return axios({
    method: 'post',
    url: url,
    data: User
  });  
};

export const checkEmail = (agency) => {
  var url = API_PATH + "/checkEmail"
  return axios.post(url,agency);
};

export const checkUsername = (agency) => {
  var url = API_PATH + "/checkUsername"
  return axios.post(url,agency);
};

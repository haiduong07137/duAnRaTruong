import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/agency"; 
 
export const changePasswordAgency = user => {
  var url = API_PATH + '/changePasswordAgency';
  return axios.post(url, user);
};


export const checkPassword = currentpassword => {
  return axios.post(API_PATH + '/checkPassword', currentpassword);
};

 


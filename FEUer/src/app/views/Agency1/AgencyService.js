import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/agency"; 
export const searchByPage = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};
 
export const getByPage = (page, pageSize) => { 
  var pageIndex = page + 1;
  var params = pageIndex + "/" + pageSize;
  var url = API_PATH + params;
  return axios.get(url);
};

export const getItemById = id => { 
  var url = API_PATH + "/" + id;
  return axios.get(url);
};
export const deleteItem = id => { 
  var url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (id, code) => { 
  const config = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, config);
};

export const addNewData = agency => {
  return axios.post(API_PATH, agency);
};

export const updateData = agency => {
  return axios.put(API_PATH + agency.id, agency);
};

export const setManager = (agency,userId) => {
  return axios.post(API_PATH+"/setManager/" + userId, agency);
};

export const searchByPageAgencyOfBDS = (searchObject) => {
  var url = API_PATH + "/searchByPageAgencyOfBDS";
  return axios.post(url,searchObject);
};

export const searchByPageBDS = (searchObject) => {
  var url = API_PATH + "/searchByPageBDS";
  return axios.post(url,searchObject);
};

export const getListAgencyDontHaveManager = () => {
  var url = API_PATH + "/getListAgencyDontHaveManager";
  return axios.post(url);
};

export const getAgencyDontHaveOffer = () => {
  var url = API_PATH + "/getAgencyDontHaveOffer";
  return axios.post(url);
};


export const unSetManager = agency => {
  var url = API_PATH + "/unSetManager";
  return axios.post(url,agency);
};

export const getRole = () => {
  var url = API_PATH + "/getRole";
  return axios.post(url);
};
 

export const getExcel = (list) => {
  var urll = API_PATH + "/excel";
  return axios({
    url: urll,
    method: 'POST',
    responseType: 'blob', // important
    data:list
  }) 
};

export const sendMailAssign = mailTo => {
  var url = API_PATH + "/sendAssignMail";

  return axios.post(url, mailTo);
}
export const sendMailBDS = userID => {
  var url = API_PATH + "/sendBDSMail"+"/"+userID;

  return axios.post(url);
}
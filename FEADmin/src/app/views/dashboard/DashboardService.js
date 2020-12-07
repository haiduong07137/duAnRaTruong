import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/product";
export const getDashboardAnalytics = () => {
  return axios.get(ConstantList.API_ENPOINT + "/api/dashboard/analytics");
};
export const searchByPage = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};

export const getAllProduct = () => {
  return axios.get("http://localhost:8099/advpro/api/offer/dashboard/analytics");
}
 
 
export const searchByPageOffer = (searchObject) => {
  var url = "http://localhost:8099/advpro/api/offer/getAgencyOffer";
  return axios.post(url, searchObject);
}; 

export const getCountOfferPublic = () => {
  var url = "http://localhost:8099/advpro/api/offer/countOfferPublic";
  return axios.get(url);
}

export const getCountOfferPrivate = () => {
  var url = "http://localhost:8099/advpro/api/offer/countOfferPrivate";
  return axios.get(url);
}

export const getCountLink = () => {
  var url = "http://localhost:8099/advpro/api/offer/countclick";
  return axios.get(url);
}

export const getAnalytics = (role, userId) => {
  return axios.get(`http://localhost:8099/advpro/api/offer/analytics/${userId}/${role}`);
}

export const getAllUser = (Angency) => {
  return axios.post(`http://localhost:8099/advpro/api/agency/searchByPage`, Angency);
};

export const getPrivateAgencyOffer = (searchObject) => {
  return axios.post(`http://localhost:8099/advpro/api/offer/getPrivateAgencyOffer`, searchObject);
}

export const resetCountLink = (id) => {
  return axios.post(`http://localhost:8099/advpro/api/offer/reset/${id}`)
}

export const getPublicAgencyOffer = (searchObject) => {
  return axios.post(`http://localhost:8099/advpro/api/offer/getAgencyOffer`, searchObject);
}
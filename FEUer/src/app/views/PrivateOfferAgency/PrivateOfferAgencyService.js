import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/offer";
export const searchByPage = (searchObject) => {
  var url = API_PATH + "/getPrivateAgencyOffer";
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

export const addNewData = offer => {
  return axios.post(API_PATH, offer);
};

export const updateData = offer => {
  return axios.put(API_PATH + "/" + offer.id, offer);
};

export const saveOfferPrivate = offer => {
  return axios.put(API_PATH+"/saveOfferPrivate/" + offer.id, offer)
};

export const setPublicOffer = offer => {
  return axios.post(API_PATH+"/setPublicOffer/", offer);
};

export const searchByPageChildOfOffer = (searchObject,parentID) => {
  var url = API_PATH + "/searchByPageChildOfOffer"+"/"+parentID;
  return axios.post(url, searchObject);
};


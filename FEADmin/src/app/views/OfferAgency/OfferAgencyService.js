import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/offer";
export const searchByPage = (searchObject) => {
  var url = API_PATH + "/getAgencyOffer";
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

export const gotOffer = offer => {
  return axios.put(API_PATH + "/gotOffer/" + offer.id, offer);
};

export const getRequestOfferList = offerDto => {
  return axios.post(API_PATH + "/getRequestOfferList", offerDto);
};

export const setPrivateOffer = offerDto => {
  return axios.post(API_PATH + "/setPrivateOffer", offerDto);
};

export const approveToShowOffer = agencyID => {
  return axios.post(API_PATH + "/approveToShowOffer/" + agencyID);
}

export const changeIsShowOffer = offerID => {
  return axios.post(API_PATH + "/changeIsShowOffer/" + offerID);
}

//code

import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/lead";
export const searchByPage = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};
 
export const getItemById = id => {
  var url = API_PATH + "/" + id;
  return axios.get(url);
};
export const deleteItem = id => {
  var url = API_PATH + "/" + id;
  return axios.delete(url);
}; 

export const addNewData = data => {
  return axios.post(API_PATH , data);
}

export const updateData = data => {
  return axios.put(API_PATH + "/" + data.id, data);
}
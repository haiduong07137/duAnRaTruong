import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/agency";

export const updateInfo = (Agency) => {
  var url = API_PATH + "/" + Agency.id;
  return axios.put(url, Agency);

};
 
export const getCurrentUser = id => {
  var url = API_PATH + `/getCurrentUser/${id}`;
  return axios.get(url);
};

export const uploadAvatar = (file, id) => {
  const url = ConstantList.API_ENPOINT + "/api/upload/uploadAvatar";
  let formData = new FormData();
  formData.append('file', file);
  formData.append('userId', id);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(url, formData, config)
}
 
import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/user";
const API_PATH_USER = ConstantList.API_ENPOINT + "/api/user"
const API_PATH_USER_DEPARTMENT = ConstantList.API_ENPOINT + "/api/user_department";
const API_PATH_ROLE = ConstantList.API_ENPOINT + "/api/roles/";

// export const searchByPage = (pageIndex, pageSize) => {
//   var params = pageIndex + "/" + pageSize;
//   var url = API_PATH + '/' + params;
//   return axios.get(url);
// };

export const searchByPage = (searchObject) => {
  var url = API_PATH_USER + "/searchByPage";
  return axios.post(url, searchObject);
};

export const findUserByUserName = (username, page, pageSize) => {
  var params = `username/${username}/${page}/${pageSize}`;
  var url = API_PATH + '/' + params;
  return axios.get(url);
};

export const getAllRoles = () => {
  var url = API_PATH_ROLE + 'all';
  return axios.get(url);
};

export const getItemById = id => {
  var url = API_PATH_USER + '/' + id;
  return axios.get(url);
};


export const getUserByUsername = (username) => {
  const config = { params: { username: username} };
  var url = API_PATH;
  return axios.get(url, config);
};

export const saveUser = user => {
  return axios.post(API_PATH, user);
};

export const saveUserDepartment = UserDepartment => {
  if (UserDepartment.id) {
    return axios.put(API_PATH_USER_DEPARTMENT + "/" + UserDepartment.id, UserDepartment);
  }
  else{
    return axios.post(API_PATH_USER_DEPARTMENT, UserDepartment);
  }
};
export const saveUserDepartments = UserDepartments => {
  if (UserDepartments) {
    return axios.post(API_PATH_USER_DEPARTMENT + "/saveUserDepartments", UserDepartments);
  }
};
export const listByUserId = userId => {
  if (userId) {
    return axios.get(API_PATH_USER_DEPARTMENT + `/listByUserId/${userId}`);
  }
};
export const deleteById = id => {
  return axios.delete(API_PATH_USER_DEPARTMENT + "/" +id);
};

export const getUserDepartmentByUserId = id => {
  var url = API_PATH_USER_DEPARTMENT + "/getUserDepartmentByUserId/" + id;
  return axios.get(url);
};

export const sendMailToCreatedUser = createdUser => {
  var url = API_PATH_USER + "/sendMailToCreatedUser"

  return axios.post(url, createdUser);
}

export const getCurrentUser = () => {
  var url = API_PATH + "/getCurrentUser"

  return axios.get(url);
}

 
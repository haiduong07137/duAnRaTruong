import axios from "axios";

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATION = "DELETE_ALL_NOTIFICATION";

// export const getNotification = () => dispatch => {
//   axios.get("/api/notification").then(res => {
//     dispatch({
//       type: GET_NOTIFICATION,
//       payload: res.data
//     });
//   });
// };

export const deleteNotification = id => dispatch => {
  axios.post("/api/notification/delete", { id }).then(res => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: res.data
    });
  });
};

export const deleteAllNotification = () => dispatch => {
  axios.post("/api/notification/delete-all").then(res => {
    dispatch({
      type: DELETE_ALL_NOTIFICATION,
      payload: res.data
    });
  });
};

export const createNotification = notification => dispatch => {
  axios.post("/api/notification/add", { notification }).then(res => {
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: res.data
    });
  });
};

export const getNotification = () => dispatch => {
  return axios.get("http://localhost:8099/advpro/api/offer/getNotification").then(res => {
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data
    });
    // console.log(res);
  }).catch (error => console.log(error));  
}
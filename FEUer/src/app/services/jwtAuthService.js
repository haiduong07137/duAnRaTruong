import axios from "axios";
import localStorageService from "./localStorageService";
import ConstantList from "../appConfig";
import UserService from "../services/UserService";
import history from "history.js";

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
  }
}
class JwtAuthService {


  user = {
    userId: "1",
    role: 'ADMIN',
    displayName: "Watson Joyce",
    email: "watsonjoyce@gmail.com",
    photoURL: ConstantList.ROOT_PATH + "assets/images/avatar.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }
  loginWithUserNameAndPassword = userDto => { 
    console.log(userDto);
      axios.post(ConstantList.API_ENPOINT + '/public/login', userDto).then(response => {  
     console.log(response);
      axios.post(ConstantList.API_ENPOINT + "/api/agency/getCurrentUser").then(({ data }) => {
        this.setLoginUser(response.data, data);
        let user = localStorageService.getItem('auth_user');
      })
      // .catch(error =>{
      //   history.push(ConstantList.LOGIN_PAGE);
      // });
    });
  };

  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 1000);
    }).then(data => {
      //console.log(data);
      this.setUser(data);
      this.setSession(data.token);
      return data;
    });
  };

  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then(data => {
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };



  logout = () => {

    if (ConstantList.AUTH_MODE == "Keycloak") {
      UserService.doLogout();
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.HOME_PAGE)
    } else {
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.HOME_PAGE)
    }
  }

  logoutPassword = () => {

    if (ConstantList.AUTH_MODE == "Keycloak") {
      UserService.doLogout();
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.LOGIN_PAGE)
    } else {
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.LOGIN_PAGE)
    }
  }

  setSession(token) {
    if (token) {
      localStorageService.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  setLoginUser = (data, userData) => { 
    let user = {};   
    user.id=userData.id; 
    user.netWork=userData.isNetwork;
    user.token = data.access_token;
    user.email = userData.email 
    user.name = userData.name; 
    user.agcIdTms = userData.agcId; 
    user.socialContact = userData.socialContact;
    user.nameSC = this.getNameSocialContact(userData); 
    user.userManage = userData.userManage;
    user.photoURL = userData.imagePath; 
    this.user = user;
    // if( user.agcIdTms == null ){
    //   history.push(ConstantList.LOGIN_PAGE);
    // }
    localStorageService.setItem("auth_user", user);
    return user;
  }

  setLoginToken = (data) => {
    let user = {};
    user.token = data;
    user.role = "NULL";
    user.age = 25;
    user.displayName = "Watson Joyce";
    user.photoURL = ConstantList.ROOT_PATH + "assets/images/avatar.jpg";
    this.user = user;
    localStorageService.setItem("auth_user", user);
    return user;
  }

  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  }
  removeUser = () => {
    localStorageService.removeItem("auth_user");
  }


  getNameSocialContact = (user) => {

    if (user.socialContact.includes("Zalo: ")) {
      return "Zalo"
    } else if (user.socialContact.includes("Facebook: ")) {
      return "Facebook"
    } else if (user.socialContact.includes("Skype: ")) {
      return "Skype"
    } else if (user.socialContact.includes("Telegram: ")) {
      return "Telegram"
    } else {
      return "Other"
    }
  }


}



export default new JwtAuthService();

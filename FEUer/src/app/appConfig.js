// const APPLICATION_PATH="/offerpro-user/";
const APPLICATION_PATH="/";
//const APPLICATION_PATH="/";//Đặt homepage tại package.json giống như tại đây
module.exports = Object.freeze({
    // COOKIE_PATH : "/offerpro-user",
     COOKIE_PATH : "/",
    ROOT_PATH : APPLICATION_PATH,
    ACTIVE_LAYOUT:"layout2",//layout1 = vertical, layout2=horizontal
    // API_ENPOINT:"http://demo.tmsapp.vn/offerpro",  
    API_ENPOINT:"http://localhost:8099/advpro",  
    LOGIN_PAGE:APPLICATION_PATH+"session/signin",//Nếu là Spring    // HOME_PAGE:APPLICATION_PATH+"session/signin",//Nếu là Spring
    //HOME_PAGE:APPLICATION_PATH+"dashboard/learning-management"//Nếu là Keycloak
    HOME_PAGE:APPLICATION_PATH+"landing",//Link trang landing khi bắt đầu
    DASHBOARD_PAGE:APPLICATION_PATH+"dashboard/analytics"});
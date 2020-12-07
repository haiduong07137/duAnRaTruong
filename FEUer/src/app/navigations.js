import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
  },
  {
    name: "Dashboard.offers",
    icon: "web_asset",
    path: ConstantList.ROOT_PATH + "offers/list",
  },
  {
    name: "Dashboard.my_offers",
    icon: "web_asset",
    path: ConstantList.ROOT_PATH + "offers/my-list",
  },
  
  // {
  //   name: "Dashboard.manage",
  //   icon: "engineering",
  //   children: [
  //     // {
  //     //   name: "manage.profile_is_logged",
  //     //   path: ConstantList.ROOT_PATH + "manage/profile_is_logged",
  //     //   iconText: "P"
  //     // },
  //     {
  //       name: "manage.user",
  //       path: ConstantList.ROOT_PATH + "manage/user",
  //       iconText: "U"
  //     }
  //   ]
  // }
];

import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
  }, 
  {
    name: "Dashboard.title",
    icon: "web_asset",
    children: [
      {
        name: "Agency.title",
        path: ConstantList.ROOT_PATH + "agency",
        icon: "keyboard_arrow_right",
      },
      {
        name: "Product.title",
        path: ConstantList.ROOT_PATH + "product",
        icon: "keyboard_arrow_right",
      },
      {
        name: "Category.title",
        path: ConstantList.ROOT_PATH + "categories",
        icon: "category",
      },
    ],
  },

  {
    name: "Dashboard.manage",
    icon: "engineering",
    children: [
      // {
      //   name: "manage.profile_is_logged",
      //   path: ConstantList.ROOT_PATH + "manage/profile_is_logged",
      //   iconText: "P"
      // },
      {
        name: "manage.user",
        path: ConstantList.ROOT_PATH + "manage/user",
        icon: "keyboard_arrow_right",
      },
    ],
  },
];

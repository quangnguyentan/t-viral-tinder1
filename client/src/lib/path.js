const path = {
  PUBLIC: "/",
  HOMEPAGE: "home",
  ADMIN: "/",
  ADMINDASHBOARD: "",
  HOME: "",
  LOGIN: "sign-in",
  PROFILE: "profile",
  COLLECTION: "collection",
  CUSTOMER: "customers",
  LOTTERY: "lottery",
  INFORMATION: "information",
  NAME: "setName/:id",
  GENDER: "setGender/:id",
  CHANGEPASSWORD: "setPassword/:id",

  BANK: "setBank/:id",
  WITHDRAW: "withdraw/:id",
  HISTORYWITHDRAW: "withdrawalhistory/:id",
  HISTORYWITHDRAWADMIN: "withdrawalhistory",
  HISTORYTRANSFORMADMIN: "withdtransformhistory",

  HISTORYEVALUTE: "evaluatehistory/:id",
  HISTORYEVALUTEADMIN: "evaluatehistory",
  HISTORYDETAILSEVALUTE: "historydetails/:roomId/:userId",
  HISTORYDETAILSEVALUTEADMIN: "historydetails/:roomId",

  HISTORYDEPOSIT: "depositalhistory/:id",
  SETTING: "setting",
  CREATE_COLLECTION: "collection/new",
  CREATE_LOTTERY: "lottery/new",
  CREATE_CUSTOMER: "customer/new",
  CUSTOMER_DETAIL: "customer/:id",

  COLLECTION_DETAIL: "collection/:id",
  LOTTERY_DETAIL: "room/:roomId",

  CINEMA_DETAIL: "video/:title/:id/:userId",
  LOTERY: "lottery/:roomId/:userId/:time",
  EDIT_USER: "edit/:id",
};
export default path;

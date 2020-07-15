import CountryDetail from "./views/pages/reusableComponents/countryDetail/CountryDetail";

const routes = [

  {
    path: "/deepak",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: CountryDetail,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Authentication",
    icon: "ni ni-ungroup text-orange",
    state: "authenticationCollapse",
    views: [

      {
        path: "/password/reset/:uniqueId",
        name: "ForgetPassword",
        component: CountryDetail,
        layout: "/auth"
      }
    ]
  }
];

export default routes;

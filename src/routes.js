import Home from "pages/Home";
import NFTDetail from "pages/NFTDetail";
import NotFound from "pages/NotFound";
import Owner from "pages/Owner";
import Register from "pages/Register";
export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/:account",
    component: Owner,
    exact: true,
  },
  {
    path: "/nft/:nftId",
    component: NFTDetail,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
  },
];

import Bicycle from "../pages/Bicycle";
import Contact from "../pages/Contact";
import DetailPlace from "../pages/DetailPlace";
import DetailPost from "../pages/DetailPost";
import History from "../pages/History";
import Home from "../pages/HomePage/Home";
import Login from "../pages/Login";
import PlacePage from "../pages/PlacePage";
import PostPage from "../pages/PostPage";
import Register from "../pages/Register";
import Search from "../pages/Search";
import UserInfo from "../pages/UserInfor";
import ManageCycles from "../system/ManageCycles";
import ManagePlace from "../system/ManagePlace";
import ManagePost from "../system/ManagePost";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: true,
  },
  {
    path: "/contact",
    component: Contact,
    layout: true,
  },
  {
    path: "/login",
    component: Login,
    layout: false,
  },
  {
    path: "/register",
    component: Register,
    layout: false,
  },
  {
    path: "/detail-place/:id",
    component: DetailPlace,
    layout: true,
  },
  {
    path: "/place",
    component: PlacePage,
    layout: true,
  },
  {
    path: "/detail-post/:id",
    component: DetailPost,
    layout: true,
  },
  {
    path: "/post",
    component: PostPage,
    layout: true,
  },
  {
    path: "/user-info",
    component: UserInfo,
    layout: true,
  },
  {
    path: "/history",
    component: History,
    layout: true,
  },
  {
    path: "/bicycle-rentting",
    component: Bicycle,
    layout: true,
  },
  {
    path: "/search",
    component: Search,
    layout: true,
  },
];

export const privateRoutes = [
  {
    path: "/",
    component: ManagePlace,
    layout: true,
  },
  {
    path: "/manage-bicycle",
    component: ManageCycles,
    layout: true,
  },
  {
    path: "/manage-post",
    component: ManagePost,
    layout: true,
  },
];

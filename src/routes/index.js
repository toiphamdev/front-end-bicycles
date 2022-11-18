import Contact from "../pages/Contact";
import DetailPlace from "../pages/DetailPlace";
import DetailPost from "../pages/DetailPost";
import Home from "../pages/HomePage/Home";
import Login from "../pages/Login";
import PlacePage from "../pages/PlacePage";
import PostPage from "../pages/PostPage";
import Register from "../pages/Register";
import ManagePlace from "../system/ManagePlace";

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
];

export const privateRoutes = [
  {
    path: "/",
    component: ManagePlace,
    layout: true,
  },
];

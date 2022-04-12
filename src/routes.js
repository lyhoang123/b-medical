import Home from 'pages/Home';
import NFTDetail from 'pages/NFTDetail';
import NotFound from 'pages/NotFound';
import Owner from 'pages/Owner';
import Register from 'pages/Register';
import AdminPage from 'pages/AdminPage';
import ProductField from 'pages/ProductField';
import CensorPage from 'pages/CensorPage';
export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/censorPage',
    component: CensorPage,
    exact: true,
  },
  {
    path: '/nft/:nftId',
    component: NFTDetail,
    exact: true,
  },
  {
    path: '/admin',
    component: AdminPage,
    exact: true,
  },
  {
    path: '/product-field',
    component: ProductField,
    exact: true,
  },
  {
    path: '/:account',
    component: Owner,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
];

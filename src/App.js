import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CartProvider } from "./Context/cartcontext"
import { FloatingWhatsApp } from 'react-floating-whatsapp'
// import { logo } from "../public/assets/img/logo/logo.png"
// ApolloClinet Server
import { ApolloClient, ApolloLink, InMemoryCache, split, ApolloProvider } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink } from "apollo-link-http";

// Admin files Imports
import AddProduct from './components/Admin/AddProduct';
import AllProducts from './components/Admin/AllProducts';
import AllUsers from './components/Admin/AllUsers';

import DashboardChart from './components/Admin/DashboardChart';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AllBuyingOrders from "./components/Admin/AllBuyingOrders";
import logow from './components/logow.jpg'
import Down from './Down.js';

import AllCancelledOrder from "./components/Admin/AllCancelledOrder";
import FooterOne from "./wrappers/footer/FooterOne.js";

// home page
const HomeElectronics = lazy(() => import("./pages/home/HomeElectronics"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));


// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const ReturnPolicy = lazy(() => import("./pages/other/ReturnPolicy"));
const SupportPolicy = lazy(() => import("./pages/other/SupportPolicy"));
const TermsOfService = lazy(() => import("./pages/other/TermOfService.js"));
const ShippingPolicy = lazy(() => import("./pages/other/ShippingPolicy.js"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));
const MyOrder = lazy(() => import("./pages/other/MyOrders"));
const Thankyou = lazy(() => import("./pages/other/Thankyou"));

function FooterWrapper() {
  const location = useLocation();
  const isCartRoute = location.pathname === process.env.PUBLIC_URL + "/cart";

  return !isCartRoute && <FooterOne
    backgroundColorClass="bg-gray"
    spaceTopClass="pt-100"
    spaceBottomClass="pb-70"
  />;
}

const App = () => {


  const httpLink = new HttpLink({
    uri: "https://dolphin-app-8r4n5.ondigitalocean.app/",
    // uri: "http://localhost:4000/",
  });

  const wsLink = new WebSocketLink({
    uri: "wss:dolphin-app-8r4n5.ondigitalocean.app/",
    // uri: "ws:localhost:4000/",
    options: {
      reconnect: true
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([splitLink]),
  });

  useEffect(() => {
    localStorage.removeItem('userOtp')
    localStorage.removeItem('userId')
    localStorage.removeItem('userToken')
    localStorage.removeItem('userTokenExpiration')
  }, [])

  return (
    <ApolloProvider client={client}>
      <CartProvider>

        <Router>

          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Routes>

              {/* <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<Down />}
              /> */}

              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<HomeElectronics />}
              />

              <Route path='/adminlogin' element={<AdminLogin />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-standard"} element={<ShopGridStandard />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-filter"} element={<ShopGridFilter />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-full-width"} element={<ShopGridFullWidth />} />
              <Route path={process.env.PUBLIC_URL + "/shop-list-standard"} element={<ShopListStandard />} />
              <Route path={process.env.PUBLIC_URL + "/shop-list-full-width"} element={<ShopListFullWidth />} />
              <Route path={process.env.PUBLIC_URL + "/product/:id"} element={<Product />} />
              <Route path={process.env.PUBLIC_URL + "/blog-standard"} element={<BlogStandard />} />
              <Route path={process.env.PUBLIC_URL + "/blog-details-standard"} element={<BlogDetailsStandard />} />
              <Route path={process.env.PUBLIC_URL + "/about"} element={<About />} />
              <Route path={process.env.PUBLIC_URL + "/refund-policy"} element={<ReturnPolicy />} />
              <Route path={process.env.PUBLIC_URL + "/privacy-policy"} element={<SupportPolicy />} />
              <Route path={process.env.PUBLIC_URL + "/term-of-service"} element={<TermsOfService />} />
              <Route path={process.env.PUBLIC_URL + "/shipping-policy"} element={<ShippingPolicy />} />
              <Route path={process.env.PUBLIC_URL + "/contact"} element={<Contact />} />
              <Route path={process.env.PUBLIC_URL + "/my-account"} element={<MyAccount />} />
              <Route path={process.env.PUBLIC_URL + "/my-order"} element={<MyOrder />} />
              <Route path={process.env.PUBLIC_URL + "/thankyou"} element={<Thankyou />} />
              <Route path={process.env.PUBLIC_URL + "/login-register"} element={<LoginRegister />} />
              <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
              <Route path={process.env.PUBLIC_URL + "/wishlist"} element={<Wishlist />} />
              <Route path={process.env.PUBLIC_URL + "/compare"} element={<Compare />} />
              <Route path={process.env.PUBLIC_URL + "/checkout"} element={<Checkout />} />
              <Route path='/adminDashboard' element={<AdminDashboard />} >
                <Route path='adminchart' element={<DashboardChart />} />
                <Route path='allusers' element={< AllUsers />} />
                <Route path='addproduct' element={<AddProduct />} />
                <Route path='allbuyorder' element={<AllProducts />} />
                <Route path='allorder' element={<AllBuyingOrders />} />
                <Route path='allcancelledorder' element={<AllCancelledOrder />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FooterWrapper />
          </Suspense>
        </Router>


        {/* <div style={{ marginTop: '-10px' }}>
          <FloatingWhatsApp
            phoneNumber="918435821333"
            accountName="Bluster"
            allowEsc
            allowClickAway
            notification
            notificationSound
            avatar={logow}
          />
        </div> */}

      </CartProvider>

    </ApolloProvider>
  );
};

export default App;

//https://dolphin-app-8r4n5.ondigitalocean.app/
//http://localhost:4000/
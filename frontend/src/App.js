import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AdminSignin from './pages/AdminSignIn/AdminSignin';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer/Footer';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';
import Login from './components/Login/Login';
import Admin from './pages/Admin/Admin';
import ProductPage from './components/ProductList/ProductPages/ProductPage';
import EditForm from './components/DashNav/Routes/EditProduct/Edit-Form-Page/EditForm';
import User from './pages/User/User';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Cart/Payment/Payment';
import OrderPage from './pages/User/Orders/OrderPage/OrderPage';
import Activation from './pages/Cart/Activation/Activation';

function App() {
  const isAuthenticated = window.localStorage.getItem('accessToken');
  const userAuth = window.localStorage.getItem('userAuthenticated');
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/terms-of-use" element={<TermsOfUse></TermsOfUse>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/cart/payment" element={<Payment></Payment>}></Route>
        <Route
          path="/cart/activate"
          element={<Activation></Activation>}
        ></Route>
        <Route
          path="/user/signup"
          element={<SignUp title="user"></SignUp>}
        ></Route>
        <Route
          path="/user/signin"
          element={<Login title="user"></Login>}
        ></Route>
        <Route
          path="/user"
          element={
            !userAuth ? <Navigate to="/user/signin" replace /> : <User></User>
          }
        ></Route>
        <Route
          path="/admin/signin"
          element={<AdminSignin title="admin"></AdminSignin>}
        ></Route>
        <Route
          path="/admin/signup"
          element={<SignUp title="admin"></SignUp>}
        ></Route>
        <Route
          path="/admin"
          element={
            !isAuthenticated ? (
              <Navigate to="/admin/signin" replace />
            ) : (
              <Admin></Admin>
            )
          }
        ></Route>
        <Route path="/:id" element={<ProductPage></ProductPage>}></Route>
        <Route path="/order/:orderid" element={<OrderPage></OrderPage>}></Route>
        <Route path="admin/:id" element={<EditForm></EditForm>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;

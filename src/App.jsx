import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductView from "./products/ProductView";
import ProductPage from "./products/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import "./stylesheets/layout.css";
import "./stylesheets/product.css";
import "./stylesheets/authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./admin/AdminPage";
import LoginAdmin from "./admin/LoginAdmin";
import "./stylesheets/administrator.css";
import UserPage from "./users/UsersPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes isAllowed={localStorage.getItem("currentUser")}>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="productview/:productid"
            exact
            element={
              <ProtectedRoutes isAllowed={localStorage.getItem("currentUser")}>
                <ProductView />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/products"
            exact
            element={
              <ProtectedRoutes isAllowed={localStorage.getItem("currentUser")}>
                <ProductPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes isAllowed={localStorage.getItem("currentUser")}>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes isAllowed={localStorage.getItem("currentUser")}>
                <OrdersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedAdmin
                isAllowed={
                  localStorage.getItem("currentUser") &&
                  localStorage.getItem("currentUser").includes("admin")
                }
              >
                <AdminPage />
              </ProtectedAdmin>
            }
          />
          <Route path="/login/admin" exact element={<LoginAdmin />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/user" exact element={<UserPage />} />
          <Route
            path="*"
            exact
            element={
              <h1>
                There's nothing here: 404! <Navigate to={"/"}>Home</Navigate>{" "}
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Protected Proutes
export const ProtectedRoutes = ({
  children,
  isAllowed,
  redirectPath = "/login",
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children;
  }
};

export const ProtectedAdmin = ({
  children,
  isAllowed,
  redirectPath = "/login/admin",
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children;
  }
};

import React, { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "./Layout";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    quanity: 1,
    description: "",
    brand_name: "",
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email:"",
    password: ""
  })
  const [showAccount, setShowAccount] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const handleCloseAccount = () => setShowAccount(false);
  const handleShowAccount = () => setShowAccount(true);

  // get data from products
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const productsRef = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      productsRef.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // get data from users
  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUsers(usersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const deleteUser = async (item) => {
    try {
      if (window.confirm("Do you want to delete this user?")) {
        setLoading(true);
        await deleteDoc(doc(fireDB, "users", item.id));
        toast.success("User account deleted successfully");
        getUserData();
      }
    } catch (error) {
      toast.failed("User account deleted failed");
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "users", user.id), user);
      handleCloseAccount();
      console.log(users)
      toast.success("User updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("User updated failed");
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "users"), user);
      handleClose();
      toast.success("User added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("User added failed");
      setLoading(false);
    }
  };

  const addHandlerAccount = () => {
    setAddAccount(true);
    handleShowAccount();
  };

  const editHandlerUser = (item) => {
    setUser(item);
    setShowAccount(true);
  };

  // get data from orders
  useEffect(() => {
    getOrderData();
  }, []);

  async function getOrderData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product updated failed");
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose();
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product added failed");
      setLoading(false);
    }
  };

  const close = () => {
    window.location.reload();
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct = async (item) => {
    try {
      if (window.confirm("Do you want to delete this product?")) {
        setLoading(true);
        await deleteDoc(doc(fireDB, "products", item.id));
        toast.success("Product deleted successfully");
        getData();
      }
    } catch (error) {
      toast.failed("Product deleted failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <Tabs
        // defaultActiveKey="products"
        // id="uncontrolled-tab-example"
        className="mb-3"
      >
        {/* --------------------------- PRODUCTS LIST --------------------------- */}
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between mx-1">
            <h3>Products List</h3>
            <button onClick={addHandler}>ADD PRODUCT</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Quanity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.imageURL} height="80" width="80" alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.brand_name}</td>
                    <td>{item.quanity}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaTrashAlt
                        onClick={() => deleteProduct(item)}
                        color="red"
                        size={20}
                      />
                      <FiEdit
                        onClick={() => editHandler(item)}
                        color="blue"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? `Add a product` : `Edit Product`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.imageURL}
                  className="form-control"
                  placeholder="image url"
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={product.price}
                  className="form-control"
                  placeholder="price"
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={product.quanity}
                  className="form-control"
                  placeholder="quanity"
                  onChange={(e) =>
                    setProduct({ ...product, quanity: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.description}
                  className="form-control"
                  placeholder="description"
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.brand_name}
                  className="form-control"
                  placeholder="brand_name"
                  onChange={(e) =>
                    setProduct({ ...product, brand_name: e.target.value })
                  }
                />
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={close}>Close</button>
              {add ? (
                <button onClick={addProduct}>Save</button>
              ) : (
                <button onClick={updateProduct}>Save</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>

        {/* --------------------------- ORDERS LIST --------------------------- */}
        <Tab eventKey="orders" title="Orders">
          <div className="d-flex justify-content-between">
            <h3>Orders List</h3>
          </div>
          {orders.map((order, index) => {
            return (
              <table className="table mt-3 order" key={index}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quanity</th>
                    <th>Price</th>
                    <th>Email: {order.email}</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.imageURL}
                            height="80"
                            width="80"
                            alt=""
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quanityPre}</td>
                        <td>{item.price}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>

        {/* --------------------------- USERS LIST --------------------------- */}
        <Tab eventKey="users" title="Users">
          <div className="d-flex justify-content-between">
            <h3>Users List</h3>
            <button onClick={addHandlerAccount}>ADD USER</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Auth Provider</th>
                <th>email</th>
                <th>name</th>
                <th>password</th>
                <th>uid</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.authProvider}</td>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.password}</td>
                    <td>{item.uid}</td>
                    <td>
                      <FaTrashAlt
                        onClick={() => deleteUser(item)}
                        color="red"
                        size={20}
                      />
                      <FiEdit
                        onClick={() => editHandlerUser(item)}
                        color="blue"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={showAccount} onHide={handleCloseAccount}>
            <Modal.Header closeButton>
              <Modal.Title>
                {addAccount === true ? `Add a user` : `Edit User`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={user.authProvider}
                  className="form-control"
                  placeholder="auth provider"
                  onChange={(e) =>
                    setUser({ ...user, authProvider: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={user.email}
                  className="form-control"
                  placeholder="email"
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={user.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
                <input
                  type="password"
                  value={user.password}
                  className="form-control"
                  placeholder="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                {/* <input
                  type="text"
                  value={user.uid}
                  className="form-control"
                  placeholder="uid"
                  onChange={(e) =>
                    setUser({ ...user, uid: e.target.value })
                  }
                /> */}
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={close}>Close</button>
              {add ? (
                <button onClick={addUser}>Save</button>
              ) : (
                <button onClick={updateUser}>Save</button>
                
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default AdminPage;

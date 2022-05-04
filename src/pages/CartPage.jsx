import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + cartItems.price * cartItems.quanityPre;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const handleIncreasement = (product) => {
    dispatch({ type: "PLUS_QUANITY", payload: product });
  };

  const handleDecrement = (product) => {
    dispatch({ type: "MINUS_QUANTITY", payload: product });
  };

  const clearFromCart = (product) => {
    dispatch({ type: "CLEAR_CART", payload: product });
  };

  const placeOder = async () => {
    const addressInfo = {
      name,
      address,
      phoneNumber,
    };

    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      console.log(result);
      setLoading(false);
      toast.success("Order placed successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <Layout loading={loading}>
      {cartItems.length !== 0}
      <div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th className="px-3">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item.imageURL} height="80" width="80" alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="input-group">
                      <button onClick={() => handleDecrement(item)}>
                        <span className="plus-qty">-</span>
                      </button>
                      <div className="form-control text-center">
                        {item.quanityPre}
                      </div>
                      <button onClick={() => handleIncreasement(item)}>
                        <span className="plus-qty">+</span>
                      </button>
                    </div>
                  </td>
                  <td>{item.price * item.quanityPre}</td>
                  <td>
                    <FaTrash onClick={() => deleteFromCart(item)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {cartItems.length === 0 && (
          <>
            <div className="px-5">
              No items in your cart or slow internet causing trouble (Refresh
              the page) or you are not logged in 
            </div>
            <div className="px-5 tex-primary return-home">
              <Link to="/">Return to Home page</Link>
            </div>
          </>
        )}
        
        <div className="d-flex justify-content-end">
          <h1 className="total-amount">Total Amount = ${totalAmount}</h1>
        </div>
        <div className="d-flex justify-content-end mt-3 m-4">
        <button className="button-clear" onClick={() => clearFromCart(cartItems)}>CLEAR CART</button>
        </div>
        <div className="d-flex justify-content-end mt-3 m-4">
          <button className="button-order" onClick={handleShow}>PLACE ORDER</button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add your address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="register-form">
              <h2>Register</h2>
              <hr />
              <input
                type="text"
                className="form-control"
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <textarea
                type="text"
                className="form-control"
                placeholder="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <input
                type="number"
                className="form-control"
                placeholder="phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />

              <hr />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>CANCLE</button>
            <button onClick={placeOder}>ORDER</button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
}

export default CartPage;

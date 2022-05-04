import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import Layout from "../components/Layout";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <div className="p-2">
        {orders
          .filter((obj) => obj.userid === userid)
          .map((order ,index) => {
            return (
              <table className="table mt-3 order" key={index}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quanity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item ,index) => {
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
      </div>
    </Layout>
  );
}

export default OrdersPage;

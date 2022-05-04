import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../stylesheets/product-slide.css";

function ProductView() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const params = useParams();

  useEffect(() => {
    getInfoData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getInfoData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <div className="container-info">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <h2 className="py-3">
                    <b>{product.name}</b>
                </h2>
                <Carousel infiniteLoop autoPlay>
                  <div className="image">
                    <img src={product.imageURL} alt="" />
                  </div>
                  <div className="image">
                    <img src={product.imageURL} alt="" />
                  </div>
                  <div className="image">
                    <img src={product.imageURL} alt="" />
                  </div>
                </Carousel>
                <hr />
                <p>{product.description}</p>
                <h2>Price: ${product.price}</h2>
                <div className="d-flex justify-content-end my-3">
                  <button onClick={() => addToCart(product)}>
                    ADD TO CARRT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductView;

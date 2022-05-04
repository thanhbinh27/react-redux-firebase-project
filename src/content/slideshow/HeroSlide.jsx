import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <Link to="/products">
            <img
              className="d-block w-100 mh-100 image-slide"
              src="https://fptshop.com.vn/uploads/originals/2019/9/13/637039709133576092_iphone-11-pro-stock-wallpaper-via-ar72014-mock-up.jpg"
              alt="First slide"
            />
          </Link>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Link to="/products">
            <img
              className="d-block w-100 image-slide"
              src="https://cdn.tgdd.vn/Files/2020/05/26/1258494/iphone_800x450.jpg"
              alt="Second slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/products">
            <img
              className="d-block w-100 image-slide"
              src="https://img.bfmtv.com/c/0/0/335/02106a1b44fa1369e9a91a3c73348.jpg"
              alt="Third slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/products">
            <img
              className="d-block w-100 image-slide"
              src="https://cdn.techjuice.pk/wp-content/uploads/2020/09/watch.jpg"
              alt="Four slide"
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HeroSlider;
import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <MDBFooter
      className="text-center footer-container"
      color="white"
      bgColor="dark"
    >
      <MDBContainer className="p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1 px-3"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </a>
        </section>

        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="mt-3 py-1">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <MDBCol md="5" start="12">
                <MDBInput
                  contrast
                  type="email"
                  placeholder="enter your email"
                  className="mb-4 mt-3"
                />
              </MDBCol>

              <div className="col-auto">
                <MDBBtn
                  outline
                  color="light"
                  type="submit"
                  className="mt-3 py-1"
                >
                  Subscribe
                </MDBBtn>
              </div>
            </div>
          </form>
        </section>

        <section className="mb-4">
          <p>
            THANH BINH Inc. is an American multinational art corporation
            headquartered in Cupertino, California, that designs, develops, and
            sells used electronics, computer software, and online services. It
            is considered one of the Big Five of the US IT industry, along with
            Amazon, Google, Microsoft and Meta.
          </p>
        </section>

        <section className="">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Shop and Learn</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Store
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Mac
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    iPad
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    iPhone
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    AirPods
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Services And Insurance</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Apple Music
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Apple TV+
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Apple Fitness+
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Apple News+
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">THANHBINH Store</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Find a Store
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Genius Bar
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Today at Apple
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Apple Camp
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">About THANHBINH</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    TB Leadership
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Career Opportunities
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Contact TB
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className="text-center p-3 copycright">
        © 2022 Copyright:
        <a className="text-white" href="/">
          &nbsp; thanhbinh.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;

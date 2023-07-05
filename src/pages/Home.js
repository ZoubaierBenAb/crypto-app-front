import React from "react";
import "../components/components-style/Home.css";
import globe from "../assests/home-globe.png";
import CryptoCurrencies from "./CryptoCurrencies";
import CryptoGlobalStats from "../components/CryptoGlobalStats";
import TopCryptos from "../components/TopCryptos";
import { Button, Col, Row } from "antd";
import CryptoTable from "../components/CryptoTable";
import {blue} from '@ant-design/colors'
const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
function Home() {
  
  return (
    <div>
      <Row className="our-website">
        <Col 
        className="first-desc">
          <p>Your access to CryptoCurrency</p>
          <p>
            Welcome to our crypto website, your ultimate destination for
            up-to-date cryptocurrency prices, latest news, exchanges, and
            insights into the world of crypto.
          </p>
        </Col>
        <Col className="second-desc">
          <img src={globe} alt="Globe" className="globe-image" />
        </Col>
      </Row>

      <Row>
        <Col>

          <CryptoGlobalStats />
        </Col>
        <Col>
          <TopCryptos />
        </Col>
      </Row>

      <CryptoTable/>
      <Button style={{marginLeft : '1100px' , marginTop : '40px' , marginBottom : '40px'}} color= {blue[7]} 
    onClick={handleScrollToTop}>Scroll to Top</Button>
    </div>
  );
}

export default Home;

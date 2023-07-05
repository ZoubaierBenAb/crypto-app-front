import React from "react";
import "./components-style/wishlist.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { Typography } from "antd";
import { deleteCoinFromWishlist } from "../reduxSlices/wishlistSlice";
import { useDispatch } from "react-redux";
import {blue,volcano} from '@ant-design/colors'
import { Link } from "react-router-dom";
import millify from "millify";

const { Title } = Typography;

function WishlistItemCard({ item }) {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${item}`
        );

        setData(response.data);
      } catch (error) {
        setData([]);
      }
    };

    fetchCoinData();
  }, []);

  

  const handleRemoveFromWishlist = () => {
    dispatch(deleteCoinFromWishlist(item));
  };
  console.log('coinnnninfo',data)

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="container-1">
            <div className="coin-image">
              <img src={data && data.image && data.image.small} alt="coin-image" />
            </div>

            <div>
              <Title
              
                style={{ textTransform: "uppercase", color: blue[4] }}
                level={3}
              >
                <Link to={`/${item}`}>
                {item}
                </Link>
              </Title>
            </div>
          </div>
        </Col>
        <div style={{color : volcano[1]}} className="current-price">{data && data.market_data.current_price.usd}$</div>
      </Row>
      <div style={{marginBottom : '15px'}}></div>
      <Row >
        <div>
        <Col><div className="coin-infos"><h4>Market Cap :</h4><h4>{data &&millify(data.market_data.market_cap.usd) }$</h4></div></Col>
        <Col><div className="coin-infos"><h4>Rank : </h4><h4>{data && millify(data.market_cap_rank)}</h4></div></Col>
        <Col><div className="coin-infos" ><h4>All Time High :</h4><h4>{data && millify(data.market_data.ath.usd)}$</h4></div></Col>
        </div>
      </Row>
      <div style={{ marginBottom: "140px" }}></div>
      <Row>
        <Col offset={4}>
          <Button danger type = 'text' onClick={handleRemoveFromWishlist}>
            Remove coin from wishlist
          </Button>
        </Col>
      </Row>
    
    </div>
  );
}

export default WishlistItemCard;

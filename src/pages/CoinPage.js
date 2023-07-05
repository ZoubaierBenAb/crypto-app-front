import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row, Button, Typography } from "antd";
import "../components/components-style/CoinPage.css";
import bear from "../assests/bear.png";
import CoinChart from "../components/CoinChart";
import millify from "millify";
import CommentsSection from "../components/commentSection";
import { green, red } from "@ant-design/colors";

const { Title, Text } = Typography;

function CoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState({});
  const [time, setTime] = useState(7);
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}?community_data=false&developer_data=false`
        );
        console.log("coin data", response.data);
        setCoinData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchHistoryData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${time}%20`
      );

      setHistoryData(
        response.data.prices.map((value) => ({
          x: value[0],
          y: value[1].toFixed(2),
        }))
      );
      console.log("history data", historyData);
    };

    fetchHistoryData();
    fetchCoinData();
  }, [coinId, time]);

  const handleTimeChange = (time) => {
    setTime(time);
  };
  return (
    <div>
      <div style={{ marginBottom: "80px" }} />

      <Row>
        <Col offset={3} className="coin-box">
          <div style={{ display: "flex" }}>
            <div>
              <Title className = 'coin-name'style={{ color: "rgba(255, 247, 251, 0.8)" }}>
                {coinData.name}
              </Title>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {coinData.image && (
                <img
                  className="coin-image"
                  src={coinData.image.large}
                  alt="coin-image"
                />
              )}
            </div>
          </div>
        </Col>
    
      </Row>
      <Row> 
      <Col offset={11} style={{ marginTop: "35px" }}>
          {coinData.market_data && (
            <>
              <Text strong>
                <div
                  style={{
                    color: "rgba(255, 247, 251, 0.8)",
                    fontSize: "30px",
                  
                  }}
                >
                  {coinData.market_data.current_price.usd}$
                </div>
              </Text>
            </>
          )}
        </Col>
        <Col>
          {coinData.market_data && (
            <Title
              style={{
                marginTop: "45px",
                fontStyle: "strong",
                fontSize: "15px",
                marginLeft: "10px",
                color: "rgba(255, 247, 251, 0.8)",
                backgroundColor:
                  coinData.market_data.price_change_percentage_24h > 0
                    ? green[6]
                    : red[6],
                borderRadius: "3px",
                width: "50px",
                height: "30px",
                display: 'flex',
                justifyContent:'center',
                alignItems : 'center'
              }}
            ><p>{coinData.market_data.price_change_percentage_24h > 0 ? "+" : ""}</p>
              
              <p>
                {millify(coinData.market_data.price_change_percentage_24h)}%
              </p>
            </Title>
          )}
        </Col>
      </Row>

      <div style={{ marginTop: "35px" }}></div>
      <Row
        justify="space-between"
        style={{
          border: "0.5px solid lightgrey",
          width: "1100px",
          marginLeft: "200px",
        }}
      >
        <Col span={4}>
          {coinData.market_data && (
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "rgba(255, 247, 251, 0.8)",
                }}
              >
                Market Cap:
              </span>
              <br />
              <span style={{ fontWeight: "bold", color: "rgb(103, 136, 235)" }}>
                {millify(coinData.market_data.market_cap.usd)}$
              </span>
            </div>
          )}
        </Col>
        <Col span={4}>
          {coinData.market_data && (
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "rgba(255, 247, 251, 0.8)",
                }}
              >
                Market Cap Rank:
              </span>
              <br />
              <span style={{ fontWeight: "bold", color: "rgb(103, 136, 235)" }}>
                {coinData.market_cap_rank}
              </span>
            </div>
          )}
        </Col>
        <Col span={4}>
          {coinData.market_data && (
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "rgba(255, 247, 251, 0.8)",
                }}
              >
                All-Time High:
              </span>
              <br />
              <span style={{ fontWeight: "bold", color: "rgb(103, 136, 235)" }}>
                {coinData.market_data.ath && coinData.market_data.ath.usd}$
              </span>
            </div>
          )}
        </Col>
        <Col span={4}>
          {coinData.market_data && (
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "rgba(255, 247, 251, 0.8)",
                }}
              >
                Circulating Supply:
              </span>
              <br />
              <span style={{ fontWeight: "bold", color: "rgb(103, 136, 235)" }}>
                {millify(coinData.market_data.circulating_supply)}
              </span>
            </div>
          )}
        </Col>
        <Col span={4}>
          {coinData.market_data && (
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "rgba(255, 247, 251, 0.8)",
                }}
              >
                Total Supply:
              </span>
              <br />
              <span style={{ fontWeight: "bold", color: "rgb(103, 136, 235)" }}>
                {millify(coinData.market_data.total_supply)} {coinData.symbol}
              </span>
            </div>
          )}
        </Col>
      </Row>

      <div style={{ marginBottom: "60px" }} />

      <Row>
        <Col offset={6}>
          <Button
            type="text"
            size="small"
            style={{
              color: "rgba(255, 247, 251, 0.8)",
              opacity: time === 1 ? 1 : 0.5,
            }}
            onClick={() => handleTimeChange(1)}
          >
            D
          </Button>
          <Button
            type="text"
            size="small"
            style={{
              color: "rgba(255, 247, 251, 0.8)",
              opacity: time === 7 ? 1 : 0.5,
            }}
            onClick={() => handleTimeChange(7)}
          >
            W
          </Button>
          <Button
            type="text"
            size="small"
            style={{
              color: "rgba(255, 247, 251, 0.8)",
              opacity: time === 30 ? 1 : 0.5,
            }}
            onClick={() => handleTimeChange(30)}
          >
            M
          </Button>
          <Button
            type="text"
            size="small"
            style={{
              color: "rgba(255, 247, 251, 0.8)",
              opacity: time === 365 ? 1 : 0.5,
            }}
            onClick={() => handleTimeChange(365)}
          >
            Y
          </Button>
          <Button
            type="text"
            size="small"
            style={{
              color: "rgba(255, 247, 251, 0.8)",
              opacity: time === 1765 ? 1 : 0.5,
            }}
            onClick={() => handleTimeChange(1765)}
          >
            5Y
          </Button>
        </Col>
      </Row>

      <Row>
        <Col offset={3} span={18}>
          <CoinChart historyData={historyData} coinData={coinData}></CoinChart>
        </Col>
      </Row>
      <div style={{ marginBottom: "50px" }}></div>
      <Row>
        <Col offset={4}>
          <CommentsSection coinId={coinId} />
        </Col>
      </Row>  
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
  );
}

export default CoinPage;

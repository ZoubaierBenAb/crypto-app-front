import React, { useEffect, useState } from 'react';
import { fetchCoinbyCategory, fetchTrendingCryptos } from '../cryptoApi/cryptoStatsApi';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';

import "../components/components-style/CryptoStats.css";
import CategoryCard from '../components/CategoryCard';

function CryptoCurrencies() {
  const [categoryData, setCategoryData] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const defiData = await fetchCoinbyCategory('decentralized-exchange');
      const defiCategory = { category: 'defi', coins: defiData };

      const gamingData = await fetchCoinbyCategory('gaming');
      const gamingCategory = { category: 'gaming', coins: gamingData };

      const layerOneData = await fetchCoinbyCategory('layer-1');
      const layerOneCategory = { category: 'layer-1', coins: layerOneData };


      const memeData = await fetchCoinbyCategory('meme-token')
      const memeCategory = {category : 'meme',coins : memeData}

      setCategoryData([defiCategory, gamingCategory, layerOneCategory,memeCategory]);
    };

    fetchData();
  }, []);

  const handleShowMore = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="crypto-stats-container">
    
      {categoryData.map((category) => (
        <div className="crypto-stats-col" key={category.category}>
          <CategoryCard category={category.category} coins={category.coins}>
          </CategoryCard>
          <div className="show-more">
              <button onClick={() => handleShowMore(category.category)}>
                Show More
              </button>
            </div>
        </div>
      ))}
  
  </div>
  
  );
}

export default CryptoCurrencies;

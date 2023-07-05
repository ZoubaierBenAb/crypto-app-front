import { useEffect, useState } from 'react';
import { globalStats } from '../cryptoApi/cryptoStatsApi';
import './components-style/globalStats.css'
import millify from 'millify';


function CryptoGlobalStats() {
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const response = await globalStats();
        setGlobalData(response);
        console.log('Global stats:', response);
      } catch (error) {
        console.log('Error fetching global stats:', error);
      }
    };

    fetchGlobalStats();
  }, []);

  if (!globalData) {
    return <div>Loading...</div>;
  }

  const totalMarketCap = millify(globalData.data.total_market_cap.usd);
  const marketCapChangePercentage = globalData.data.market_cap_change_percentage_24h_usd;

  const marketCapChangeColor = marketCapChangePercentage > 0 ? 'green' : 'red';

  return (
    <div className='global-container'>
      <p>
        Today's crypto market cap is ${totalMarketCap},{' '}
        <span style={{ color: marketCapChangeColor }}>
          {marketCapChangePercentage > 0 ? '+' : ''}
          {Math.abs(marketCapChangePercentage).toFixed(2)}%
        </span>{' '}
        from the previous day.
      </p>
    </div>
  );
}

export default CryptoGlobalStats;

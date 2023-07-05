import React from 'react';
import { Link } from 'react-router-dom';
import './components-style/CryptoStats.css'
const CategoryCard = ({ category, coins }) => {
  return (
    <div className="category-card">
      <div className="category-header">
        <h2>{category}</h2>
      </div>
      <div className="category-coins" >
        {coins.map((coin) => (<>
          <div className="crypto-info" key={coin.id} >
            <img className="crypto-image" src={coin.image} alt={coin.name} />
            <h5>
              <Link to={`/${coin.id}`} key={coin.id}>
                {coin.name}
              </Link>
            </h5>
          </div>
           <div>
           <h5>
             {coin.current_price}
           </h5>
           <h6>
             {coin.price_change_percentage_24h}
           </h6>
           
            </div>
            </>
          
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;

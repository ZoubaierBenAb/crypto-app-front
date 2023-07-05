import axios from "axios";

export const fetchTrendingCryptos = async () => {
  
  try {
    const response = await axios.get( 'https://api.coingecko.com/api/v3/search/trending' )
    return response.data;
  }
  
  catch (error) {
    return [];
  }
};

export const fetchCoinbyCategory = async (category) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${category}&per_page=5&page=1&sparkline=false&locale=en`
    );
    return response.data;
  }
    catch (error) {
    return [];
  }
};

export const globalStats = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");
    console.log("global", response.data);
    return response.data;
  } catch (error) {
    return [];
  }
};
export const fetchCoins = async()=>{

try {
  const response = await axios.get('http://localhost:5000/data')  
  return response.data
} catch (error) {
  return []
}



}

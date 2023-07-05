
import './App.css';
import {Route,Routes} from 'react-router-dom'
import CryptoCurrencies from './pages/CryptoCurrencies';
import Exchanges from './pages/Exchanges';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header'
import  Home  from './pages/Home';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { ConfigProvider } from 'antd';
import CoinPage from './pages/CoinPage';
import Wishlist from './pages/Wishlist';
import ScreenSize from './components/test';

function App() 

{

  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/:coinId" element={<CoinPage/>} />
        <Route path = '/wishlist' element={<Wishlist/>}/>
        <Route path='/cryptoCurrencies' element={<CryptoCurrencies/> }>Crypto Currencies</Route>
        <Route path='/exchanges' element={<Exchanges/>}>Exchanges</Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
      </Routes>
    
      <ToastContainer/> 
    </div>
  );
}

export default App;

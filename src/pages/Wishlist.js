import  { useState,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../reduxSlices/wishlistSlice";
import WishlistItemCard from "../components/WishlistItemCard";
import { motion } from "framer-motion";
import { Typography } from "antd";
import '../components/components-style/wishlist.css';
const {Title} = Typography
const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  const [width,setWidth] = useState(0)

  const carousel = useRef()

  useEffect(() => {
    dispatch(fetchWishlist());
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [dispatch,carousel]);


  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Title style={{color : 'rgba(255, 247, 251, 0.8'}} className="title">Your Wishlist</Title>
      <div style={{marginBottom : '100px'}}></div>
      <motion.div ref={carousel} className="carousel">
        <motion.div drag = 'x' dragConstraints={{right : 0 , left : -width}}  className="inner-carousel">
          {wishlist.map((item) => (
            <motion.div className="item" key={item}>
              <WishlistItemCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Wishlist;

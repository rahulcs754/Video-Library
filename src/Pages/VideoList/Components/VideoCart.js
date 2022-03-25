import { useVideo } from "../../../Context/VideoContext";
//import { useWish } from "../../Context/WishContext";

import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthData } from "../../../../Context/AuthContext";

const VideoCart = props => {
  const {
    _id,
    image,
    title,
    price,
    mrpPrice,
    discount,
    isLiked,
    inStock,
    storageQty,
    isSelected,
  } = props;

  const { WishlistDispatch } = useWish();
  const { ProductDispatch } = useProduct();
  const { CartDispatch } = useCart();
  const { userAuth } = useAuthData();
  const navigate = useNavigate();
  const { isUserLoggedIn } = userAuth;

  console.log("change data", isUserLoggedIn);
  const productDetails = { _id, qty: 1, amount: price };

  const addHandler = productDetails => {
    CartDispatch({ type: "ADD_TO_CART", payload: productDetails });
    ProductDispatch({
      type: "DECREASE_PRODUCT_QTY",
      payload: productDetails._id,
    });
    ProductDispatch({
      type: "IS_SELECTED",
      payload: productDetails._id,
    });
  };

  const wishlistHandler = productId => {
    WishlistDispatch({ type: "ADD_AND_REMOVE_WISHLIST", payload: productId });
    ProductDispatch({ type: "IS_LIKED", payload: productId });
  };

  return (
    <div className="card card-overlay">
      <img src={image} className="card-image img-c" alt="Card-Image" />
      <FaHeart
        className={` ${styles.wishlistIcon} ${
          isLiked ? styles.selectedwishlistIcon : styles.defaultWishlistIcon
        } `}
        onClick={() => wishlistHandler(_id)}
      />

      <div className="card-header">
        <div className="card-title">{title}</div>
      </div>
      <div className="card-info">
        <p className="card-price">$ {price}</p>
        <p className="mrp-price">$ {mrpPrice}</p>
        <p className="card-discount">{discount}</p>
      </div>
      <div className="card-footer ">
        {isSelected ? (
          <button className={`btn btn-warning ${styles.addtocartText} `}>
            <Link to="/cart">
              <i className="fas fa-shopping-cart mr-s" />
              Go To Cart
            </Link>
          </button>
        ) : isUserLoggedIn ? (
          <button
            className={`btn btn-warning ${styles.addtocartText} `}
            onClick={() => addHandler(productDetails)}
          >
            <i className="fas fa-shopping-cart mr-s" />
            Add To Cart
          </button>
        ) : (
          <button
            className={`btn btn-warning ${styles.addtocartText} `}
            onClick={() => navigate("/login")}
          >
            <i className="fas fa-shopping-cart mr-s" />
            Add To Cart
          </button>
        )}

        {isUserLoggedIn ? (
          <button
            className="btn btn-primary"
            onClick={() => wishlistHandler(_id)}
          >
            {isLiked ? "Added To Wishlist" : "Add To Wishlist"}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            {isLiked ? "Added To Wishlist" : "Add To Wishlist"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCart;

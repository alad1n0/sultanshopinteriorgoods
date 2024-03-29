import React from 'react';
import { Link } from 'react-router-dom';
import './_Product.scss';
import checkTheBasket from '../../utils/checkTheBasket';

function Product(props) {
  let countInCart = 0;
  const localCart = JSON.parse(localStorage.getItem('cart'));

  function handleClick() {
    props.onProductClick(props.product);
  }

  if (localCart) {
    const productCartCount = localCart.find((el) => el.id === props.product.id);
    if (productCartCount) {
      countInCart = productCartCount.count;
    }
  }

  function handleAddProduct(e) {
    e.preventDefault();
    props.onAddProductToCart(props.product);
    countInCart++;
  }

  function handleCartInc(e) {
    e.preventDefault();
    props.onCartInc(props.product);
    countInCart++;
  }

  function handleCartDec(e) {
    e.preventDefault();
    props.onCartDec(props.product);
    countInCart--;
  }

  return (
    <Link
      onClick={handleClick}
      to={`/product/${props.product.id}`}
      className="product"
    >
      <img
        src={props.product.url}
        alt={`${props.product.brand} ${props.product.title}`}
        className="product__image"
      />
      <div className="product__title">
        <h3 className="product__title-vendor">
          {props.product.brand}&nbsp;
          <span className="product__title-name">{props.product.title}</span>
        </h3>
      </div>
      <div className="product__barcode product__parameter">
        <span>Штрих код&#58;&#160;</span>
        {props.product.barcode}
      </div>
      <div className="product__vendor product__parameter">
        <span>Виробник&#58;&#160;</span>
        {props.product.vendor}
      </div>
      <div className="product__brand product__parameter">
        <span>Бренд&#58;&#160;</span>
        {props.product.brand}
      </div>
      <div className="product__container">
        <p className="product__price">{props.product.price} &#8372;</p>

        <button
          onClick={handleAddProduct}
          className={`product__button ${
            !checkTheBasket(props.product.id) &&
            countInCart > 0 &&
            'product__button_hidden'
          }`}
        >
          В кошик
          <div className="product__price-icon"></div>
        </button>

        <div
          className={`product-card__cart-action ${
            (checkTheBasket(props.product.id) || countInCart < 1) &&
            'product-card__cart-action_hidden'
          }`}
        >
          <button
            disabled={countInCart < 1}
            onClick={handleCartDec}
            type="button"
            className="product-card__cart-inc product-card__cart-button"
          >
            &#8722;
          </button>
          &#160;&#160;&#160;
          <span data-testid="cart-count" className="product-card__cart-count">
            {countInCart}
          </span>
          &#160;&#160;&#160;
          <button
            disabled={countInCart > 20}
            onClick={handleCartInc}
            type="button"
            className="product-card__cart-dec product-card__cart-button"
          >
            &#43;
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Product;

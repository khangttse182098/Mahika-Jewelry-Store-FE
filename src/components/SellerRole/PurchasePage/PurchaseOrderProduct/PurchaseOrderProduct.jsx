/* eslint-disable react/prop-types */
import classes from "./PurchaseOrderProduct.module.css";
import { useContext } from "react";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";
import { formatter } from "../../../../util/formatter";
import ImageLoader from "../../../../util/ImageLoader";

const PurchaseOrderProduct = ({ product, sellOrderCode }) => {
  const { removeItemFromSellInvoice } = useContext(ProductSellInvoiceContext);
  const { addItemToSellList } = useContext(ProductSellListContext);
  //fetch get sell order by sell order code
  const handleFetch = () => {
    fetch(
      `http://mahika.foundation:8080/swp/api/sell-order?sellOrderCode=${sellOrderCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        const oldProduct = data.find((item) => item.id === product.id);

        //change product price back to old price
        product = { ...product, price: oldProduct.price };
        addItemToSellList(product);
        removeItemFromSellInvoice(product);
      });
  };

  function handleClick() {
    handleFetch();
  }

  return (
    <div className={classes.container}>
      <div className={classes["content-container"]}>
        <div style={{ display: "flex" }}>
          <div className={classes["img-container"]}>
            <ImageLoader URL={product.productImage} />
          </div>
          <div className={classes["product-info"]}>
            <h1 className={classes.h1}>{product.productName}</h1>
            <p>Mã sản phẩm: {product.productCode}</p>
            <p>Giá: {formatter.format(product.price)}</p>
          </div>
        </div>
        <button className={classes.btn} onClick={handleClick}>
          -
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderProduct;

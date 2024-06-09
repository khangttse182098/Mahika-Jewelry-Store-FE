/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classes from "./PurchaseOrderDetail.module.css";
import PurchaseOrderProduct from "../PurchaseOrderProduct/PurchaseOrderProduct";
import { useContext, useState, useEffect } from "react";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { formatter } from "../../../../util/formatter";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";

const PurchaseOrderDetail = ({ sellOrderCode }) => {
  const { itemSellInvoice, setItemSellInvoice } = useContext(
    ProductSellInvoiceContext
  );
  const { itemSellList } = useContext(ProductSellListContext);
  const { userId } = useContext(LoggedInUserContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const total = itemSellInvoice.reduce((sum, item) => sum + item.price, 0);
    setPrice(total);
  }, [itemSellInvoice]);

  const productSellInvoiceListId = [];
  itemSellInvoice.map((item, index) => productSellInvoiceListId.push(item.id));

  const reqBodySellInvoicePrice = {
    productId: [...productSellInvoiceListId],
  };
  // receive price from BE
  const handleFetch = () => {
    fetch(
      "http://mahika.foundation:8080/swp/api/purchase-order/product-price",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBodySellInvoicePrice),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setItemSellInvoice(
          itemSellInvoice.reduce((acc, curr) => {
            const resInvoice = data.find(
              (element) => element.productId === curr.id
            );
            return [...acc, { ...curr, price: resInvoice.purchasePrice }];
          }, [])
        );
      });
  };

  useEffect(() => {
    handleFetch();
  }, [itemSellList]);

  // send purhchase order to BE
  const reqBody = {
    sellOrderCode: sellOrderCode,
    userId: userId,
    productId: [...productSellInvoiceListId],
  };
  function handleClick() {
    fetch("http://mahika.foundation:8080/swp/api/purchase-order/have-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then((res) => {
      setItemSellInvoice([]);
    });
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>Thông tin đơn hàng</div>
        <div className={classes["container-order"]}>
          {itemSellInvoice.map((product, productIndex) => {
            return (
              <PurchaseOrderProduct
                sellOrderCode={sellOrderCode}
                key={productIndex}
                product={product}
              />
            );
          })}
        </div>
        <div>
          <div className={classes.frame}>
            <p className={classes.p}>Chiết khấu</p>
            <p className={classes.p}></p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Tổng số lượng</p>
            <p className={classes.p}>{itemSellInvoice.length ?? ""}</p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Tổng tiền</p>
            <p className={classes.p}>
              {itemSellInvoice.length ? formatter.format(price) : ""}
            </p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Giảm giá</p>
            <p className={classes.p}></p>
          </div>
          <div className={classes.frame}>
            <p className={classes.total}>Thanh toán</p>
            <p className={classes.total}>
              {itemSellInvoice.length ? formatter.format(price) : ""}
            </p>
          </div>
          <button className={classes.createInvoice} onClick={handleClick}>
            THANH TOÁN
          </button>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderDetail;

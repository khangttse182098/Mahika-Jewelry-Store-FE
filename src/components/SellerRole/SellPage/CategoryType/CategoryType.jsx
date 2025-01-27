/* eslint-disable no-unused-vars */
import classes from "./CategoryType.module.css";
import ButtonType from "../ButtonType/ButtonType";
import SearchProduct from "../SearchProduct/SearchProduct";
import DropDownCounter from "../DropDownCounter/DropDownCounter";
import InvoiceList from "../InvoiceList/InvoiceList";
import InformationBar from "../InformationBar/InformationBar";
import InvoiceSellPurchase from "../InvoiceSellPurchase/InvoiceSellPurchase";
import { useEffect, useState, useContext, useRef } from "react";
import { ProductSelectionContext } from "../../../../context/ProductSelectionContext";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import { ProductPurchaseListContext } from "../../../../context/ProductPurchaseListContext";

const CategoryType = () => {
  const controllerRef = useRef();
  //select category type
  const [activeOption, setActiveOption] = useState("");

  // -----------------------Search-------------------------
  //for search
  const [searchField, setSearchField] = useState("");

  //display initial -> Display all products when not selected counter or type
  const [products, setProducts] = useState([]);

  //----------------------------------------------------------
  const { setProductList, productList } = useContext(
    ProductPurchaseListContext
  );
  //--------------------------------------------------------
  const {
    counter: { selectedCounter, setSelectedCounter },
    categoryName: { selectedCategoryName, setSelectedCategoryName },
  } = useContext(ProductSelectionContext);

  const { itemPurchase } = useContext(ProductPurchaseContext);

  useEffect(() => {
    const counterID = selectedCounter === "Chọn quầy" ? "" : selectedCounter;
    fetch(
      `http://mahika.foundation:8080/swp/api/product?is_available=true&counter_id=${counterID}&category_name=${selectedCategoryName}`
    )
      .then((res) => res.json())
      .then((dataProduct) => {
        const realProductList = dataProduct.filter(
          (searchedProduct) =>
            !itemPurchase.find((item) => item.id === searchedProduct.id)
        );
        setProducts(realProductList);
      });
  }, [selectedCounter, selectedCategoryName]);

  //for filter through all products if the productname match in the searchField the setFilterProduct to newFilterProduct
  //whenever products and searchField change
  useEffect(() => {
    console.log(searchField);
    const newFilterProduct = products.filter((product) => {
      return (
        product.productName?.toLowerCase().includes(searchField) ||
        product.productCode?.toLowerCase().includes(searchField) ||
        product.materialName?.toLowerCase().includes(searchField) ||
        product.categoryName?.toLowerCase().includes(searchField)
      );
    });
    setProductList(newFilterProduct);
  }, [products, searchField]);

  //knowing when user type in and set search field to what user type
  const onSearchChange = (event) => {
    console.log("It's changing!");
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  // ----------------------------------------------------------

  //------------------------Get List Counter----------------------------
  const [listCounter, setListCounter] = useState([]);

  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleCounter = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/counter",
          {
            signal,
          }
        );
        const counterData = await response.json();
        setListCounter(counterData);
      } catch (error) {}
    };

    handleCounter();
  }, []);
  //-------------------------------------------------------------------

  return (
    <div className={classes.container}>
      <div className={classes["container-left"]}>
        <div className={classes.search}>
          <SearchProduct
            onChangeHandler={onSearchChange}
            placeholder="Nhập trang sức cần tìm kiếm..."
          />
        </div>

        <div className={classes.selection}>
          <DropDownCounter listCounter={listCounter} />
          <ButtonType
            option="Trang sức"
            activeOption={activeOption}
            onClick={setActiveOption}
          >
            Trang sức
          </ButtonType>
          <ButtonType
            option="Kim cương"
            activeOption={activeOption}
            onClick={setActiveOption}
          >
            Kim cương
          </ButtonType>
          <ButtonType
            option="Vàng, bạc"
            activeOption={activeOption}
            onClick={setActiveOption}
          >
            Vàng, bạc
          </ButtonType>
        </div>
        <div className={classes["content-left"]}>
          <InvoiceList listProducts={productList} />
        </div>
      </div>
      <div className={classes["container-right"]}>
        <p className={classes.tittle}>Thông tin đơn hàng</p>
        <div className={classes["content-right"]}>
          {itemPurchase.map((product, index) => (
            <InvoiceSellPurchase key={index} itemToPurchase={product} />
          ))}
        </div>
        <div className={classes.inforBar}>
          <InformationBar />
        </div>
      </div>
    </div>
  );
};

export default CategoryType;

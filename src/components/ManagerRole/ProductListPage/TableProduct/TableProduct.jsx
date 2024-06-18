import { useEffect, useRef, useState } from "react";
import classes from "./TableProduct.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import { Link, useNavigate } from "react-router-dom";

const TableProduct = () => {
  const controllerRef = useRef();
  const [productList, setProductList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterProduct, setFilterProduct] = useState([...productList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();
  const TabelProductRef = useRef();

  //------------------------Get list products--------------------
  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleProduct = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/product",
          { signal }
        );
        const data = await response.json();
        setProductList(data);
      } catch (err) {}
    };
    handleProduct();
  }, []);

  //-----------------------------HandleNavigate---------------------
  function handleNavigate(list) {
    navigate("/managerproductdetail", { state: { list } });
  }

  function handleAdd() {
    navigate("/manageraddproduct");
  }

  //----------------------------HandleModalRef----------------------
  const handleClick = () => {
    TabelProductRef.current.showModal();
  };

  const handleHide = () => {
    TabelProductRef.current.close();
  };

  //----------------------------Pagination---------------------------
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = filterProduct.slice(
    firstProductIndex,
    lastProductIndex
  );

  //----------------------------Search-------------------------------
  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    const newFilterProduct = productList.filter((product) => {
      return (
        product.productCode.toLowerCase().includes(searchField) ||
        product.productName.toLowerCase().includes(searchField) ||
        product.categoryName.toLowerCase().includes(searchField)
      );
    });
    setFilterProduct(newFilterProduct);
  }, [searchField, productList]);

  //------------------------Check box----------------------------
  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      setSelect(checked);
      const tempProduct = productList.map((product) => {
        return { ...product, isChecked: checked };
      });
      setProductList(tempProduct);
    } else {
      const tempProduct = productList.map((product) => {
        return product.productCode === name
          ? { ...product, isChecked: checked }
          : product;
      });
      setProductList(tempProduct);
    }
  };

  return (
    <div className="w-10/12 h-5/6 ">
      <DeleteProduct ref={TabelProductRef} handleHide={handleHide} />
      <div className="text-3xl font-medium py-9">
        <p>Danh sách sản phẩm</p>
      </div>
      <div className="bg-white border-2 rounded-xl">
        <div>
          <button
            onChange={handleAdd}
            className="h-[50px] w-[200px] border-b-4 border-[#0088FF] text-center text-[#0088FF] font-montserrat text-[15px] cursor-pointer"
          >
            Tất cả
          </button>
        </div>
        <hr />
        <div className="mt-3 mb-3">
          <input
            className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            onChange={handleSearch}
          />
          <Link to="/manageraddproduct">
            <button className="w-32 h-9 rounded-md bg-[#0088FF] text-white">
              + Thêm mới
            </button>
          </Link>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className={classes.tr} onChange={handleCheckbox}>
              <th className={`${classes["table-header"]} ${classes.th}`}>
                <input
                  type="checkbox"
                  name="allSelect"
                  onChange={handleCheckbox}
                  checked={select}
                />
              </th>
              {select && (
                <>
                  <th colspan="5" className={classes.th}>
                    <div className="flex">
                      <p className="font-normal pr-2">
                        Đã chọn <b>tất cả</b> sản phẩm trên trang này
                      </p>
                      <select
                        onChange={handleClick}
                        className="border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none"
                      >
                        <option>Chọn thao tác</option>
                        <option>Xóa sản phẩm</option>
                      </select>
                    </div>
                  </th>
                </>
              )}
              {!select && (
                <>
                  <th className={classes.th}>Hình ảnh</th>
                  <th className={classes.th}>Mã sản phẩm</th>
                  <th className={classes.th}>Tên sản phẩm</th>
                  <th className={classes.th}>Loại sản phẩm</th>
                  <th className={classes.th}>Quầy</th>
                  <th className={classes.th}>Ngày khởi tạo</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentProduct.map((product) => {
              return (
                <tr
                  className={`${classes.tr} ${
                    product?.isChecked ? classes.select : ""
                  }`}
                  key={product.productCode}
                  onClick={() => handleNavigate(product)}
                >
                  <td className={classes.td}>
                    <input
                      type="checkbox"
                      name={product.productCode}
                      onChange={handleCheckbox}
                      checked={product?.isChecked || false}
                    />
                  </td>
                  <img
                    src={product.productImage}
                    className="w-28 h-20"
                    alt="Jewelry"
                  />
                  <td className={classes.td}>{product.productCode}</td>
                  <td className={classes.td}>{product.productName}</td>
                  <td className={classes.td}>{product.categoryName}</td>
                  <td className={classes.td}>{product.counterNo}</td>
                  <td className={classes.td}>{product.createdDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalInvoice={productList.length}
          invoicePerPage={productPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TableProduct;

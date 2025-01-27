import { forwardRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import ErrorModal from "../../../UtilComponent/ErrorModal/ErrorModal";

const DeleteProduct = forwardRef(function DeleteProduct(
  { handleHide, deleteCode },
  ref
) {
  const errorModalRef = useRef();
  const doneModalRef = useRef();
  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
    navigate(-1);
  }
  function handleOpenErrorModal() {
    errorModalRef.current.showModal();
  }
  function handleCLoseErrorModal() {
    errorModalRef.current.close();
  }

  const navigate = useNavigate();
  //-------------------------deleteCode---------------------
  const handleDelete = async () => {
    try {
      const res = await fetch("http://mahika.foundation:8080/swp/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteCode),
      });
      const obj = await res.json();
      if (obj.message === "Delete product successfully") {
        handleOpenDoneModal();
      } else {
        handleOpenErrorModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog
      ref={ref}
      className="w-1/3 h-80 translate-x-full translate-y-1/2 bg-white"
    >
      <DoneModal ref={doneModalRef} handleClose={handleCloseDoneModal} />
      <ErrorModal
        ref={errorModalRef}
        handleClose={handleCLoseErrorModal}
        msg={"Không thể xóa sản phẩm trong hóa đơn"}
      />
      <div className="flex justify-center font-medium text-2xl">
        <p className="pl-4 py-3">Thông báo</p>
      </div>
      <hr className="w-full" />
      <div>
        <p className="text-2xl flex justify-center mt-24 ">
          Bạn có chắc muốn xóa sản phẩm này?
        </p>
      </div>
      <div className="mt-20 flex justify-end">
        <button
          onClick={handleHide}
          className="w-24 h-9 bg-[#D9D9D9] border border-1 font-medium rounded mr-4"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="w-24 h-9 border bg-[#0088FF] text-white font-medium rounded mr-4"
        >
          Xác nhận
        </button>
      </div>
    </dialog>
  );
});

export default DeleteProduct;

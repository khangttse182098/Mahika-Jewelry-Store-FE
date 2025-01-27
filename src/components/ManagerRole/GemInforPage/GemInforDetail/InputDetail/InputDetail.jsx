import { useNavigate } from "react-router-dom";

const InputDetail = ({ gem }) => {
  const navigate = useNavigate();
  return (
    <div className="grid w-full p-20">
      <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
        <h2 className="font-semibold text-2xl">Chi tiết kim cương</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Tên kim cương</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.gemName}
              readOnly
            />
          </div>
          <div>
            <label>Nguồn gốc</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.origin}
              readOnly
            />
          </div>
          <div>
            <label>Màu sắc</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.color}
              readOnly
            />
          </div>
          <div>
            <label>Độ tinh khiết</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.clarity}
              readOnly
            />
          </div>
          <div>
            <label>Trọng lượng (g)</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.caratWeight}
              readOnly
            />
          </div>
          <div>
            <label>Giác cắt</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.cut}
              readOnly
            />
          </div>
          <div>
            <label>Phần trăm cắt</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.proportions}
              readOnly
            />
          </div>
          <div>
            <label>Độ nhẵn</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.polish}
              readOnly
            />
          </div>
          <div>
            <label>Độ cân đối</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.symmetry}
              readOnly
            />
          </div>
          <div>
            <label>Độ sáng</label>
            <input
              className="bg-slate-200 w-full border rounded p-2"
              value={gem.fluorescence}
              readOnly
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/manager/gem/infor/list")}
            className="w-64 h-14 border rounded-md bg-[#0088FF] text-white font-semibold text-lg mt-5"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputDetail;

import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SellerPage from "./page/SellerPage";
import CashierPage from "./page/CashierPage";
import PurchasePage from "./page/PurchasePage/PurchasePage";
import CustomerListPage from "./page/CustomerListPage";
import StatusSellerPage from "./page/StatusSellerPage";
import "./util/reset.css";
import CashierInvoiceDetailPage from "./page/CashierInvoiceDetailPage";
import RepurchasePage from "./page/RepurchasePage";
import ManagerProductPage from "./page/ManagerProductPage";
import ManagerProductDetailPage from "./page/ManagerProductDetailPage";
import ManagerAddProductPage from "./page/ManageAddProductPage";
import { SkeletonTheme } from "react-loading-skeleton";
import ManagerDiscountPage from "./page/ManagerDiscountPage";
import ManagerStaffPage from "./page/ManagerStaffPage";
import ManagerDiscountDetailPage from "./page/ManagerDiscountDetailPage";
import ManagerStaffDetailPage from "./page/ManagerStaffDetailPage";
import ManagerMaterialPage from "./page/ManagerMaterialPage";
import ManagerMaterialDetailPage from "./page/ManagerMaterialDetailPage";
import ManagerMaterialHistoryPage from "./page/ManagerMaterialHistoryPage";
import TestChart from "./components/ManagerRole/Dashboard/DashboardChart";
import DashBoardPage from "./page/DashBoardPage";
import ManagerInvoicePage from "./page/ManagerInvoicePage";
import ManagerInvoiceDetailPage from "./page/ManagerInvoiceDetailPage";

function App() {
  return (
    <SkeletonTheme baseColor="#DFD8D8" highlightColor="#FFFFFF">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sellpage" element={<SellerPage />} />
        <Route path="/invoicelist" element={<CashierPage />} />
        <Route path="/purchasepage" element={<PurchasePage />} />
        <Route path="/customerlist" element={<CustomerListPage />} />
        <Route path="/statuslist" element={<StatusSellerPage />} />
        <Route path="/invoicedetail" element={<CashierInvoiceDetailPage />} />
        <Route path="/repurchasepage" element={<RepurchasePage />} />
        <Route path="/managerproductlist" element={<ManagerProductPage />} />
        <Route
          path="/managerproductdetail"
          element={<ManagerProductDetailPage />}
        />
        <Route path="/manageraddproduct" element={<ManagerAddProductPage />} />
        <Route path="/managerdiscountlist" element={<ManagerDiscountPage />} />
        <Route path="/managerstafflist" element={<ManagerStaffPage />} />
        <Route
          path="/managerproductdetail"
          element={<ManagerProductDetailPage />}
        />
        <Route path="/manageraddproduct" element={<ManagerAddProductPage />} />
        <Route
          path="/managerdiscountdetail"
          element={<ManagerDiscountDetailPage />}
        />
        <Route
          path="/managerstaffdetail"
          element={<ManagerStaffDetailPage />}
        />
        <Route path="/managermateriallist" element={<ManagerMaterialPage />} />
        <Route
          path="/managermaterialdetail"
          element={<ManagerMaterialDetailPage />}
        />
        <Route
          path="/managermaterialhistory"
          element={<ManagerMaterialHistoryPage />}
        />
        <Route path="/manager/dashboard" element={<DashBoardPage />} />
        <Route path="/manager/chart" element={<DashBoardPage />} />
        <Route path="/managerinvoicelist" element={<ManagerInvoicePage />} />
        <Route
          path="/managerinvoicedetail"
          element={<ManagerInvoiceDetailPage />}
        />
      </Routes>
    </SkeletonTheme>
  );
}

export default App;

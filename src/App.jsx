import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Public from "./common/Public";
import Auth from "./component/auth/Auth";
import Protected from "./common/Protected";
import Home from "./component/home/Home";
import PageNotFound from "./common/PageNotFound";
import ExpenseList from "./component/expense/ExpenseList";
import CategoryList from "./component/incomeCategory/CategoryList";
import AddCategory from "./component/incomeCategory/AddCategory";
import CategoryIncome from "./component/incomeCategory/CategoryIncome";
import EditCategory from "./component/incomeCategory/EditCategory";

function App() {
  const profile = "null";
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="auth" element={<Public profile={profile} />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Auth />} />
        </Route>

        <Route path="" element={<Protected profile={profile} />}>
          <Route index element={<Home />} />

          <Route path="income-category">
            <Route index element={<CategoryList />} />
            <Route path="view/:id" element={<CategoryIncome />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>

          <Route path="income">
            <Route index element={<Home />} />
            <Route path="view/:id" element={<Home />} />
            <Route path="add" element={<Home />} />
            <Route path="edit/:id" element={<Home />} />
          </Route>

          <Route path="expense-category">
            <Route index element={<Home />} />
            <Route path="view/:id" element={<Home />} />
            <Route path="add" element={<Home />} />
            <Route path="edit/:id" element={<Home />} />
          </Route>

          <Route path="expense">
            <Route index element={<ExpenseList />} />
            <Route path="view/:id" element={<Home />} />
            <Route path="add" element={<Home />} />
            <Route path="edit/:id" element={<Home />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

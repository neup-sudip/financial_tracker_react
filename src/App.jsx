import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./component/auth/Auth";
import Home from "./component/home/Home";
import PageNotFound from "./common/PageNotFound";
import Public from "./common/Public";
import Protected from "./common/Protected";
import InCategoryList from "./component/incomeCategory/InCategoryList";
import AddInCategory from "./component/incomeCategory/AddInCategory";
import CategoryIncome from "./component/incomeCategory/CategoryIncome";
import EditInCategory from "./component/incomeCategory/EditInCategory";
import IncomeList from "./component/income/IncomeList";
import AddIncome from "./component/income/AddIncome";
import EditIncome from "./component/income/EditIncome";
import ExCategoryList from "./component/expenseCategory/ExCategoryList";
import CategoryExpense from "./component/expenseCategory/CategoryExpense";
import AddExCategory from "./component/expenseCategory/AddExCategory";
import EditExCategory from "./component/expenseCategory/EditExCategory";
import ExpenseList from "./component/expense/ExpenseList";
import AddExpense from "./component/expense/AddExpense";
import EditExpense from "./component/expense/EditExpense";
import ViewExCategory from "./component/expenseCategory/ViewExCategory";
import AppLayout from "./component/layouts/AppLayout";

function App() {
  const { profile } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<AppLayout profile={profile} />}>
        <Route path="auth" element={<Public profile={profile} />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Auth />} />
        </Route>

        <Route path="" element={<Protected profile={profile} />}>
          <Route index element={<Home />} />

          <Route path="income-category">
            <Route index element={<InCategoryList />} />
            <Route path="income/:id" element={<CategoryIncome />} />
            <Route path="add" element={<AddInCategory />} />
            <Route path="edit/:id" element={<EditInCategory />} />
          </Route>

          <Route path="income">
            <Route index element={<IncomeList />} />
            <Route path="add" element={<AddIncome />} />
            <Route path="edit/:id" element={<EditIncome />} />
          </Route>

          <Route path="expense-category">
            <Route index element={<ExCategoryList />} />
            <Route path="add" element={<AddExCategory />} />
            <Route path="edit/:id" element={<EditExCategory />} />
            <Route path="expense/:id" element={<CategoryExpense />} />
            <Route path="view/:id" element={<ViewExCategory />} />
          </Route>

          <Route path="expense">
            <Route index element={<ExpenseList />} />
            <Route path="add" element={<AddExpense />} />
            <Route path="edit/:id" element={<EditExpense />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

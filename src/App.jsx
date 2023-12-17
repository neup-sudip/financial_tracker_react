import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Public from "./common/Public";
import Auth from "./component/auth/Auth";
import Protected from "./common/Protected";
import Home from "./component/home/Home";
import PageNotFound from "./common/PageNotFound";

function App() {
  const profile = null;
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
            <Route index element={<Home />} />
            <Route path="view/:id" element={<Home />} />
            <Route path="add" element={<Home />} />
            <Route path="edit/:id" element={<Home />} />
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
            <Route index element={<Home />} />
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

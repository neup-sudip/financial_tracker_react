import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import Table from "../../common/Table";
import Error from "../../common/Error";
import { deleteExpense, getExpenses } from "../../helpers/api/expenseApi";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import { excelGenerator } from "../../helpers/others/excelGenerater";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "id",
    "categoryTitle",
    "expenseTitle",
    "description",
    "amount",
    "createdOn",
    "action",
  ];

  const getData = async () => {
    const { data, success } = await getExpenses();
    if (success) {
      setDataList(data);
    } else {
      setError(true);
    }
    setIsPending(false);
  };

  const handleEdit = (id) => {
    navigate(`/expense/edit/${id}`);
  };

  const handleRemove = async (id) => {
    const { success, message } = await deleteExpense(id);
    if (success) {
      const expnses = dataList?.filter((item) => item?.id !== id);
      setDataList(expnses);
      emitSuccessToast(message);
    } else {
      emitErrorToast(message);
    }
  };

  const handleExport = () => {
    const columns = [
      "categoryTitle",
      "expenseTitle",
      "description",
      "amount",
      "createdOn",
    ];
    excelGenerator("Expenses", "expenses", columns, dataList);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (dataList) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center  my-2">
          <h5>List of Expenses</h5>

          <button className="btn btn-info" onClick={handleExport}>
            <span className="pe-1">Export</span>
            <i className="fa-solid fa-download"></i>
          </button>

          <Link to="/expense/add" className="btn btn-primary btn-md">
            Add New
          </Link>
        </div>

        <Table
          heading={headings}
          data={dataList}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      </div>
    );
  }
};

export default ExpenseList;

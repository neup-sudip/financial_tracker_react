import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Table from "../../common/Table";
import Error from "../../common/Error";
import {
  deleteExpense,
  downloadExpense,
  getExpenses,
} from "../../helpers/api/expenseApi";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import { excelGenerator } from "../../helpers/others/excelGenerater";
import Pagination from "../../common/Pagination";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const getData = async (currentPage) => {
    const { data, success } = await getExpenses(currentPage);
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

  const handleExport = async () => {
    const { data, success, message } = await downloadExpense();
    if (success) {
      const columns = [
        "categoryTitle",
        "expenseTitle",
        "description",
        "amount",
        "createdOn",
      ];
      excelGenerator("Expenses", "expenses", columns, data);
    } else {
      emitErrorToast(message);
    }
  };

  const handlePageChange = (change) => {
    const page = parseInt(searchParams.get("page")) || 1;
    setSearchParams({ page: page + change });
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setSearchParams({ page });
    getData(page);
    //eslint-disable-next-line
  }, [searchParams]);

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

          {dataList?.length > 0 && (
            <button className="btn btn-info" onClick={handleExport}>
              <span className="pe-1">Export</span>
              <i className="fa-solid fa-download"></i>
            </button>
          )}

          <Link to="/expense/add" className="btn btn-primary btn-md">
            Add New
          </Link>
        </div>

        {dataList?.length > 0 ? (
          <>
            <Table
              heading={headings}
              data={dataList}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />

            <Pagination
              searchParams={searchParams}
              handlePageChange={handlePageChange}
              dataLength={dataList?.length}
              nextLimit={10}
            />
          </>
        ) : (
          <h6 className="text-center py-5">No Records Found</h6>
        )}
      </div>
    );
  }
};

export default ExpenseList;

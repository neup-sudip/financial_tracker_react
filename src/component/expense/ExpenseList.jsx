import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import Table from "../../common/Table";
import Error from "../../common/Error";
import { getExpenses } from "../../api/helpers/expenseApi";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "expenseId",
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

          <Link to="/expense/add" className="btn btn-primary btn-md">
            Add New
          </Link>
        </div>
        <Table heading={headings} data={dataList} handleEdit={handleEdit} />
      </div>
    );
  }
};

export default ExpenseList;

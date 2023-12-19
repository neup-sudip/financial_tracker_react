import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import Table from "../../common/Table";
import { getExpensesByCategory } from "../../api/helpers/expenseApi";

const CategoryExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "expenseId",
    "expenseTitle",
    "description",
    "amount",
    "createdOn",
    "action",
  ];

  const getData = async () => {
    const { data, success } = await getExpensesByCategory(id);
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
    if (id) getData();
  }, [id]);

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
          <h5>List of incomes</h5>

          <Link to="/income/add" className="btn btn-primary btn-md">
            Add New
          </Link>
        </div>
        <Table heading={headings} data={dataList} handleEdit={handleEdit} />
      </div>
    );
  }
};

export default CategoryExpense;

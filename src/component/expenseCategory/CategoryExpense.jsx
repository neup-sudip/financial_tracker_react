import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import Table from "../../common/Table";
import { getExpensesByCategory } from "../../helpers/api/expenseApi";

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

  const getData = useCallback(async () => {
    const { data, success } = await getExpensesByCategory(id);
    if (success) {
      setDataList(data);
    } else {
      setError(true);
    }
    setIsPending(false);
  }, [id]);

  const handleEdit = (id) => {
    navigate(`/expense/edit/${id}`);
  };

  useEffect(() => {
    getData();
  }, [getData]);

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
        {dataList?.length > 0 ? (
          <Table heading={headings} data={dataList} handleEdit={handleEdit} />
        ) : (
          <h6 className="text-center py-5">No Records Found</h6>
        )}
      </div>
    );
  }
};

export default CategoryExpense;

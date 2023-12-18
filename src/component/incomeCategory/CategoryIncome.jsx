import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getIncomesByCategory } from "../../api/helpers/incomeApi";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import Table from "../../common/Table";

const CategoryIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "incomeId",
    "incomeTitle",
    "description",
    "amount",
    "createdOn",
    "action",
  ];

  const getData = async () => {
    const { data, success } = await getIncomesByCategory(id);
    if (success) {
      setDataList(data);
    } else {
      setError(true);
    }
    setIsPending(false);
  };

  const handleEdit = (id) => {
    navigate(`/income/edit/${id}`);
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

export default CategoryIncome;

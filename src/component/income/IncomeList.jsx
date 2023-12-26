import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import Table from "../../common/Table";
import Error from "../../common/Error";
import { deleteIncome, getIncomes } from "../../api/helpers/incomeApi";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";

const IncomeList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "id",
    "categoryTitle",
    "incomeTitle",
    "description",
    "amount",
    "createdOn",
    "action",
  ];

  const getData = async () => {
    const { data, success } = await getIncomes();
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

  const handleRemove = async (id) => {
    const { success, message } = await deleteIncome(id);
    if (success) {
      const incomes = dataList?.filter((item) => item?.id !== id);
      setDataList(incomes);
      emitSuccessToast(message);
    } else {
      emitErrorToast(message);
    }
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
          <h5>List of incomes</h5>

          <Link to="/income/add" className="btn btn-primary btn-md">
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

export default IncomeList;

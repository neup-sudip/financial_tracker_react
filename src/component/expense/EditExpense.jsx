import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import ExpenseForm from "./ExpenseForm";
import { getSingleExpense } from "../../helpers/api/expenseApi";

const EditExpense = () => {
  const [editData, setEditData] = useState("");
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const { id } = useParams();

  const getData = useCallback(async () => {
    const { data, success } = await getSingleExpense(id);
    if (success) {
      setEditData(data);
    } else {
      setError(true);
    }
    setIsPending(false);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (editData) {
    return <ExpenseForm editData={editData} />;
  }
};

export default EditExpense;

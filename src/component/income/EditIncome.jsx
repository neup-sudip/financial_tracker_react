import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import IncomeForm from "./IncomeForm";
import { getSingleIncome } from "../../helpers/api/incomeApi";

const EditIncome = () => {
  const [editData, setEditData] = useState("");
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const { id } = useParams();

  const getData = async () => {
    const { data, success } = await getSingleIncome(id);
    if (success) {
      setEditData(data);
    } else {
      setError(true);
    }
    setIsPending(false);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (editData) {
    return <IncomeForm editData={editData} />;
  }
};

export default EditIncome;

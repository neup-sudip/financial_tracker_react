import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import CategoryExForm from "./CategoryExForm";
import { getSingleExCategory } from "../../helpers/api/expenseCategoryApi";

const EditExCategory = () => {
  const [editData, setEditData] = useState("");
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const { id } = useParams();

  const getData = async () => {
    const { data, success } = await getSingleExCategory(id);
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
    return <CategoryExForm editData={editData} />;
  }
};

export default EditExCategory;

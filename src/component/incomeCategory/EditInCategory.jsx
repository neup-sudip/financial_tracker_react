import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleInCategory } from "../../helpers/api/incomeCategoryApis";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import CategoryInForm from "./CategoryInForm";

const EditInCategory = () => {
  const [editData, setEditData] = useState("");
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const { id } = useParams();

  const getData = async () => {
    const { data, success } = await getSingleInCategory(id);
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
    return <CategoryInForm editData={editData} />;
  }
};

export default EditInCategory;

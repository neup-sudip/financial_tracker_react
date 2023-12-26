import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import Table from "../../common/Table";
import Error from "../../common/Error";
import {
  getInCategories,
  statusInCategory,
} from "../../api/helpers/incomeCategoryApis";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";

const InCategoryList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "id",
    "title",
    "description",
    "createdOn",
    "status",
    "action",
  ];

  const getData = async () => {
    const { data, success } = await getInCategories();
    if (success) {
      setDataList(data);
    } else {
      setError(true);
    }
    setIsPending(false);
  };

  const handleEdit = (id) => {
    navigate(`/income-category/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/income-category/income/${id}`);
  };

  const handleStatus = async (catId, action) => {
    const { success, message } = await statusInCategory(catId, action);
    if (success) {
      const catList = [];
      dataList?.forEach((item) => {
        if (item?.id === catId) {
          catList.push({ ...item, status: action === "A" ? true : false });
        } else {
          catList.push(item);
        }
      });
      setDataList(catList);
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
          <h5>List of income categories</h5>

          <Link to="/income-category/add" className="btn btn-primary btn-md">
            Add New
          </Link>
        </div>
        <Table
          heading={headings}
          data={dataList}
          handleEdit={handleEdit}
          handleView={handleView}
          handleStatus={handleStatus}
        />
      </div>
    );
  }
};

export default InCategoryList;

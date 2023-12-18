import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import Table from "../../common/Table";
import Error from "../../common/Error";
import { getCategories } from "../../api/reactQuery/incomeCategoryApis";

const CategoryList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [dataList, setDataList] = useState("");

  const headings = [
    "categoryId",
    "title",
    "description",
    "createdOn",
    "status",
    "action",
  ];

  const getData = async () => {
    const { data, success } = await getCategories();
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
    navigate(`/income-category/view/${id}`);
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
        />
      </div>
    );
  }
};

export default CategoryList;

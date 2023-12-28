import { useEffect, useState } from "react";
import {
  getAllTransactions,
  getTransactions,
} from "../../helpers/api/transaction";
import { emitErrorToast } from "../../common/toast/EmitToast";
import { useSearchParams } from "react-router-dom";
import { excelGenerator } from "../../helpers/others/excelGenerater";
import Pagination from "../../common/Pagination";

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async (page, query) => {
    const { data, success, message } = await getTransactions(page, query);
    if (success) {
      setTransactions(data);
    } else {
      emitErrorToast(message);
    }
  };

  const handleSearch = async () => {
    setSearchParams({ query: search, page: 1 });
  };

  const handlePageChange = (change) => {
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    setSearchParams({ query, page: page + change });
  };

  const handleExport = async () => {
    const { data, success } = await getAllTransactions();

    if (success) {
      const columns = [
        "title",
        "description",
        "amount",
        "createdOn",
        "recordType",
        "categoryTitle",
      ];
      excelGenerator("Transactions", "transactions", columns, data);
    } else {
      emitErrorToast("Error downloading transactions !");
    }
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    setSearchParams({ query, page });
    getData(page, query);
  }, [searchParams, setSearchParams]);

  return (
    <>
      <div className="d-flex align-items-center shadow">
        <button
          className="btn btn-info me-2"
          onClick={handleExport}
          style={{ width: "130px" }}
        >
          <span className="pe-1">Export</span>
          <i className="fa-solid fa-download"></i>
        </button>

        <input
          className="form-control my-2 my-sm-0 me-lg-2"
          type="search"
          placeholder="Search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn btn-secondary my-2 my-sm-0"
          type="button"
        >
          Search
        </button>
      </div>

      <div className="row px-3">
        {transactions?.map((item, idx) => (
          <div key={idx} className="col-md-6 col-lg-4 px-1">
            <div
              className={`card shadow my-2 px-1 bg-body rounded ${
                item?.recordType === "expense"
                  ? "text-danger "
                  : "text-success "
              }`}
            >
              <div className="card-body py-1 px-0 d-flex justify-content-between">
                <h6 className="card-title">{item?.title || "--"}</h6>

                <span className="label success">
                  {new Date(item?.createdOn)?.toDateString() || "--"}
                </span>
              </div>
              <div className="card-body py-1 px-0 d-flex justify-content-between">
                <p className="card-text text-truncate ">
                  {item?.description || "--"}
                </p>
                <h6 className="card-title">Rs. {item?.amount || "--"}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        searchParams={searchParams}
        handlePageChange={handlePageChange}
        dataLength={transactions?.length}
        nextLimit={12}
      />
    </>
  );
};

export default Transactions;

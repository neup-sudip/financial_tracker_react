import { useEffect, useState } from "react";
import { getPerMonthCatExpense } from "../../api/helpers/report";
import { useParams } from "react-router-dom";
import { MONTH_ARRAY } from "../../constants/constants";

const ViewExCategory = () => {
  const { id } = useParams();
  const [perMonth, setPerMonth] = useState("");
  const [category, setCategory] = useState("");

  const getData = async () => {
    const { category: data, perYear, years } = await getPerMonthCatExpense(id);

    setCategory(data);

    const currentYear = new Date().getFullYear();

    if (perYear[currentYear]) {
      setPerMonth(perYear[currentYear]);
    } else {
      const firstYear = years[0];
      setPerMonth(perYear[firstYear]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-3 bg-dark-subtle rounded-1">
      <h1>{category?.title}</h1>

      <div className="row gy-2">
        {MONTH_ARRAY.map((month, idx) => (
          <div key={idx} className="col-md-6 col-lg-3 d-flex">
            <div className="p-2 w-100 bg-light shadow rounded-1 ">
              <div className="d-flex align-items-center justify-content-between ">
                <p>
                  {month}
                  <span className="mx-1 text-info">
                    {((perMonth[month]?.global || 0) / category?.amountLimit) *
                      100}
                    %
                  </span>
                </p>
                <p>
                  {perMonth[month]?.count || "0"}
                  <span className="text-info mx-1 ">
                    {perMonth[month]?.globalCount || "0"}
                  </span>
                  /{category?.itemLimit}
                </p>
              </div>
              <span>
                {perMonth[month]?.total || "0.0"}
                <span className="text-info mx-1 ">
                  {perMonth[month]?.global || "0.0"}
                </span>
                /{category?.amountLimit}
              </span>
            </div>
            <div className="w-100 bg-danger" style={{ maxWidth: "10px" }}>
              <div
                className="w-100 bg-success"
                style={{
                  height: `${
                    100 -
                    ((perMonth[month]?.global || 0) / category?.amountLimit) *
                      100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewExCategory;

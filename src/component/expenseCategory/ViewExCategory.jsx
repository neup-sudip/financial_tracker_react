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

  console.log(perMonth, category);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-3">
      <h1>{category?.title}</h1>

      <div className="row gy-2">
        {MONTH_ARRAY.map((month, idx) => (
          <div key={idx} className="col-md-6 col-lg-3 d-flex">
            <div className="p-2 w-100 bg-primary-subtle shadow rounded-1 ">
              <p>
                {month}
                <span className="mx-1 text-info">
                  {(perMonth[month] || 0) / category?.amountLimit}%
                </span>
              </p>
              <span>NRP {perMonth[month] || "0.0"}</span>
            </div>
            <div className="w-100 bg-danger" style={{ maxWidth: "10px" }}>
              <div
                className="w-100 bg-success"
                style={{
                  height: `${
                    100 - (perMonth[month] || 0) / category?.amountLimit
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

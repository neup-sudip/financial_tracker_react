import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseYear from "./ExpenseYear";
import { getPerMonthCatExpense } from "../../helpers/others/report";
import { MONTH_ARRAY } from "../../helpers/constants/report";

const ViewExCategory = () => {
  const { id } = useParams();
  const [perMonth, setPerMonth] = useState("");
  const [report, setReport] = useState("");
  const [yearsOpt, setYearsOpt] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const [category, setCategory] = useState("");

  const getData = useCallback(async () => {
    const { category: data, perYear, years } = await getPerMonthCatExpense(id);

    setCategory(data);
    setReport(perYear);
    setYearsOpt(years);

    const currentYear = new Date().getFullYear();

    if (perYear[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = years[0];
      setActiveYear(firstYear);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (activeYear) {
      setPerMonth(report[activeYear]);
    }
  }, [activeYear, report]);

  const percentCalc = (month) => {
    return (
      (perMonth[month]?.gross / category[activeYear]?.amountLimit) * 100 || 0
    );
  };

  return (
    <div className="p-3 rounded-1">
      <select
        className="form-control"
        onChange={(e) => setActiveYear(e.target.value)}
      >
        {yearsOpt?.map((year, idx) => (
          <option key={idx} value={year}>
            {`${category?.title} expense on ${year}`}
          </option>
        ))}
      </select>

      <ExpenseYear
        yearData={category[activeYear]}
        setCategory={setCategory}
        activeYear={activeYear}
        categoryId={id}
      />

      <div className="row gy-2 mt-2 ">
        {MONTH_ARRAY.map((month, idx) => (
          <div key={idx} className="col-md-6 col-lg-3 d-flex">
            <div className="p-2 w-100 shadow bg-light-subtle  rounded-1">
              <div className="d-flex align-items-center justify-content-between ">
                <p>
                  {month}
                  <span className="mx-1 text-info">
                    {percentCalc(month).toFixed(2)}%
                  </span>
                </p>
                <p>
                  {perMonth[month]?.count || "0"}
                  <span className="text-info mx-1 ">
                    {perMonth[month]?.grossCount || "0"}
                  </span>
                </p>
              </div>
              <span className="d-flex justify-content-between ">
                Net {perMonth[month]?.total || "0.0"}
                <span className="text-info mx-1 ">
                  Gross {perMonth[month]?.gross || "0.0"}
                </span>
              </span>
            </div>
            <div
              className="w-100 bg-danger"
              style={{ maxWidth: "10px", height: "100%" }}
            >
              <div
                className="w-100 bg-success"
                style={{
                  height: `${
                    100 - (percentCalc(month) >= 100 ? 100 : percentCalc(month))
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

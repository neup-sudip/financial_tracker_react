import { useCallback, useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerMonthCatExpense = ({ perYearExpense, expenseYears }) => {
  const divId = "per-month-cat-expense";

  const [isPending, setIsPending] = useState(true);
  const [activeYear, setActiveYear] = useState("");

  const getData = useCallback(async () => {
    const currentYear = new Date().getFullYear();
    if (perYearExpense[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = expenseYears[0];
      setActiveYear(firstYear);
    }
    setIsPending(false);
  }, [expenseYears, perYearExpense]);

  const histogram = useCallback(() => {
    const data = window.google.visualization.arrayToDataTable(
      perYearExpense[activeYear]
    );

    var options = {
      title: "Expense per month per category",
      vAxis: {
        title: "Expense amount",
      },
      hAxis: {
        title: "Per month categories",
      },
    };

    const chart = new window.google.visualization.ColumnChart(
      document.getElementById(divId)
    );

    chart.draw(data, options);
  }, [activeYear, perYearExpense]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    window.google.charts.setOnLoadCallback(histogram);
  }, [histogram]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <select
        className="form-control bg-primary-subtle"
        onChange={(e) => setActiveYear(e.target.value)}
        value={activeYear}
      >
        {expenseYears?.map((year, idx) => (
          <option key={idx} value={year}>
            {`Year ${year}`}
          </option>
        ))}
      </select>
      <div id={divId} className="w-100"></div>
    </>
  );
};

export default PerMonthCatExpense;

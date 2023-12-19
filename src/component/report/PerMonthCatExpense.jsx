import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerMonthCatExpense = ({ perYearExpense, expenseYears }) => {
  const divId = "per-month-cat-expense";
  const [perYearData, setPerYearData] = useState("");
  const [isPending, setIsPending] = useState(true);

  const getData = async () => {
    const currentYear = new Date().getFullYear();

    if (perYearExpense[currentYear]) {
      setPerYearData(perYearExpense[currentYear]);
    } else {
      const firstYear = expenseYears[0];
      setPerYearData(perYearExpense[firstYear]);
    }
    setIsPending(false);
  };

  const histogram = () => {
    const data = window.google.visualization.arrayToDataTable(perYearData);

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
  };

  useEffect(() => {
    if (perYearExpense) getData();
  }, [perYearExpense]);

  useEffect(() => {
    if (perYearData) window.google.charts.setOnLoadCallback(histogram);
    // eslint-disable-next-line
  }, [perYearData]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div>
      <div id={divId} className="w-100"></div>
    </div>
  );
};

export default PerMonthCatExpense;

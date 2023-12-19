import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerMonthInVsEx = ({ perYearInEx, inExYears }) => {
  const divId = "per-month-in-vs-ex";
  const [perYearData, setPerYearData] = useState("");
  const [isPending, setIsPending] = useState(true);

  const getData = async () => {
    const currentYear = new Date().getFullYear();

    if (perYearInEx[currentYear]) {
      setPerYearData(perYearInEx[currentYear]);
    } else {
      const firstYear = inExYears[0];
      setPerYearData(perYearInEx[firstYear]);
    }
    setIsPending(false);
  };

  const histogram = () => {
    const data = window.google.visualization.arrayToDataTable(perYearData);

    var options = {
      title: "Income Vs Expense",
      vAxis: {
        title: "Amount",
      },
      hAxis: {
        title: "Per Month",
      },
    };

    const chart = new window.google.visualization.LineChart(
      document.getElementById(divId)
    );

    chart.draw(data, options);
  };

  useEffect(() => {
    if (perYearInEx) getData();
  }, [perYearInEx]);

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

export default PerMonthInVsEx;

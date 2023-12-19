import { useEffect, useState } from "react";
import PerMonthCatIncome from "../report/PerMonthCatIncome";
import PerMonthCatExpense from "../report/PerMonthCatExpense";
import PerMonthInVsEx from "../report/PerMonthInVsEx";
import { getPerYearMonthCatInEx } from "../../api/helpers/report";

const Home = () => {
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [report, setReport] = useState("");

  const getReport = async () => {
    const data = await getPerYearMonthCatInEx();
    setReport(data);
  };

  useEffect(() => {
    getReport();
    if (!window.google.visualization) {
      window.google.charts.load("current", { packages: ["corechart"] });
    }
    window.google.charts.setOnLoadCallback(() => {
      // Google Charts library is now loaded
      setChartsLoaded(true);
    });
  }, []);

  return (
    <div>
      {chartsLoaded && (
        <>
          <PerMonthInVsEx
            inExYears={report?.inExYears}
            perYearInEx={report?.perYearInEx}
          />
          <div className="py-1 bg-warning-subtle "></div>
          <PerMonthCatIncome
            incomeYears={report?.incomeYears}
            perYearIncome={report?.perYearIncome}
          />
          <div className="py-1 bg-warning-subtle "></div>
          <PerMonthCatExpense
            expenseYears={report?.expenseYears}
            perYearExpense={report?.perYearExpense}
          />
        </>
      )}
    </div>
  );
};

export default Home;

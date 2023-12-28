import { useEffect, useState } from "react";
import PerMonthCatIncome from "../report/PerMonthCatIncome";
import PerMonthCatExpense from "../report/PerMonthCatExpense";
import PerMonthInVsEx from "../report/PerMonthInVsEx";
import PerCatIncome from "../report/PerCatIncome";
import { getPerYearMonthCatInEx } from "../../helpers/others/report";

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
    <>
      {chartsLoaded && (
        <>
          <div className="row">
            <div className="col-6">
              {report?.inPieYears?.length > 0 ? (
                <PerCatIncome
                  id="1"
                  perYearPie={report?.perYearInPie}
                  years={report?.inPieYears}
                  title="Per category income"
                />
              ) : (
                <div className="w-100 p-2 text-info shadow">
                  PieChart: No data to dispaly per category income
                </div>
              )}
            </div>
            <div className="col-6">
              {report?.exPieYears?.length > 0 ? (
                <PerCatIncome
                  id="2"
                  perYearPie={report?.perYearExPie}
                  years={report?.exPieYears}
                  title="Per category expense"
                />
              ) : (
                <div className="w-100 p-2 text-info shadow">
                  PieChart: No data to dispaly per category expense
                </div>
              )}
            </div>
          </div>

          <div className="py-1 bg-warning-subtle "></div>
          {report?.inExYears?.length > 0 ? (
            <PerMonthInVsEx
              inExYears={report?.inExYears}
              perYearInEx={report?.perYearInEx}
            />
          ) : (
            <div className="w-100 p-2 py-5 text-info shadow">
              Line Graph: No data to dispaly income vs expense
            </div>
          )}
          <div className="py-1 bg-warning-subtle "></div>
          {report?.incomeYears?.length > 0 ? (
            <PerMonthCatIncome
              incomeYears={report?.incomeYears}
              perYearIncome={report?.perYearIncome}
            />
          ) : (
            <div className="w-100 p-2 py-5 text-info shadow">
              Column Chart: No data to dispaly per month category income
            </div>
          )}
          <div className="py-1 bg-warning-subtle "></div>
          {report?.expenseYears?.length > 0 ? (
            <PerMonthCatExpense
              expenseYears={report?.expenseYears}
              perYearExpense={report?.perYearExpense}
            />
          ) : (
            <div className="w-100 p-2 py-5 text-info shadow">
              Column Chart: No data to dispaly per month category expense
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;

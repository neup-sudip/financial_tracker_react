import { useEffect } from "react";
import { getIncomePerMonthPerCat } from "../../api/helpers/incomeApi";

const PerMonthCatIncome = () => {
  const getData = async () => {
    const { data } = await getIncomePerMonthPerCat();

    const perYear = {};

    const chart = [
      ["Month"],
      ["Jan"],
      ["Feb"],
      ["Mar"],
      ["Apr"],
      ["May"],
      ["Jun"],
      ["July"],
      ["Aug"],
      ["Sep"],
      ["Oct"],
      ["Nov"],
      ["Dec"],
    ];

    let asObj = {};
    data.forEach((item) => {
      const { year, month, categoryid, totalincome } = item;
      if (!asObj[year]) {
        asObj[year] = {};
      }
      if (!asObj[year][month]) {
        asObj[year][month] = {};
      }
      asObj[year][month][categoryid] = totalincome;
    });
    console.log(asObj);

    Object.keys(asObj).forEach((year) => {
      perYear[year] = chart;
      Object.keys(asObj[year]).forEach((month) => {
        Object.keys(asObj[year][month]).forEach((cat) => {
          perYear[year][0].push(cat);
          perYear[year][month].push(asObj[year][month][cat]);
        });
      });
    });

    console.log(perYear);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>PerMonthCatIncome</div>;
};

export default PerMonthCatIncome;

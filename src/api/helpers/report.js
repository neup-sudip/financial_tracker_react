import { ApiServices } from "../httpServices";
import { getExCategories } from "./expenseCategoryApi";
import { getInCategories } from "./incomeCategoryApis";

export const getPerYearMonthCatInEx = async () => {
  const perYearExpense = {};
  const expenseYears = [];
  const incomeYears = [];
  const perYearIncome = {};

  const perYearInEx = {};
  const inExYears = [];
  const { data: exCategories } = await getExCategories();
  const { data: inCategories } = await getInCategories();

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

  const inExChart = [
    ["Month", "Income", "Expense"],
    ["Jan", 0, 0],
    ["Feb", 0, 0],
    ["Mar", 0, 0],
    ["Apr", 0, 0],
    ["May", 0, 0],
    ["Jun", 0, 0],
    ["July", 0, 0],
    ["Aug", 0, 0],
    ["Sep", 0, 0],
    ["Oct", 0, 0],
    ["Nov", 0, 0],
    ["Dec", 0, 0],
  ];

  if (exCategories) {
    const exCatObj = {};
    exCategories.forEach((category) => {
      const { categoryId, title } = category;
      exCatObj[categoryId] = title;
    });

    const { data: expenseData } = await ApiServices.get(
      `/v1/report/expense/per-ymc`
    );

    const exHasCat = [];

    let asObj = {};
    expenseData.forEach((item) => {
      const { year, month, categoryId, totalIncome } = item;
      exHasCat.push(categoryId);
      if (!asObj[year]) {
        asObj[year] = {};
      }
      if (!asObj[year][month]) {
        asObj[year][month] = {};
      }
      asObj[year][month][categoryId] = totalIncome;
    });

    const exCatLen = [...new Set(exHasCat)].length;

    Object.keys(asObj).forEach((year) => {
      perYearExpense[year] = JSON.parse(JSON.stringify(chart));
      expenseYears.push(year);
      //fill zero in every rows
      perYearExpense[year].forEach((month, idx) => {
        if (idx > 0) {
          month.push(...Array(exCatLen - month.length + 1).fill(0));
        }
      });

      if (!perYearInEx[year]) {
        perYearInEx[year] = JSON.parse(JSON.stringify(inExChart));
      }
      inExYears.push(year);

      Object.keys(asObj[year]).forEach((month) => {
        Object.keys(asObj[year][month]).forEach((cat) => {
          perYearInEx[year][month][2] += asObj[year][month][cat];

          if (!perYearExpense[year][0].includes(exCatObj[cat])) {
            perYearExpense[year][0].push(exCatObj[cat]);
          }
          const index = perYearExpense[year][0].indexOf(exCatObj[cat]);
          perYearExpense[year][month][index] = asObj[year][month][cat];
        });
      });
    });
  }

  if (inCategories) {
    const catObj = {};
    inCategories.forEach((category) => {
      const { categoryId, title } = category;
      catObj[categoryId] = title;
    });

    const { data } = await ApiServices.get(`/v1/report/income/per-ymc`);

    const hasCat = [];

    let asObj = {};
    data.forEach((item) => {
      const { year, month, categoryId, totalIncome } = item;
      hasCat.push(categoryId);
      if (!asObj[year]) {
        asObj[year] = {};
      }
      if (!asObj[year][month]) {
        asObj[year][month] = {};
      }
      asObj[year][month][categoryId] = totalIncome;
    });

    const inCatLen = [...new Set(hasCat)].length;

    Object.keys(asObj).forEach((year) => {
      perYearIncome[year] = JSON.parse(JSON.stringify(chart));
      incomeYears.push(year);
      //fill zero in every rows
      perYearIncome[year].forEach((month, idx) => {
        if (idx > 0) {
          month.push(...Array(inCatLen - month.length + 1).fill(0));
        }
      });

      if (!perYearInEx[year]) {
        perYearInEx[year] = JSON.parse(JSON.stringify(inExChart));
      }
      inExYears.push(year);

      Object.keys(asObj[year]).forEach((month) => {
        Object.keys(asObj[year][month]).forEach((cat) => {
          perYearInEx[year][month][1] += asObj[year][month][cat];

          if (!perYearIncome[year][0].includes(catObj[cat])) {
            perYearIncome[year][0].push(catObj[cat]);
          }
          const index = perYearIncome[year][0].indexOf(catObj[cat]);
          perYearIncome[year][month][index] = asObj[year][month][cat];
        });
      });
    });
  }

  return {
    perYearExpense,
    expenseYears,
    perYearIncome,
    incomeYears,
    perYearInEx,
    inExYears: [...new Set([...inExYears])],
  };
};

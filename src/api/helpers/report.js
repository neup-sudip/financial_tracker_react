import { MONTH, chart, inExChart } from "../../constants/constants";
import { ApiServices } from "../httpServices";
import { getSingleExCategory } from "./expenseCategoryApi";

export const getPerYearMonthCatInEx = async () => {
  const perYearExpense = {};
  const expenseYears = [];
  const incomeYears = [];
  const perYearIncome = {};

  const perYearInEx = {};
  const inExYears = [];

  const { data: expenseData } = await ApiServices.get(
    `/v1/report/expense/per-ymc`
  );

  const exHasCat = [];

  let exAsObj = {};
  expenseData.forEach((item) => {
    const { year, month, category, total } = item;
    exHasCat.push(category);
    if (!exAsObj[year]) {
      exAsObj[year] = {};
    }
    if (!exAsObj[year][month]) {
      exAsObj[year][month] = {};
    }
    exAsObj[year][month][category] = total;
  });

  const exCatLen = [...new Set(exHasCat)].length;

  Object.keys(exAsObj).forEach((year) => {
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

    Object.keys(exAsObj[year]).forEach((month) => {
      Object.keys(exAsObj[year][month]).forEach((cat) => {
        perYearInEx[year][month][2] += exAsObj[year][month][cat];

        if (!perYearExpense[year][0].includes(cat)) {
          perYearExpense[year][0].push(cat);
        }
        const index = perYearExpense[year][0].indexOf(cat);
        perYearExpense[year][month][index] = exAsObj[year][month][cat];
      });
    });
  });

  const { data: incomeData } = await ApiServices.get(
    `/v1/report/income/per-ymc`
  );

  const inHasCat = [];

  let inAsObj = {};
  incomeData.forEach((item) => {
    const { year, month, category, total } = item;
    inHasCat.push(category);
    if (!inAsObj[year]) {
      inAsObj[year] = {};
    }
    if (!inAsObj[year][month]) {
      inAsObj[year][month] = {};
    }
    inAsObj[year][month][category] = total;
  });

  const inCatLen = [...new Set(inHasCat)].length;

  Object.keys(inAsObj).forEach((year) => {
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

    Object.keys(inAsObj[year]).forEach((month) => {
      Object.keys(inAsObj[year][month]).forEach((cat) => {
        perYearInEx[year][month][1] += inAsObj[year][month][cat];

        if (!perYearIncome[year][0].includes(cat)) {
          perYearIncome[year][0].push(cat);
        }
        const index = perYearIncome[year][0].indexOf(cat);
        perYearIncome[year][month][index] = inAsObj[year][month][cat];
      });
    });
  });

  return {
    perYearExpense,
    expenseYears,
    perYearIncome,
    incomeYears,
    perYearInEx,
    inExYears: [...new Set(inExYears)],
  };
};

export const getPerMonthCatExpense = async (categoryId) => {
  const { data: category } = await getSingleExCategory(categoryId);

  const { data: report } = await ApiServices.get(
    `/v1/report/expense/per-ymc/${categoryId}`
  );

  const perYear = {};
  const years = [];

  report?.forEach((item) => {
    const { year, month, total } = item;
    years.push(year);
    if (!perYear[year]) {
      perYear[year] = {};
    }
    perYear[year][MONTH[month]] = total;
  });

  return { category, perYear, years: [...new Set(years)] };
};

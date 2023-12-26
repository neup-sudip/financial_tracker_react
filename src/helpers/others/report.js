import {
  MONTH,
  chart,
  pieChart,
  inExChart,
  PER_MONTH_CAT,
} from "../constants/report";
import { ApiServices } from "../../http/httpServices";
import { getSingleExCategory } from "../api/expenseCategoryApi";

export const getPerYearMonthCatInEx = async () => {
  const perYearExpense = {};
  const expenseYears = [];
  const incomeYears = [];
  const perYearIncome = {};

  const perYearInEx = {};
  const inExYears = [];

  const perYearExPie = {};
  const exPieYears = [];
  const perYearInPie = {};
  const inPieYears = [];

  const { data: expenseData } = await ApiServices.get(
    `/v1/report/expense/per-ymc`
  );

  const exHasCat = {};

  let exAsObj = {};
  const exAsPie = {};
  expenseData.forEach((item) => {
    const { year, month, category, total } = item;
    if (!exHasCat[year]) {
      exHasCat[year] = [];
    }
    exHasCat[year].push(category);

    if (!exAsPie[year]) {
      exAsPie[year] = {};
    }
    if (!exAsPie[year][category]) {
      exAsPie[year][category] = 0;
    }
    exAsPie[year][category] += total;

    if (!exAsObj[year]) {
      exAsObj[year] = {};
    }
    if (!exAsObj[year][month]) {
      exAsObj[year][month] = {};
    }
    exAsObj[year][month][category] = total;
  });

  Object.keys(exAsPie).forEach((year) => {
    perYearExPie[year] = JSON.parse(JSON.stringify(pieChart));
    exPieYears.push(year);
    Object.keys(exAsPie[year]).forEach((cat) => {
      perYearExPie[year].push([cat, exAsPie[year][cat]]);
    });
  });

  Object.keys(exAsObj).forEach((year) => {
    if (!perYearExpense[year]) {
      perYearExpense[year] = JSON.parse(JSON.stringify(chart));
    }
    expenseYears.push(year);
    //fill zero in every rows
    perYearExpense[year].forEach((month, idx) => {
      if (idx > 0) {
        month.push(
          ...Array([...new Set(exHasCat[year])].length - month.length + 1).fill(
            0
          )
        );
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

  //income

  const { data: incomeData } = await ApiServices.get(
    `/v1/report/income/per-ymc`
  );

  const inHasCat = {};

  let inAsObj = {};
  let inAsPie = {};

  incomeData.forEach((item) => {
    const { year, month, category, total } = item;
    if (!inHasCat[year]) {
      inHasCat[year] = [];
    }
    inHasCat[year].push(category);

    if (!inAsPie[year]) {
      inAsPie[year] = {};
    }
    if (!inAsPie[year][category]) {
      inAsPie[year][category] = 0;
    }
    inAsPie[year][category] += total;

    if (!inAsObj[year]) {
      inAsObj[year] = {};
    }
    if (!inAsObj[year][month]) {
      inAsObj[year][month] = {};
    }
    inAsObj[year][month][category] = total;
  });

  Object.keys(inAsPie).forEach((year) => {
    perYearInPie[year] = JSON.parse(JSON.stringify(pieChart));
    inPieYears.push(year);
    Object.keys(inAsPie[year]).forEach((cat) => {
      perYearInPie[year].push([cat, inAsPie[year][cat]]);
    });
  });

  Object.keys(inAsObj).forEach((year) => {
    if (!perYearIncome[year]) {
      perYearIncome[year] = JSON.parse(JSON.stringify(chart));
    }
    incomeYears.push(year);
    //fill zero in every rows
    perYearIncome[year].forEach((month, idx) => {
      if (idx > 0) {
        month.push(
          ...Array([...new Set(inHasCat[year])].length - month.length + 1).fill(
            0
          )
        );
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
    perYearExPie,
    exPieYears: [...new Set(exPieYears)],
    perYearInPie,
    inPieYears: [...new Set(inPieYears)],
  };
};

export const getPerMonthCatExpense = async (categoryId) => {
  const { data: category } = await getSingleExCategory(categoryId);

  const categoryData = {
    ...category,
  };

  category?.years?.forEach((item) => {
    const { year, amountLimit, itemLimit, id } = item;
    categoryData[year] = {
      id,
      amountLimit,
      itemLimit,
    };
  });

  const { data: report } = await ApiServices.get(
    `/v1/report/expense/per-ymc/${categoryId}`
  );

  const perYear = {};
  const years = [];

  report?.forEach((item) => {
    const { year, month, total, count } = item;
    years.push(year);
    if (!perYear[year]) {
      perYear[year] = JSON.parse(JSON.stringify(PER_MONTH_CAT));
    }
    perYear[year][MONTH[month]] = {
      total,
      count,
      global: total,
      globalCount: count,
    };
  });

  Object.keys(perYear).forEach((year) => {
    for (let i = 2; i <= 12; i++) {
      if (perYear[year][MONTH[i]]) {
        perYear[year][MONTH[i]].global += perYear[year][MONTH[i - 1]]
          ? perYear[year][MONTH[i - 1]]?.global
          : 0;
        perYear[year][MONTH[i]].globalCount += perYear[year][MONTH[i - 1]]
          ? perYear[year][MONTH[i - 1]]?.globalCount
          : 0;
      }
    }
  });

  return { category: categoryData, perYear, years: [...new Set(years)] };
};

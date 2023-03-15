import moment from "moment";

export const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const [mFmt, dFmt, tFmt, dtFmt] = [
  "YYYY-MM",
  "YYYY-MM-DD",
  "HH:mm:00",
  "YYYY-MM-DD HH:mm:00",
];

export const getDates = () => {
  let mon = moment().format(mFmt);
  let dates = {};
  dates.start = moment(`${mon}-01 00:00:00`, dtFmt).format(dtFmt);
  dates.end = moment(`${mon}-01 00:00:00`, dtFmt).add(1, "month").format(dtFmt);
  return dates;
};

export const getPrevMonth = () => {
  let dates = {};
  dates.start = moment().subtract(19, "days").format(dFmt);
  dates.end = moment().add(1, "day").format(dFmt);
  console.log("mon dates ==>", dates);
  return dates;
};

export const dayObj = () => {
  console.log("day called -->");
  let obj = [];
  for (let i = 19; i >= 0; i--) {
    let dd = moment().subtract(i, "day").format(dFmt);
    obj.push({ id: i + 1, date: dd });
  }
  console.log("len", obj.length);
  return obj;
};

export const sample = [
  { id: 1, date: "Jan", sum: 3000 },
  { id: 2, date: "Feb", sum: 2000 },
  { id: 3, date: "Mar", sum: 8000 },
  { id: 4, date: "Apr", sum: 20800 },
  { id: 5, date: "May", sum: 30000 },
  { id: 6, date: "Jun", sum: 15000 },
  { id: 7, date: "Jul", sum: 28000 },
  { id: 8, date: "Aug", sum: 18000 },
  { id: 9, date: "Sep", sum: 5000 },
  { id: 10, date: "Oct", sum: 18000 },
  { id: 11, date: "Nov", sum: 13000 },
  { id: 12, date: "Dec", sum: 20000 },
];

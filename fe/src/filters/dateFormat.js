const monthList = {
  Jan: "1",
  Feb: "2",
  Mar: "3",
  Apr: "4",
  May: "5",
  Jun: "6",
  Jul: "7",
  Aug: "8",
  Sept: "9",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
export default (time, fmt) => {
  let timeList = time.split(" ");
  //   console.log(timeList);
  let date = timeList[1];
  let month = monthList[timeList[2]];
  let year = timeList[3];
  let t = timeList[4];

  return `${year}-${month}-${date} ${t}`;
};

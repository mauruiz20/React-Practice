export const dateFormatter = (date) => {
  let day = date.split("/")[0],
    month = date.split("/")[1],
    year = date.split("/")[2];

  return year + "-" + month + "-" + day;
};

const addThousandsSeparator = (num) => {
  const number = Number(num);

  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

export default addThousandsSeparator;
module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt Động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (query.status) {
    const index = filterStatus.findIndex((item) => item.status == query.status);
    filterStatus[index].class = "active";
    //console.log(index);
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }
  return filterStatus;
};

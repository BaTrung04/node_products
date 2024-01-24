const Product = require("../../models/product.models");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchStatusHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  //Bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
    //status: req.query.status,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  //tim kiem
  const objectSearch = searchStatusHelper(req.query);

  //tim kiem
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const products = await Product.find(find);
  // console.log(products);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};

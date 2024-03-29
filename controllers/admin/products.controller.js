const Product = require("../../models/product.models");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchStatusHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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

  // Pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );
  //End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  // console.log(products);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

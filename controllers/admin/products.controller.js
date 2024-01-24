const Product = require("../../models/product.models");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
  });
  console.log(products);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};

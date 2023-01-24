const Products = require('./../../models/productSchema');

async function getProducts(req, res) {
  let { offset, limit, ...query } = req.query;

  let productlist = await Products.find(query, { _id: 0, __v: 0 }).lean();

  if (offset == undefined) {
    offset = 0;
  }
  if (limit == undefined) {
    limit = productlist.length;
  }

  productlist = productlist.slice(offset, offset + limit);

  console.log('total products', productlist.length);
  return res.status(200).send(productlist);
}

async function updateProduct(req, res) {
  console.log('req ', req.body);
  let updateProduct = req.body;
  let productResult = null;
  let productlist = await Products.find().lean();

  productResult = await productlist.filter(
    (product) => product.productId == updateProduct.productId
  )[0];

  if (productResult == null) {
    return res.status(400).send({ message: 'product not found' });
  }

  if (productResult != null) {
    await Products.replaceOne(
      { productId: updateProduct.productId },
      updateProduct
    );
    let productlist = await Products.find({}, { _id: 0, __v: 0 }).lean();

    return res.status(200).send(productlist);
  }
}

async function getFilteredProducts(req, res) {
  let query = req.body.query;
  let productlist = await Products.find(query);
  console.log('filtered products', productlist.length);
  return res.status(200).send(productlist);
}

module.exports = { getProducts, getFilteredProducts, updateProduct };

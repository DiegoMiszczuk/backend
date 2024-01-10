function propProducts(req, res, next) {
  const { price, title, photo, stock } = req.body;
  if (!price || !title || !photo || !stock) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} title, price, photo & stock are required`,
    });
  } else {
    return next();
  }
}

export default propProducts;

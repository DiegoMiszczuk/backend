function propsProductsUtils(data) {
  const { price, title, photo, stock } = data;
  if (!price || !title || !photo || !stock) {
    const error = new Error("title, price, photo & stock are required");
    error.statusCode = 404;
    throw error;
  }
}

export default propsProductsUtils;

function isAdminUtils(data) {
  const { role } = data;

  if (!role || role != "admin") {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }
}

export default isAdminUtils;

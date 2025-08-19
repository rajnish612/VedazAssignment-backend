const VerifyKey = (req, res, next) => {
  const x_api_key = req.headers["x-api-key"];
  if (!x_api_key || x_api_key !== process.env.X_API_KEY) {
    return res.status(403).json({
      message: "Forbidden: Invalid API Key",
      success: false,
    });
  }
  next();
};
export default VerifyKey;

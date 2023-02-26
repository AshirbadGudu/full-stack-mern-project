const jwt = require("jsonwebtoken");
const configs = require("../configs");
const userModel = require("../models/user.model");
const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("x-access-token");
    // Check if the accessToken sent by the user or not
    if (!accessToken)
      return res.status(401).json({
        msg: "Unauthorized, You can't access this data",
        isSuccess: false,
      });
    // Decode the user from the access token
    const decodedUser = jwt.verify(
      req.header("x-access-token"),
      configs.JWT_SECRET
    );
    // Get user mongoose id from decoded user
    const userId = decodedUser._id;
    // Find user by ID
    const user = await userModel.findById(userId).select("-password");
    if (!user)
      return res.status(400).json({
        msg: "No user found with this information",
        isSuccess: false,
      });
    // Send Current User Information
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Unauthorized Server Error", isSuccess: false });
  }
};

module.exports = auth;

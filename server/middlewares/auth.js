import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.id }; // ✅ correct place
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;

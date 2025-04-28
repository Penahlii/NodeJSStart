import jwt from "jsonwebtoken";

export const getTokenContents = (res, accessToken) => {
  if (!accessToken) {
    return res
      .status(401)
      .json({ succes: false, message: "No access Token provided" });
  }

  const tokenConents = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ succes: false, message: "Invalid access Token" });
      }

      return user;
    }
  );

  return tokenConents;
};

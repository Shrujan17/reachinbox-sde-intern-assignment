import { Router } from "express";
import passport from "passport";
import { signToken } from "../utils/jwt";

const router = Router();

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

router.get("/me", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    res.json(require("../utils/jwt").verifyToken(token));
  } catch {
    res.status(401).json(null);
  }
});

export default router;

import { Router, Request, Response } from "express";
import passport from "passport";
import { signToken, verifyToken } from "../utils/jwt";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

router.get("/me", (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json(null);

    const token = auth.split(" ")[1];
    const user = verifyToken(token);
    res.json(user);
  } catch {
    res.status(401).json(null);
  }
});

export default router;

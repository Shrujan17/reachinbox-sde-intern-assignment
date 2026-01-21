import { Router, Request, Response } from "express";
import passport from "passport";
import { signToken, verifyToken } from "../utils/jwt";

const router = Router();

/**
 * Start Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * Google OAuth callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.FRONTEND_URL,
  }),
  (req: Request, res: Response) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

/**
 * Get logged-in user from JWT
 */
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

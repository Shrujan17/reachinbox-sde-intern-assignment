// backend/src/routes/authRoutes.ts
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL!);
  }
);

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

router.get("/logout", (_req, res) => {
  res.redirect(process.env.FRONTEND_URL!);
});

export default router;

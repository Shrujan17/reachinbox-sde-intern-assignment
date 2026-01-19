import { Router } from "express";
import passport from "../auth/google";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173",
  }),
  (_req, res) => {
    // ✅ Successful login
    res.redirect("http://localhost:5173");
  }
);

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

export default router;

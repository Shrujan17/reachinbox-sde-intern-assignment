import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Redirects user back to your frontend website value
    const target = process.env.FRONTEND_URL || "https://reachinbox-frontend-n3dd.onrender.com";
    res.redirect(target);
  }
);

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

router.get("/logout", (req, res) => {
  const target = process.env.FRONTEND_URL || "https://reachinbox-frontend-n3dd.onrender.com";
  res.redirect(target);
});

export default router;
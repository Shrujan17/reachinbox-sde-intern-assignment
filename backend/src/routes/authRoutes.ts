import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }), // Using session now
  (req, res) => {
    const target = process.env.FRONTEND_URL || "https://reachinbox-frontend-n3dd.onrender.com";
    res.redirect(target); // No longer malformed
  }
);

router.get("/me", (req, res) => {
  res.json(req.user || null); // App.tsx init() checks this
});

router.get("/logout", (req: any, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL || "https://reachinbox-frontend-n3dd.onrender.com");
  });
});

export default router;
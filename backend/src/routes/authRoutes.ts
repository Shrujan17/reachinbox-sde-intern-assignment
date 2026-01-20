import { Router } from "express";
import passport from "passport";

const router = Router();

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback → REDIRECT TO FRONTEND
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    return res.redirect("https://reachinbox-frontend.onrender.com");
  }
);

export default router;

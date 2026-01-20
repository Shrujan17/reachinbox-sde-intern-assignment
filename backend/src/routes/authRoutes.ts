import { Router } from "express";
import passport from "passport";

const router = Router();

// 1. Initial Google Login Request
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 2. Google Redirects here after user approves
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // If FRONTEND_URL is "https://reachinbox-frontend-n3dd.onrender.com"
    // This will send the user back to your website home page
    const redirectUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(redirectUrl);
  }
);

// 3. Get current user data
router.get("/me", (req, res) => {
  res.json(req.user || null);
});

// 4. Logout
router.get("/logout", (req, res) => {
  // If using sessions, you'd call req.logout() here
  res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
});

export default router;
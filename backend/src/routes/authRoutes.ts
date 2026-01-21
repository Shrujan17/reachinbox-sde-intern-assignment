import { Router } from "express";
import passport from "passport";

const router = Router();

/**
 * Start Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * Google OAuth Callback
 * ✅ SESSION ENABLED
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req, res) => {
    const frontend =
      process.env.FRONTEND_URL ||
      "https://reachinbox-frontend-n3dd.onrender.com";

    res.redirect(frontend);
  }
);

/**
 * Get current authenticated user
 */
router.get("/me", (req, res) => {
  res.json(req.user || null);
});

/**
 * Logout
 */
router.get("/logout", (req, res) => {
  req.logout(() => {
    const frontend =
      process.env.FRONTEND_URL ||
      "https://reachinbox-frontend-n3dd.onrender.com";

    res.redirect(frontend);
  });
});

export default router;

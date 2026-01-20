import { Router } from "express";
import passport from "passport";

const router = Router();

// STEP 1: Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// STEP 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // ✅ Redirect to frontend after login
    res.redirect(
      "https://reachinbox-frontend.onrender.com"
      // OR your actual frontend URL
    );
  }
);


export default router;

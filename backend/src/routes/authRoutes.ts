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
    res.send("✅ Google authentication successful");
  }
);

export default router;

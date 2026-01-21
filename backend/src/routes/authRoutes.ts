import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

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
 * OAuth Callback → issue JWT → redirect
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const user = req.user;

    const token = jwt.sign(
      {
        id: user.id,
        displayName: user.displayName,
        emails: user.emails,
        photos: user.photos,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const frontend =
      process.env.FRONTEND_URL ||
      "https://reachinbox-frontend-n3dd.onrender.com";

    res.redirect(`${frontend}?token=${token}`);
  }
);

/**
 * Get current user from JWT
 */
router.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.json(null);

  try {
    const token = auth.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    res.json(user);
  } catch {
    res.json(null);
  }
});

export default router;

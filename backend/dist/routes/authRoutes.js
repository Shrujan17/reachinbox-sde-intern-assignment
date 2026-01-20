"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_1 = __importDefault(require("../auth/google"));
const router = (0, express_1.Router)();
router.get("/google", google_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", google_1.default.authenticate("google", {
    failureRedirect: "http://localhost:5173",
}), (_req, res) => {
    // ✅ Successful login
    res.redirect("http://localhost:5173");
});
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
exports.default = router;

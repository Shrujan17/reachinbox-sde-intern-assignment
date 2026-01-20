"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Matches: POST http://localhost:5000/api/schedule-email
router.post("/schedule-email", async (req, res) => {
    const { recipient, subject, body, scheduledAt } = req.body;
    console.log("Email Request Received:", { recipient, subject, scheduledAt });
    res.json({
        message: "Email scheduled (mock)",
        data: { recipient, subject, body, scheduledAt }
    });
});
exports.default = router;

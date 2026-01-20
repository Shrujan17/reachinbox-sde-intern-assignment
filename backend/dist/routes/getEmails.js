"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const router = (0, express_1.Router)();
router.get("/emails", async (_req, res) => {
    const emails = await prisma_1.default.email.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.json(emails);
});
router.get("/emails/sent", async (_req, res) => {
    const emails = await prisma_1.default.email.findMany({
        where: { status: "SENT" },
        orderBy: { sentAt: "desc" },
    });
    res.json(emails);
});
exports.default = router;

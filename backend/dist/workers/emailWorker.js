"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../db/prisma"));
const worker = new bullmq_1.Worker("emailQueue", async (job) => {
    const { emailId } = job.data;
    // 1️⃣ Fetch email from DB
    const email = await prisma_1.default.email.findUnique({
        where: { id: emailId },
    });
    if (!email) {
        throw new Error("Email not found");
    }
    try {
        const testAccount = await nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        const info = await transporter.sendMail({
            from: "ReachInbox <no-reply@reachinbox.ai>",
            to: email.recipient,
            subject: email.subject,
            text: email.body,
        });
        console.log("Email sent:", nodemailer_1.default.getTestMessageUrl(info));
        // 2️⃣ Mark as SENT
        await prisma_1.default.email.update({
            where: { id: emailId },
            data: {
                status: "SENT",
                sentAt: new Date(),
            },
        });
    }
    catch (err) {
        // 3️⃣ Mark as FAILED
        await prisma_1.default.email.update({
            where: { id: emailId },
            data: {
                status: "FAILED",
                error: err.message,
            },
        });
        throw err;
    }
}, {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
    concurrency: 5, // ✅ required by assignment
});
exports.default = worker;

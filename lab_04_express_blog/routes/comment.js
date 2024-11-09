const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { author, text, postId } = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: {
                author,
                text,
                postId,
            },
        });
        res.json(newComment);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/", async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { post: true },
        });
        res.json(comments);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id, 10) },
            include: { post: true },
        });
        if (comment) {
            res.json(comment);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;
    const { author, text, postId } = req.body;
    try {
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id, 10) },
            data: {
                author,
                text,
                postId,
            },
        });
        res.json(updatedComment);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.delete("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: parseInt(id, 10) },
        });
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;

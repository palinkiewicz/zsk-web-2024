const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { title, description } = req.body;

    try {
        const newCategory = await prisma.category.create({
            data: {
                title,
                description,
            },
        });

        res.json(newCategory);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/", async (req, res) => {
    try {
        const categories = await prisma.category.findMany();

        res.json(categories);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (category) {
            res.json(category);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id, 10) },
            data: {
                title,
                description,
            },
        });

        res.json(updatedCategory);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.delete("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: { id: parseInt(id, 10) },
        });

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;

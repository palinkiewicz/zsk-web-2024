const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { title, content, published, categoryId } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published: published || false,
                categoryId,
            },
        });

        res.json(newPost);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany();

        res.json(posts);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (post) {
            res.json(post);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    const { title, content, published, categoryId } = req.body;

    try {
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id, 10) },
            data: {
                title,
                content,
                published,
                categoryId,
            },
        });

        res.json(updatedPost);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.delete('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.post.delete({
            where: { id: parseInt(id, 10) },
        });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;

import { PrismaClient } from '@prisma/client'
import { Request, Response, Router } from "express";

const router = Router();

const prismaClient = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany();

    res.json(products);
});

// paginated products
router.get('/paginated', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    const limit = 10;
    const offset = (page - 1) * limit;

    const products = await prismaClient.product.findMany({
        take: limit,
        skip: offset,
    });

    const totalProducts = await prismaClient.product.count();
    const totalPages = Math.ceil(totalProducts / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    res.json({
        data: products,
        meta: {
            page,
            limit,
            totalProducts,
            totalPages,
            nextPage,
        }
    });
});

router.post('/', async (req: Request, res: Response) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }

    const createdProduct = await prismaClient.product.create({
        data: {
            name,
            price,
        }
    });

    res.json(createdProduct);
});

router.post('/10', async (req: Request, res: Response) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }

    for (let i = 11; i < 50; i++) {
        const initialName = name + i;

        await prismaClient.product.create({
            data: {
                name: initialName,
                price,
            }
        });
    }

    res.json({ message: 'Products created' });
});

export default router;
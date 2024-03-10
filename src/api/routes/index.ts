import { Response, Router } from 'express';

const router = Router();

router.get(
    ['/', '/status', '/health', '/ping'],
    async (_, response: Response) => response.json({ status: 'It´s Alive!' })
);

export { router };

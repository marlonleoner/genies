import { object, string } from 'zod';

const CreatePlayerSchema = object({
    nickname: string().min(1),
    steamId: string().min(1),
    firstName: string().optional(),
    lastName: string().optional(),
    avatar: string().optional(),
    country: string().optional(),
    logo: string().optional(),
    teamId: string().optional()
});

const UpdatePlayerSchema = object({
    id: string().min(1),
    nickname: string().min(1),
    steamId: string().min(1),
    firstName: string().optional(),
    lastName: string().optional(),
    avatar: string().optional(),
    country: string().optional(),
    logo: string().optional(),
    teamId: string().optional()
});

export { CreatePlayerSchema, UpdatePlayerSchema };

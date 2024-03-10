import { object, string } from 'zod';

const CreateTeamSchema = object({
    name: string().min(1),
    tag: string().min(2).max(4).optional(),
    country: string().optional(),
    logo: string().optional(),
});

export { CreateTeamSchema };

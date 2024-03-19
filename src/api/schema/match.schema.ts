import { boolean, number, object, string } from 'zod';

const MatchSchema = object({
    matchId: string(),
    team1Id: string().min(1),
    team2Id: string().min(1),
    bestOf: number(),
    startTime: number().optional(),
    active: boolean().optional()
});

export { MatchSchema };

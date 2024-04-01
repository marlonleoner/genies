import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { generateCustomId } from '../../util/cuid';
import { IMatchRequest } from '../types/request';
import { Team } from './team';

@Entity('tb_matches')
export class Match {
    @PrimaryColumn()
    id!: string;

    @Column({ default: false })
    live!: boolean;

    @Column({ default: 1 })
    bestOf!: number;

    @Column({ type: 'datetime', nullable: true })
    startTime?: Date | null;

    @ManyToOne(() => Team, (team) => team.matches, {
        nullable: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    team1?: Team | null;

    @Column({ default: 0 })
    team1Score!: number;

    @ManyToOne(() => Team, (team) => team.matches, {
        nullable: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    team2?: Team;

    @Column({ default: 0 })
    team2Score!: number;

    @CreateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    static create({ team1, team2, bestOf, startTime }: IMatchRequest): Match {
        const match = new Match();
        match.id = generateCustomId();
        match.team1 = team1;
        match.team2 = team2;
        match.bestOf = bestOf;
        match.startTime = startTime ? new Date(startTime) : null;

        return match;
    }

    set({ team1, team2, bestOf, startTime, active }: IMatchRequest): void {
        this.team1 = team1;
        this.team2 = team2;
        this.bestOf = bestOf;
        this.startTime = startTime ? new Date(startTime) : null;
        this.live = !!active;
        this.updatedAt = new Date();
    }
}

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { generateCustomId } from '../../util/generate-id';
import { IBasicTeam } from '../types/request';

@Entity('tb_teams')
export class Team {
    @PrimaryColumn()
    id!: string;

    @Column({ default: '' })
    name!: string;

    @Column({ type: 'varchar', nullable: true })
    tag?: string | null;

    @Column({ type: 'varchar', nullable: true })
    logo?: string | null;

    @Column({ type: 'varchar', nullable: true })
    country?: string | null;

    @CreateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    static create({ name, tag, logo, country }: IBasicTeam): Team {
        const team = new Team();
        team.id = generateCustomId();
        team.name = name;
        team.tag = tag;
        team.logo = logo;
        team.country = country;

        return team;
    }

    set({ name, tag, logo, country }: IBasicTeam): void {
        this.name = name;
        this.tag = tag;
        this.logo = logo;
        this.country = country;
        this.updatedAt = new Date();
    }
}

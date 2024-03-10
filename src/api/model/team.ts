import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { generateCustomId } from '../../util/generate-id';
import { ICreateTeam } from '../types/request';

@Entity()
export class Team {
    @PrimaryColumn()
    id!: string;

    @Column({ default: '' })
    name!: string;

    @Column({ nullable: true })
    tag?: string;

    @Column({ nullable: true })
    logo?: string;

    @Column({ nullable: true })
    country?: string;

    @CreateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    static create({ name, tag, logo, country }: ICreateTeam): Team {
        const team = new Team();
        team.id = generateCustomId();
        team.name = name;
        team.tag = tag;
        team.logo = logo;
        team.country = country;

        return team;
    }
}

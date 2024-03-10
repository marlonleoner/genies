import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { generateCustomId } from '../../util/cuid';
import { IBasicPlayer } from '../types/request';
import { Team } from './team';

@Entity('tb_players')
export class Player {
    @PrimaryColumn()
    id!: string;

    @Column({ default: '' })
    nickname!: string;

    @Column({ default: '' })
    steamId!: string;

    @Column({ type: 'varchar', nullable: true })
    firstName?: string | null;

    @Column({ type: 'varchar', nullable: true })
    lastName?: string | null;

    @Column({ type: 'varchar', nullable: true })
    avatar?: string | null;

    @Column({ type: 'varchar', nullable: true })
    country?: string | null;

    @ManyToOne(() => Team, (team) => team.players, {
        nullable: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    })
    @JoinColumn()
    team?: Team | null;

    @CreateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ select: false, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    static create({
        nickname,
        steamId,
        firstName,
        lastName,
        avatar,
        country,
        team,
    }: IBasicPlayer): Player {
        const player = new Player();
        player.id = generateCustomId();
        player.nickname = nickname;
        player.steamId = steamId;
        player.firstName = firstName;
        player.lastName = lastName;
        player.avatar = avatar;
        player.country = country;
        player.team = team;

        return player;
    }

    set({
        nickname,
        steamId,
        firstName,
        lastName,
        avatar,
        country,
        team,
    }: IBasicPlayer): void {
        this.nickname = nickname;
        this.steamId = steamId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.country = country;
        this.team = team;
        this.updatedAt = new Date();
    }
}

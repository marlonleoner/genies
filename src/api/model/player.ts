import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { generateCustomId } from '../../util/generate-id';
import { IBasicPlayer } from '../types/request';

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
    }: IBasicPlayer): Player {
        const player = new Player();
        player.id = generateCustomId();
        player.nickname = nickname;
        player.steamId = steamId;
        player.firstName = firstName;
        player.lastName = lastName;
        player.avatar = avatar;
        player.country = country;

        return player;
    }

    set({
        nickname,
        steamId,
        firstName,
        lastName,
        avatar,
        country,
    }: IBasicPlayer): void {
        this.nickname = nickname;
        this.steamId = steamId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.country = country;
        this.updatedAt = new Date();
    }
}

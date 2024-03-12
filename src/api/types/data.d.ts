import { BombSites, BombState, MapPhase, PhaseCountdownsPhase, RoundPhase, SideTeam, WeaponType } from './common';

interface IData {
    map: IMap;
    bomb?: IBomb;
    team1: ITeam;
    team2: ITeam;
    observed?: IPlayer;
    round: IRound;
    rounds: IRoundHistory[];
}

interface IMap {
    name: string;
    phase: MapPhase;
}

interface IBomb {
    state: BombState;
    countdown?: number;
    position: number[];
    player?: string;
    site?: BombSites;
}

interface ITeam {
    id: string;
    side: SideTeam;
    orientation: 'L' | 'R';
    name: string;
    logo: string;
    country: string;
    score: number;
    serieScore: number;
    lossBonus: number;
    timeoutsRemaining: number;
    players: IPlayer[];
}

interface IPlayer {
    id: string | null;
    steamId: string;
    dead: boolean;
    name: string | null;
    nickname: string;
    country: string | null;
    avatar: string | null;
    slot: number;
    side: SideTeam;
    state: IPlayerState;
    stats: IPlayerStats;
    weapons: IPlayerWeapon[];
    position: number[];
    forward: number[];
}

interface IPlayerState {
    health: number;
    armor: number;
    helmet: boolean;
    money: number;
    defuse: boolean;
    timeFlashed: number;
    timeSmoked: number;
    timeBurning: number;
    roundKills: number;
    roundKillsHS: number;
    roundDamage: number;
    equipmentValue: number;
}

interface IPlayerStats {
    kills: number;
    assists: number;
    deaths: number;
    mvps: number;
    score: number;
    adr: number;
}

interface IPlayerWeapon {
    name: string;
    skin: string;
    type: WeaponType;
    active: boolean;
    ammo: number;
    reserveAmmo: number;
}

interface IRound {
    number: number;
    phase: RoundPhase;
    event: PhaseCountdownsPhase;
    countdown: number;
    winner?: SideTeam;
}

interface IRoundHistory {
    round: number;
    side: SideTeam;
    content: RoundWinContentType;
}

export { IBomb, IData, IMap, IPlayer, IPlayerState, IPlayerStats, IPlayerWeapon, IRound, IRoundHistory, ITeam };

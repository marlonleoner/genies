import {
    ActivityPlayer,
    BombState,
    GrenadeType,
    MapPhase,
    PhaseCountdownsPhase,
    RoundWinType,
    WeaponType
} from './common';

type GSIWeaponKeys =
    | 'weapon_0'
    | 'weapon_1'
    | 'weapon_2'
    | 'weapon_3'
    | 'weapon_4'
    | 'weapon_5'
    | 'weapon_6'
    | 'weapon_7';

interface GSIRaw {
    provider: GSIProvider;
    map: GSIMap;
    bomb?: GSIBomb;
    round?: GSIRound;
    phase_countdowns: GSIPhaseCountdowns;
    player: GSIObservedPlayer;
    allplayers: GSIAllPlayers;
    grenades: GSIGrenades;
}

interface GSIProvider {
    appid: number;
    name: string;
    steamid: string;
    timestamp: number;
    version: number;
}

interface GSIMap {
    mode: string;
    name: string;
    phase: MapPhase;
    round: number;
    team_ct: GSITeam;
    team_t: GSITeam;
    num_matches_to_win_series: number;
    round_wins: GSIRoundWins;
}

interface GSITeam {
    score: number;
    name: string;
    consecutive_round_losses: number;
    timeouts_remaining: number;
    matches_won_this_series: number;
}

interface GSIRoundWins {
    [key: string]: RoundWinType;
}

interface GSIRound {
    phase: RoundPhase;
    bomb: GSIBombState;
    win_team: SideTeam;
}

interface GSIPhaseCountdowns {
    phase: PhaseCountdownsPhase;
    phase_ends_in: string;
}

interface GSIPlayer {
    name: string;
    team: SideTeam;
    observer_slot: number;
    state: GSIPlayerState;
    match_stats: GSIPlayerStats;
    weapons: GSIWeapons;
    position: string;
    forward: string;
}

interface GSIObservedPlayer extends GSIPlayer {
    steamid: string;
    activity: ActivityPlayer;
    spectarget: string;
}

interface GSIPlayerState {
    health: number;
    armor: number;
    helmet: boolean;
    defusekit?: boolean;
    flashed: number;
    smoked: number;
    burning: number;
    money: number;
    round_kills: number;
    round_killhs: number;
    round_totaldmg: number;
    equip_value: number;
}

interface GSIPlayerStats {
    kills: number;
    assists: number;
    deaths: number;
    mvps: number;
    score: number;
}

interface GSIWeapons {
    [key: GSIWeaponKeys]: GSIWeapon;
}

interface GSIWeapon {
    name: string;
    paintkit: string;
    type: WeaponType;
    ammo_clip: number;
    ammo_clip_max: number;
    ammo_reserve: number;
    state: WeaponState;
}

interface GSIAllPlayers {
    [key: string]: GSIPlayer;
}

interface GSIGrenades {
    [key: string]: {
        owner: string;
        position: string;
        velocity: string;
        lifetime: string;
        effecttime: string;
        flames: {
            [key: string]: string;
        };
        type: GrenadeType;
    };
}

interface GSIBomb {
    state: BombState;
    position: string;
    player: string;
    countdown: string;
}

export {
    GSIAllPlayers,
    GSIBomb,
    GSIBombState,
    GSIGrenades,
    GSIGrenadesType,
    GSIMap,
    GSIObservedPlayer,
    GSIPhaseCountdowns,
    GSIPlayer,
    GSIPlayerState,
    GSIPlayerStats,
    GSIProvider,
    GSIRaw,
    GSIRound,
    GSIRoundPhase,
    GSIRoundWins,
    GSIRoundWinsType,
    GSITeam,
    GSIWeapon,
    GSIWeaponKeys,
    GSIWeapons
};

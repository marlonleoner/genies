type GSIRoundWinsType =
    | 't_win_elimination'
    | 't_win_bomb'
    | 'ct_win_elimination'
    | 'ct_win_time'
    | 'ct_win_defuse';

type GSIGrenadesType = 'inferno' | 'smoke' | 'flashbang' | 'frag';

type GSIBombState =
    | 'carried'
    | 'dropped'
    | 'plating'
    | 'planted'
    | 'defusing'
    | 'defused';

type GSIRoundPhase = 'freezetime' | 'live' | 'over';

type GSIPhaseCountdownsPhase =
    | 'freezetime'
    | 'live'
    | 'bomb'
    | 'defuse'
    | 'over'
    | 'timeout_t'
    | 'timeout_ct'
    | 'paused';

type GSISideTeam = 'T' | 'CT';

type GSIActivity = 'playing';

type GSIWeaponKeys =
    | 'weapon_0'
    | 'weapon_1'
    | 'weapon_2'
    | 'weapon_3'
    | 'weapon_4'
    | 'weapon_5'
    | 'weapon_6'
    | 'weapon_7';

type GSIWeaponType =
    | 'Knife'
    | 'Pistol'
    | 'Grenade'
    | 'Rifle'
    | 'C4'
    | 'SniperRifle'
    | 'Submachine Gun';

type GSIWeaponState = 'active' | 'holstered';

interface GSIRaw {
    provider: GSIProvider;
    map: GSIMap;
    round?: GSIRound;
    phase_countdowns: GSIPhaseCountdowns;
    player: GSIPlayer;
    allplayers: GSIAllPlayers;
    grenades: GSIGrenades;
    bomb: GSIBomb;
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
    phase: string;
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
    [key: string]: GSIRoundWinsType;
}

interface GSIRound {
    phase: GSIRoundPhase;
    bomb: GSIBombState;
    win_team: GSISideTeam;
}

interface GSIPhaseCountdowns {
    phase: GSIRoundPhase;
    phase_ends_in: string;
}

interface GSIPlayer {
    steamid: string;
    name: string;
    observer_slot: number;
    team: GSISideTeam;
    activity: GSIActivity;
    state: GSIPlayerState;
    match_stats: GSIPlayerStats;
    weapons: GSIWeapons;
    spectarget: string;
    position: string;
    forward: string;
}

interface GSIPlayerState {
    health: number;
    armor: number;
    helmet: boolean;
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
    [key: GSIWeaponKeys]: {
        name: string;
        paintkit: string;
        type: GSIWeaponType;
        ammo_clip: number;
        ammo_clip_max: number;
        ammo_reserve: number;
        state: GSIWeaponState;
    };
}

interface GSIAllPlayers {
    [key: string]: {
        name: string;
        observer_slot: number;
        state: GSIPlayerState;
        match_stats: GSIPlayerStats;
        team: GSISideTeam;
        weapons: GSIWeapons;
        position: string;
        forward: string;
    };
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
        type: GSIGrenadesType;
    };
}

interface GSIBomb {
    state: GSIBombState;
    position: string;
    player: string;
    countdown: string;
}

export { IRaw };

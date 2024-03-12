export type MapPhase = 'live' | 'gameover';

export type RoundWinType = 't_win_elimination' | 't_win_bomb' | 'ct_win_elimination' | 'ct_win_time' | 'ct_win_defuse';

export type RoundWinContentType = 'elimination' | 'bomb' | 'defuse' | 'time';

export type GrenadeType = 'inferno' | 'smoke' | 'flashbang' | 'frag';

export type BombState = 'carried' | 'dropped' | 'planting' | 'planted' | 'defusing' | 'defused' | 'exploded';

export type RoundPhase = 'freezetime' | 'live' | 'over';

export type PhaseCountdownsPhase =
    | 'freezetime'
    | 'live'
    | 'bomb'
    | 'defuse'
    | 'over'
    | 'timeout_t'
    | 'timeout_ct'
    | 'paused';

export type SideTeam = 'T' | 'CT';

export type ActivityPlayer = 'playing';

export type WeaponType = 'Knife' | 'Pistol' | 'Grenade' | 'Rifle' | 'C4' | 'SniperRifle' | 'Submachine Gun';

export type WeaponState = 'active' | 'holstered';

export type BombSites = 'A' | 'B';

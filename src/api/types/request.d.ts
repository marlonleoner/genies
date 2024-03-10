// Team
export interface IBasicTeam {
    name: string;
    tag?: string | null;
    logo?: string | null;
    country?: string | null;
}

export interface ICreateTeam extends IBasicTeam {}

export interface IUpdateTeam extends IBasicTeam {
    id: string;
}

// Player
export interface IBasicPlayer {
    nickname: string;
    steamId: string;
    firstName?: string | null;
    lastName?: string | null;
    country?: string | null;
    avatar?: string | null;
}

export interface ICreatePlayer extends IBasicPlayer {}

export interface IUpdatePlayer extends IBasicPlayer {
    id: string;
}

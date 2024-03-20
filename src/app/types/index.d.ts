type ISide = 'T' | 'CT';

interface IBestOf {
    id: number;
    name: string;
}

interface IMatch {
    team1: ITeam;
    team2: ITeam;
}

interface ITeam {
    id: string;
    name: string;
    logo?: string;
    tag?: string;
    country?: string;
    score?: number;
    side?: ISide;
    players?: IPlayer[];
}

interface IPlayer {
    id: string;
    steamId: string;
    nickname: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    team?: ITeam;
    side: ISide;
}

interface ICountry {
    id: string;
    name: string;
    url?: string;
}

export interface ITeamResponse {
    id: string;
    name: string;
    logo?: string;
    tag?: string;
    country?: string;
}

export interface IPlayerResponse {
    id: string;
    nickname: string;
    steamId: string;
    firstName: string;
    lastName: string;
    avatar: string;
    country: string;
    team: ITeamResponse;
}

export interface IMatchResponse {
    id: string;
}

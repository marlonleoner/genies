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

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QueryObserverResult, injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';

import { IMatchResponse, IPlayerResponse, ITeamResponse } from '../types/api';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl: string = 'http://localhost:6779/api/';

    private teamsKey = 'teams';
    private playersKey = 'players';
    private matchesKey = 'matches';

    private http = inject(HttpClient);

    private client = injectQueryClient();

    private query = injectQuery();

    private mutation = injectMutation();

    constructor() {
        this.http = inject(HttpClient);
    }

    getTeams = (): Result<QueryObserverResult<ITeamResponse[], Error>> => {
        return this.query({
            queryKey: [this.teamsKey] as const,
            queryFn: () => {
                return this.http.get<ITeamResponse[]>(`${this.baseUrl}${this.teamsKey}`);
            }
        });
    };

    private createTeam = () => {
        return this.mutation({
            mutationFn: (team: ITeam) => this.http.post<ITeamResponse>(`${this.baseUrl}${this.teamsKey}`, team),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: [this.teamsKey] });
            }
        });
    };

    private updateTeam = () => {
        return this.mutation({
            mutationFn: (team: ITeam) => this.http.put<ITeamResponse>(`${this.baseUrl}${this.teamsKey}`, team),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: [this.teamsKey] });
            }
        });
    };

    saveTeam = (isEditing: boolean) => {
        if (isEditing) return this.updateTeam();
        return this.createTeam();
    };

    removeTeam = () => {
        return this.mutation({
            mutationFn: (teamId: string) =>
                this.http.delete<ITeamResponse>(`${this.baseUrl}${this.teamsKey}/${teamId}`),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: [this.teamsKey] });
            }
        });
    };

    getPlayers = (): Result<QueryObserverResult<IPlayerResponse[], Error>> => {
        return this.query({
            queryKey: [this.playersKey] as const,
            queryFn: () => {
                return this.http.get<IPlayerResponse[]>(`${this.baseUrl}${this.playersKey}`);
            }
        });
    };

    private createPlayer = () => {
        return this.mutation({
            mutationFn: (player: any) => this.http.post<ITeamResponse>(`${this.baseUrl}${this.playersKey}`, player),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: [this.playersKey] });
            }
        });
    };

    private updatePlayer = () => {
        return this.mutation({
            mutationFn: (player: any) => this.http.put<ITeamResponse>(`${this.baseUrl}${this.playersKey}`, player),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: [this.playersKey] });
            }
        });
    };

    savePlayer = (isEditing: boolean) => {
        if (isEditing) return this.updatePlayer();
        return this.createPlayer();
    };

    removePlayer = () => {
        return this.mutation({
            mutationFn: (playerId: string) =>
                this.http.delete<ITeamResponse>(`${this.baseUrl}${this.playersKey}/${playerId}`),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: [this.playersKey] });
            }
        });
    };

    getMatches = (): Result<QueryObserverResult<IMatchResponse[], Error>> => {
        return this.query({
            queryKey: [this.matchesKey] as const,
            queryFn: () => {
                return this.http.get<IMatchResponse[]>(`${this.baseUrl}${this.matchesKey}`);
            }
        });
    };
}

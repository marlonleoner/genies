import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QueryObserverResult, injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';

import { ITeamResponse } from '../types/api';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl: string = 'http://localhost:6779/api/';

    private http = inject(HttpClient);

    private client = injectQueryClient();

    private query = injectQuery();

    private mutation = injectMutation();

    constructor() {
        this.http = inject(HttpClient);
    }

    getTeams = (): Result<QueryObserverResult<ITeamResponse[], Error>> => {
        return this.query({
            queryKey: ['teams'] as const,
            queryFn: () => {
                return this.http.get<ITeamResponse[]>(`${this.baseUrl}teams`);
            }
        });
    };

    private createTeam = () => {
        return this.mutation({
            mutationFn: (team: ITeam) => this.http.post<ITeamResponse>(`${this.baseUrl}teams`, team),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: ['teams'] });
            }
        });
    };

    private updateTeam = () => {
        return this.mutation({
            mutationFn: (team: ITeam) => this.http.put<ITeamResponse>(`${this.baseUrl}teams`, team),
            onSuccess: () => {
                this.client.invalidateQueries({ queryKey: ['teams'] });
            }
        });
    };

    saveTeam = (isEditing: boolean) => {
        if (isEditing) return this.updateTeam();
        return this.createTeam();
    };
}

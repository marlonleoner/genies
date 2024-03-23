import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { QueryObserverResult } from '@ngneat/query';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../service/api.service';
import { IMatchResponse, IPlayerResponse, ITeamResponse } from '../../types/api';

@Component({
    selector: 'genieshm-home',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './home.page.html',
    styleUrl: './home.page.css'
})
export class HomePage {
    api = inject(ApiService);

    matches: Signal<QueryObserverResult<IMatchResponse[], Error>>;

    teams: Signal<QueryObserverResult<ITeamResponse[], Error>>;

    players: Signal<QueryObserverResult<IPlayerResponse[], Error>>;

    constructor() {
        this.matches = this.api.getMatches().result;
        this.teams = this.api.getTeams().result;
        this.players = this.api.getPlayers().result;
    }
}

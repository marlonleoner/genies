import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { QueryObserverResult } from '@ngneat/query';
import { LucideAngularModule } from 'lucide-angular';
import { GHMButtonComponent } from '../../components/button/button.component';
import { GHMInputComponent } from '../../components/input/input.component';
import { GHMModalComponent } from '../../components/modal/modal.component';
import { GHMTableComponent } from '../../components/table/table.component';
import { ApiService } from '../../service/api.service';
import { IMatchResponse, ITeamResponse } from '../../types/api';

@Component({
    selector: 'app-matches',
    standalone: true,
    imports: [
        CommonModule,
        LucideAngularModule,
        GHMButtonComponent,
        GHMTableComponent,
        GHMModalComponent,
        GHMInputComponent
    ],
    templateUrl: './matches.page.html',
    styleUrl: './matches.page.css'
})
export class MatchesPage {
    api = inject(ApiService);

    matches: Signal<QueryObserverResult<IMatchResponse[], Error>>;

    teams: Signal<QueryObserverResult<ITeamResponse[], Error>>;

    isModalVisible: boolean = false;
    isEditing: boolean = false;

    matchId: string = '';
    team1: string = '';
    team2: string = '';

    constructor() {
        this.matches = this.api.getMatches().result;
        this.teams = this.api.getTeams().result;
    }

    private resetInputs = () => {
        this.matchId = '';
        this.team1 = '';
        this.team2 = '';
    };

    openModal = (action: 'create' | 'update', match?: any) => {
        this.isModalVisible = true;

        console.log(this.matches().data);

        switch (action) {
            case 'create':
                break;
            case 'update':
                this.isEditing = true;
                this.matchId = match.id;
                this.team1 = match.team1.id;
                this.team2 = match.team2.id;
                break;
        }
    };

    closeModal = () => {
        this.resetInputs();
        this.isModalVisible = false;
        this.isEditing = false;
    };

    save = () => {
        this.api.saveMatch(this.isEditing).mutateAsync({
            matchId: this.matchId,
            team1Id: this.team1,
            team2Id: this.team2,
            bestOf: 1
        });
        this.closeModal();
    };

    remove = (match: any) => {
        const confirmDelete = confirm('Remove match?');
        if (confirmDelete) this.api.removeMatch().mutateAsync(match.id);
    };

    setLive = (match: any) => {
        this.api.setLive().mutateAsync(match.id);
    };
}

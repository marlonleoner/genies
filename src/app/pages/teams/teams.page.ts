import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { GHMButtonComponent } from '../../components/button/button.component';
import { GHMModalComponent } from '../../components/modal/modal.component';
import { GHMTableComponent } from '../../components/table/table.component';

import { QueryObserverResult } from '@ngneat/query';
import { GHMInputComponent } from '../../components/input/input.component';
import { ApiService } from '../../service/api.service';
import { ITeamResponse } from '../../types/api';

@Component({
    selector: 'genieshm-teams',
    standalone: true,
    imports: [
        CommonModule,
        LucideAngularModule,
        GHMButtonComponent,
        GHMTableComponent,
        GHMModalComponent,
        GHMInputComponent,
        GHMModalComponent
    ],
    templateUrl: './teams.page.html',
    styleUrl: './teams.page.css'
})
export class TeamsPage {
    api = inject(ApiService);

    teams: Signal<QueryObserverResult<ITeamResponse[], Error>>;

    countries: ICountry[] = [];

    isModalVisible: boolean = false;
    isEditing: boolean = false;

    teamId: string = '';
    teamLogo: string = '';
    teamName: string = '';
    teamTag: string = '';
    teamCountry: string = '';

    constructor() {
        this.teams = this.api.getTeams().result;
    }

    private resetInputs = () => {
        this.teamId = '';
        this.teamName = '';
        this.teamTag = '';
        this.teamLogo = '';
        this.teamCountry = '';
    };

    openModal = (action: string, team?: ITeam) => {
        this.isModalVisible = true;

        switch (action) {
            case 'create':
                break;
            case 'update':
                this.isEditing = true;
                this.teamId = team?.id || '';
                this.teamName = team?.name || '';
                this.teamTag = team?.tag || '';
                this.teamLogo = team?.logo || '';
                this.teamCountry = team?.country || '';
                break;
            case 'delete':
                console.log(team);
                break;
        }
    };

    closeModal = () => {
        this.resetInputs();
        this.isModalVisible = false;
        this.isEditing = false;
    };

    save = async () => {
        this.api.saveTeam(this.isEditing).mutateAsync({
            id: this.teamId,
            name: this.teamName,
            tag: this.teamTag || undefined,
            country: this.teamCountry || undefined,
            logo: this.teamLogo || undefined
        });

        this.closeModal();
    };
}

import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { QueryObserverResult } from '@ngneat/query';
import { LucideAngularModule } from 'lucide-angular';

import { GHMButtonComponent } from '../../components/button/button.component';
import { GHMInputComponent } from '../../components/input/input.component';
import { GHMModalComponent } from '../../components/modal/modal.component';
import { GHMTableComponent } from '../../components/table/table.component';

import { ApiService } from '../../service/api.service';

import { IPlayerResponse, ITeamResponse } from '../../types/api';

@Component({
    selector: 'genieshm-players',
    standalone: true,
    imports: [
        CommonModule,
        LucideAngularModule,
        GHMButtonComponent,
        GHMTableComponent,
        GHMInputComponent,
        GHMModalComponent
    ],
    templateUrl: './players.page.html',
    styleUrl: './players.page.css'
})
export class PlayersPage {
    api = inject(ApiService);

    players: Signal<QueryObserverResult<IPlayerResponse[], Error>>;

    teams: Signal<QueryObserverResult<ITeamResponse[], Error>>;

    countries: any[] = [];

    isModalVisible: boolean = false;
    isEditing: boolean = false;

    playerId: string = '';
    playerSteamId: string = '';
    playerNickname: string = '';
    playerAvatar: string = '';
    playerFirstName: string = '';
    playerLastName: string = '';
    playerCountry: string = '';
    playerTeam: string = '';

    constructor() {
        this.players = this.api.getPlayers().result;
        this.teams = this.api.getTeams().result;
    }

    private resetInputs = () => {
        this.playerId = '';
        this.playerSteamId = '';
        this.playerAvatar = '';
        this.playerNickname = '';
        this.playerFirstName = '';
        this.playerLastName = '';
        this.playerCountry = '';
        this.playerTeam = '';
    };

    openModal = (action: 'create' | 'update' | 'delete', player?: IPlayer) => {
        this.isModalVisible = action === 'create' || action === 'update';

        switch (action) {
            case 'create':
                break;
            case 'update':
                this.isEditing = true;
                this.playerId = player?.id || '';
                this.playerSteamId = player?.steamId || '';
                this.playerAvatar = player?.avatar || '';
                this.playerNickname = player?.nickname || '';
                this.playerFirstName = player?.firstName || '';
                this.playerLastName = player?.lastName || '';
                this.playerCountry = player?.country || '';
                this.playerTeam = player?.team?.id || '';
                break;
            case 'delete':
                const confirmDelete = confirm('Remove player?');
                if (confirmDelete) this.remove(player?.id);
                break;
        }
    };

    closeModal = () => {
        this.resetInputs();
        this.isModalVisible = false;
        this.isEditing = false;
    };

    save = () => {
        this.api.savePlayer(this.isEditing).mutateAsync({
            id: this.playerId,
            steamId: this.playerSteamId,
            avatar: this.playerAvatar,
            nickname: this.playerNickname,
            firstName: this.playerFirstName,
            lastName: this.playerLastName,
            country: this.playerCountry,
            teamId: this.playerTeam
        });
        this.closeModal();
    };

    remove = (playerId?: string) => {
        if (!playerId) return;
        this.api.removePlayer().mutateAsync(playerId);
    };
}

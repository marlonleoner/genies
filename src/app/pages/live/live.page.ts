import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { QueryObserverResult } from '@ngneat/query';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';

import { GHMButtonComponent } from '../../components/button/button.component';
import { GHMInputComponent } from '../../components/input/input.component';
import { GHMModalComponent } from '../../components/modal/modal.component';

import { ApiService } from '../../service/api.service';
import { SocketService } from '../../service/socket.service';

import { IPlayerResponse, ITeamResponse } from '../../types/api';

@Component({
    selector: 'genieshm-live',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, GHMButtonComponent, GHMInputComponent, GHMModalComponent],
    templateUrl: './live.page.html',
    styleUrl: './live.page.css'
})
export class LivePage {
    api = inject(ApiService);

    players: Signal<QueryObserverResult<IPlayerResponse[], Error>>;

    teams: Signal<QueryObserverResult<ITeamResponse[], Error>>;

    countries: any[] = [];

    match: IMatch | undefined = undefined;
    /**
     * Team 1 - infos and players
     */
    team1: ITeam | undefined = undefined;
    /**
     * Team 2 - infos and players
     */
    team2: ITeam | undefined = undefined;

    subscriptionData!: Subscription;

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

    constructor(private socketService: SocketService) {
        this.players = this.api.getPlayers().result;
        this.teams = this.api.getTeams().result;
        this.update();
    }

    update() {
        this.subscriptionData = this.socketService.data$.subscribe((data) => {
            if (!data) return;

            this.match = JSON.parse(JSON.stringify(data));
            this.team1 = this.match?.team1;
            this.team2 = this.match?.team2;

            this.subscriptionData?.unsubscribe();
        });

        this.socketService.on('round_end', this.endRound.bind(this));
    }

    async add(player: IPlayer) {
        const playerApi = this.players().data?.find((p) => p.steamId === player.steamId);

        this.isModalVisible = true;
        this.isEditing = !!playerApi;

        this.playerId = playerApi?.id || '';
        this.playerSteamId = player?.steamId || '';
        this.playerNickname = player?.nickname || '';
        this.playerAvatar = playerApi?.avatar || '';
        this.playerFirstName = playerApi?.firstName || '';
        this.playerLastName = playerApi?.lastName || '';
        this.playerCountry = playerApi?.country || '';
        this.playerTeam = playerApi?.team?.id || '';
    }

    endRound() {
        this.update();
    }

    async save() {
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
    }

    closeModal() {
        this.isModalVisible = false;
    }
}

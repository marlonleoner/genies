import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../service/api.service';

import { IMatchResponse } from '../../types/api';

@Component({
    selector: 'genieshm-match-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './match-detail.page.html',
    styleUrl: './match-detail.page.css'
})
export class MatchDetailPage {
    api = inject(ApiService);

    match?: IMatchResponse;

    constructor(private route: ActivatedRoute) {
        const matchId = this.route.snapshot.paramMap.get('matchId');
        this.api.getMatches().result$.subscribe((matches) => {
            this.match = matches.data?.find((match) => match.id === matchId);
        });
    }
}

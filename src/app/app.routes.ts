import { Routes } from '@angular/router';

import { LivePage } from './pages/live/live.page';
import { MatchesPage } from './pages/matches/matches.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { PlayersPage } from './pages/players/players.page';
import { TeamsPage } from './pages/teams/teams.page';

export const routes: Routes = [
    { path: 'live', component: LivePage },
    { path: 'teams', component: TeamsPage },
    { path: 'players', component: PlayersPage },
    { path: 'matches', component: MatchesPage },
    { path: '**', component: NotFoundPage }
];

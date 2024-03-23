import { Routes } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { HudsPage } from './pages/huds/huds.page';
import { LivePage } from './pages/live/live.page';
import { MatchDetailPage } from './pages/match-detail/match-detail.page';
import { MatchesPage } from './pages/matches/matches.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { PlayersPage } from './pages/players/players.page';
import { TeamsPage } from './pages/teams/teams.page';

export const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'live', component: LivePage },
    { path: 'huds', component: HudsPage },
    { path: 'teams', component: TeamsPage },
    { path: 'players', component: PlayersPage },
    { path: 'matches', component: MatchesPage },
    { path: 'matches/:matchId', component: MatchDetailPage },
    { path: '**', component: NotFoundPage }
];

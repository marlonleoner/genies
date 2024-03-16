import { Routes } from '@angular/router';

import { NotFoundPage } from './pages/not-found/not-found.page';
import { TeamsPage } from './pages/teams/teams.page';

export const routes: Routes = [
    { path: 'teams', component: TeamsPage },
    { path: '**', component: NotFoundPage }
];

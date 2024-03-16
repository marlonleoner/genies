import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { GHMButtonComponent } from '../../components/button/button.component';

@Component({
    selector: 'genieshm-teams',
    standalone: true,
    imports: [LucideAngularModule, GHMButtonComponent],
    templateUrl: './teams.page.html',
    styleUrl: './teams.page.css'
})
export class TeamsPage {
    openModal = (action: string) => {};
}

import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-title-bar',
    standalone: true,
    imports: [LucideAngularModule],
    templateUrl: './title-bar.component.html',
    styleUrl: './title-bar.component.css'
})
export class GHMTitleBarComponent {
    minimize = () => {
        console.log('Ikpa');
    };

    size = () => {
        console.log('Ikpa');
    };

    close = () => {
        console.log('Ikpa');
    };
}

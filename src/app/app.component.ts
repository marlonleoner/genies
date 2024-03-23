import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { GHMNavbarComponent } from './components/navbar/navbar.component';
import { GHMTitleBarComponent } from './components/title-bar/title-bar.component';

@Component({
    selector: 'genieshm-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, GHMTitleBarComponent, GHMNavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'project';

    isInsideElectron = false;

    constructor(private router: Router) {
        const w = <any>window;
        if (w) this.isInsideElectron = !!w.process;

        this.router.navigate(['home']);
    }

    open() {
        // this.electron.open();
    }
}

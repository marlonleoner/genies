import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'genieshm-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'project';

    constructor(private router: Router) {
        this.router.navigate(['teams']);
    }

    open() {
        // this.electron.open();
    }
}

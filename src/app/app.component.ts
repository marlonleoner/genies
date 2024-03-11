import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from './service/electron.service';

@Component({
    selector: 'genies-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'project';

    constructor(private electron: ElectronService) {}

    open() {
        this.electron.open();
    }
}

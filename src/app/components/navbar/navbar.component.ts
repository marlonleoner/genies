import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    navbarContent = [
        {
            title: '',
            links: [{ label: 'Live', icon: 'radio', href: '/live' }]
        },
        {
            title: '',
            links: [
                { label: 'HUDs', icon: 'tv', href: '/huds' },
                { label: 'Teams', icon: 'shield', href: '/teams' },
                { label: 'Players', icon: 'users-round', href: '/players' },
                { label: 'Matches', icon: 'tablet', href: '/matches' },
                { label: 'Tournaments', icon: 'trophy', href: '/tournaments' }
            ]
        }
    ];

    collapsed = false;

    constructor(private router: Router) {}

    collapseNavbar() {
        this.collapsed = !this.collapsed;
    }

    redirect(href: string) {
        this.router.navigate([href]);
    }
}

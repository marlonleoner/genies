import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-button',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class GHMButtonComponent {
    @Input() icon?: string = undefined;

    @Input() variant: 'primary' | 'outline' | 'link' = 'primary';

    @Output() onClickButton: EventEmitter<any> = new EventEmitter();

    handleOnClick = () => {
        this.onClickButton.emit();
    };
}

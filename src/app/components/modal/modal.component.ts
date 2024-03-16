import { CommonModule } from '@angular/common';
import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-modal',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class GHMModalComponent {
    /**
     *
     */
    @Input() title: string = '';
    /**
     *
     */
    @Input() visible: boolean = false;
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     */
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren('tbModalFooter') tbModalFooter!: QueryList<any>;

    tbFooter!: TemplateRef<any>;

    ngAfterContentInit() {
        this.tbFooter = this.tbModalFooter.first;
    }

    ngOnChanges(changes: SimpleChanges) {
        const { visible } = changes;
        if (!visible) return;

        this.visible = visible.currentValue || this.visible;
    }

    close() {
        this.visibleChange.emit(false);
        this.onClose.emit();
    }
}

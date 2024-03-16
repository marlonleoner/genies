import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, QueryList, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
    selector: 'genieshm-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class GHMTableComponent {
    /**
     * Array of items to display in the table
     */
    @Input() values: any[] = [];
    /**
     * Number of visible items
     */
    @Input() rows: number = 5;
    /**
     * Inline style of the component.
     */
    @Input() style: { [klass: string]: any } | null | undefined;

    currentPage: number = 0;

    itemsInScreen: any[] = [];

    @ContentChildren('tbHeaderTemplate') tbHeaderTemplate!: QueryList<any>;

    tbHeader!: TemplateRef<any>;

    @ContentChildren('tbBodyTemplate') tbBodyTemplate!: QueryList<any>;

    tbBody!: TemplateRef<any>;

    ngAfterContentInit() {
        this.tbHeader = this.tbHeaderTemplate.first;
        this.tbBody = this.tbBodyTemplate.first;
    }

    ngOnChanges(changes: SimpleChanges) {
        const { values } = changes;
        if (!values || !values.currentValue) return;

        this.values = values.currentValue;
        this.updateItems();
    }

    cbChangePage(page: string) {
        this.currentPage = Number(page);
        this.updateItems();
    }

    private updateItems() {
        const first = this.currentPage * this.rows;
        this.itemsInScreen = this.values.slice(first, first + this.rows);
    }
}

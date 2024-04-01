import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-paginator',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.css'
})
export class GHMPaginatorComponent {
    /**
     *  Number of total items.
     */
    @Input() totalRecords: number = 0;
    /**
     * Number of pages to display.
     */
    @Input() visibleRows: number = 0;
    /**
     * Number of pages to display.
     */
    @Input() visiblePages: number = 3;
    /**
     * Callback function to call when page changes.
     */
    @Output() onChangePage = new EventEmitter<string>();
    /**
     * Current selected page.
     */
    currentPage: number = 0;
    /**
     * Number of total pages.
     */
    totalPages: number = 0;
    /**
     * List of pages to display.
     */
    pagesList: number[] = [];

    ngOnChanges(changes: SimpleChanges) {
        const { totalRecords, visibleRows, visiblePages } = changes;
        this.totalRecords = totalRecords?.currentValue || this.totalRecords;
        this.visibleRows = visibleRows?.currentValue || this.visibleRows;
        this.visiblePages = visiblePages?.currentValue || this.visiblePages;

        this.totalPages = Math.ceil(this.totalRecords / this.visibleRows);
        this.updatePagesList();
    }

    private updatePagesList() {
        let start = Math.max(0, Math.ceil(this.currentPage - this.visiblePages / 2));
        let end = Math.min(this.totalPages, start + this.visiblePages);
        start = end - start < this.visiblePages ? Math.max(0, end - this.visiblePages) : start;

        this.pagesList = [];
        for (let i = start; i < end; i++) {
            this.pagesList.push(i + 1);
        }
    }

    changePage(page: number) {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.updatePagesList();

            this.onChangePage.emit(String(page));
        }
    }

    firstPage() {
        this.changePage(0);
    }

    lastPage() {
        this.changePage(this.totalPages - 1);
    }

    prevPage() {
        this.changePage(this.currentPage - 1);
    }

    nextPage() {
        this.changePage(this.currentPage + 1);
    }

    getShowingText() {
        const firstElement = this.visibleRows * this.currentPage + 1;
        const lastElement = Math.min(this.visibleRows * (this.currentPage + 1), this.totalRecords);
        return `Showing ${firstElement} to ${lastElement} of ${this.totalRecords} items`;
    }
}

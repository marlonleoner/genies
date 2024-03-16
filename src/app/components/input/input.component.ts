import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-input',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css'
})
export class GHMInputComponent {
    @Input() type: 'text' | 'select' | 'file' = 'text';

    @Input() id!: string;

    @Input() placeholder!: string;

    @Input() options: any[] = [];

    @Input() value!: string;

    @Output() valueChange: EventEmitter<string> = new EventEmitter();

    image!: string | null;

    constructor() {}

    async ngOnChanges(changes: SimpleChanges) {
        const { value } = changes;
        if (!value) {
            return;
        }

        const logo = value.currentValue as string;
        if (!logo) this.image = null;
        if (this.type === 'file' && logo && logo.length < 50) {
            const result = await this.convertUrlToBase64(`http://localhost:6779/api/files/image/${logo}`);
            const base64 = result.split(';base64,')[1];
            this.value = base64;
            this.image = result;
            this.valueChange.emit(base64);
        }
    }

    onTextChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.valueChange.emit(target.value);
    }

    onSelectChange(value: string) {
        this.valueChange.emit(value);
    }

    async onFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const logo = target.files ? target.files[0] : null;
        if (!logo) return;

        const result = await this.convertFileToBase64(logo);
        const base64 = result.split(';base64,')[1];
        this.image = result;
        this.valueChange.emit(base64);
    }

    removeLogo() {
        this.image = null;
        this.valueChange.emit('');
    }

    convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }

    async convertUrlToBase64(url: string): Promise<string> {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data as string);
            };
            reader.onerror = reject;
        });
    }
}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputComponent implements ControlValueAccessor {
    @Input() label = '';

    private innerValue: any = '';

    private onTouched: () => void = noop;
    private onChange: (_: any) => void = noop;

    constructor(private cdr: ChangeDetectorRef) {
    }

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v);
        }
    }

    public onBlur(): void {
        this.onTouched();
    }

    public writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
        this.cdr.detectChanges();
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomInputComponent} from './custom-input.component';
import {FormsModule} from '@angular/forms';
import {findEl} from '../../testing/test-helpers';

describe('CustomInputComponent', () => {
    let component: CustomInputComponent;
    let fixture: ComponentFixture<CustomInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomInputComponent],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display label that was passed', () => {
        component.label = 'Test label';
        fixture.detectChanges();
        const label = findEl(fixture, 'label');

        expect(label.nativeElement.innerText).toContain('Test label');
    });

    it('should react on value change', () => {
        fixture.detectChanges();
        const input = findEl(fixture, 'input');
        input.triggerEventHandler('ngModelChange', 'text');
        fixture.detectChanges();

        expect((component as any).innerValue).toEqual('text');
    });

    it('should call onChange callback', () => {
        fixture.detectChanges();
        const onChangeCallback = (value: string) => {};

        component.registerOnChange(onChangeCallback);
        const spyOnChange = spyOn(component as any, 'onChange');

        const input = findEl(fixture, 'input');
        input.triggerEventHandler('ngModelChange', 'text');

        expect(spyOnChange).toHaveBeenCalledWith('text');
    });

    it('should call onTouched on blur', () => {
        fixture.detectChanges();
        const onTouchedCallback = (value: string) => {};

        component.registerOnTouched(onTouchedCallback);
        const spyOnTouched = spyOn(component as any, 'onTouched');

        const input = findEl(fixture, 'input');
        input.triggerEventHandler('blur', '');

        expect(spyOnTouched).toHaveBeenCalled();
    });
});

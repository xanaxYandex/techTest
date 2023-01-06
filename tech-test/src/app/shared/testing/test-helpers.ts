import {ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export function findEl<T>(
    fixture: ComponentFixture<T>,
    testId: string
): DebugElement {
    return fixture.debugElement.query(
        By.css(`[data-testid="${testId}"]`)
    );
}

export function click<T>(
    fixture: ComponentFixture<T>,
    testId: string
): void {
    const element = findEl(fixture, testId);
    element.triggerEventHandler('click', new MouseEvent('click'));
}

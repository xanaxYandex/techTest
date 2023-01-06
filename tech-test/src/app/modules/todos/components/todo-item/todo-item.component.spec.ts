import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoItemComponent} from './todo-item.component';
import {MOCK_TODO} from '../../../../shared/testing/test-mocks';
import {click, findEl} from '../../../../shared/testing/test-helpers';
import {By} from '@angular/platform-browser';

describe('TodoItemComponent', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TodoItemComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        component.todo = MOCK_TODO;
    });

    /* fixture.detectChanges() called within every test case
     * because you cannot call it more than once with changeDetectionStrategy.OnPush
     */

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should correctly display todo that was passed by default', () => {
        fixture.detectChanges();
        const label = findEl(fixture, 'label');
        const description = findEl(fixture, 'description');
        const category = findEl(fixture, 'category');
        const state = findEl(fixture, 'state').query(By.css('i.fa.fa-circle'));
        const done = findEl(fixture, 'done-time');

        expect(label.nativeElement.innerText.trim()).toEqual(MOCK_TODO.label);
        expect(description.nativeElement.innerText.trim()).toEqual(MOCK_TODO.description);
        expect(category.nativeElement.innerText.trim()).toEqual(MOCK_TODO.category);
        expect(state).toBeTruthy();
        expect(done).toBeFalsy();
    });

    it('should react on change of todo state', () => {
        component.todo = {...MOCK_TODO, done: new Date()};
        fixture.detectChanges();

        const state = findEl(fixture, 'state').query(By.css('i.fa.fa-check-circle'));
        const done = findEl(fixture, 'done-time');

        expect(state).toBeTruthy();
        expect(done).toBeTruthy();
    });

    it('should emit doneStateChange', async () => {
        fixture.detectChanges();
        component.doneStateChange.subscribe((todo) => {
            expect(todo.done).toBeInstanceOf(Date);
        });

        click(fixture, 'state');
    });

    it('should emit deleteTodo with id', async () => {
        fixture.detectChanges();
        component.deleteTodo.subscribe((id) => {
            expect(id).toEqual(MOCK_TODO.id);
        });
        click(fixture, 'delete-btn');
    });

    it('should emit selectTodo with todo', async () => {
        fixture.detectChanges();
        component.selectTodo.subscribe((id) => {
            expect(id).toEqual(MOCK_TODO.id);
        });
        click(fixture, 'label');
    });

});

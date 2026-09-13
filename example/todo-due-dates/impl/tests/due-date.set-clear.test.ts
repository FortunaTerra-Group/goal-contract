import { describe, expect, it } from 'vitest';
import { TodoList } from '../src/todo';

// Predicate set-date: "A due date can be set and cleared on any item"
// Fails today because TodoList has no due-date field or methods at all.

describe('set-date: a due date can be set and cleared on any item', () => {
  it('sets a due date and reads it back', () => {
    const list = new TodoList();
    const item = list.add('buy milk');

    list.setDueDate(item.id, '2026-09-20');

    expect(list.getDueDate(item.id)).toBe('2026-09-20');
  });

  it('clears a due date back to null', () => {
    const list = new TodoList();
    const item = list.add('buy milk');

    list.setDueDate(item.id, '2026-09-20');
    list.clearDueDate(item.id);

    expect(list.getDueDate(item.id)).toBeNull();
  });
});

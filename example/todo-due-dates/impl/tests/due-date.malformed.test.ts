import { describe, expect, it } from 'vitest';
import { TodoList } from '../src/todo';

// Predicate fallback: "An item whose due date is malformed is shown as 'no due
// date', never hidden, never crashes." This is the default-scenario / CHOP
// Rule 10 test. It fails today because setDueDate does not exist at all, so
// storing a malformed value throws instead of falling back.

describe('fallback: a malformed due date never hides the item and never crashes', () => {
  it('does not throw and keeps the item visible with no overdue badge', () => {
    const list = new TodoList();
    const item = list.add('call the plumber');

    expect(() => list.setDueDate(item.id, 'not-a-date')).not.toThrow();

    const ordered = list.ordered();
    const found = ordered.find((i: any) => i.id === item.id);

    expect(found).toBeDefined();
    expect(found.overdue).toBe(false);
  });
});

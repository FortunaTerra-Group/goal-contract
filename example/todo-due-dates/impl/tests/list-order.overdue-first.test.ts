import { describe, expect, it } from 'vitest';
import { TodoList } from '../src/todo';

// Predicate overdue-first: "Overdue items sort above all others when the list opens"
// Fails today because there is no due date, so there is no ordering that could
// put an overdue item first. TodoList doesn't even expose an ordered() view yet.

describe('overdue-first: overdue items sort above all others when the list opens', () => {
  it('places the overdue item at index 0 of three items', () => {
    const list = new TodoList();
    const future = list.add('renew passport');
    list.setDueDate(future.id, '2099-01-01');

    list.add('read a book'); // no due date

    const overdue = list.add('pay rent');
    list.setDueDate(overdue.id, '2020-01-01');

    const ordered = list.ordered();

    expect(ordered[0].id).toBe(overdue.id);
  });
});

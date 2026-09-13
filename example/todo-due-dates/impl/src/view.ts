// Display-only formatting. Reads the already-computed `overdue` flag; never
// re-derives it from a date comparison. That stays the single responsibility
// of isOverdue() in todo.ts (see the one-truth predicate).

import type { OrderedTodoItem } from './todo';

export function renderRow(item: OrderedTodoItem): string {
  const badge = item.overdue ? ' [OVERDUE]' : '';
  return `${item.done ? '[x]' : '[ ]'} ${item.title}${badge}`;
}

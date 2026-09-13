// Toy in-memory TodoList with due-date support. This is the minimal
// implementation written to make the RED tests in ../tests pass. See
// ../../RED-TESTS.md for the predicate each test proves.

export interface TodoItem {
  id: string;
  title: string;
  done: boolean;
  dueDate: string | null;
}

export interface OrderedTodoItem extends TodoItem {
  overdue: boolean;
}

let nextId = 1;

export class TodoList {
  private items: TodoItem[] = [];

  add(title: string): TodoItem {
    const item: TodoItem = { id: String(nextId++), title, done: false, dueDate: null };
    this.items.push(item);
    return item;
  }

  all(): TodoItem[] {
    return [...this.items];
  }

  // Malformed input (fails Date parsing) is stored as no due date rather than
  // thrown. That is the fallback predicate this method exists to satisfy.
  setDueDate(id: string, dueDate: string): void {
    const item = this.findOrThrow(id);
    item.dueDate = isParseableDate(dueDate) ? dueDate : null;
  }

  clearDueDate(id: string): void {
    this.findOrThrow(id).dueDate = null;
  }

  getDueDate(id: string): string | null {
    return this.findOrThrow(id).dueDate;
  }

  // Overdue-first view. isOverdue() is the single place overdue is computed;
  // callers (including view.ts) only ever read the result off this item.
  ordered(): OrderedTodoItem[] {
    return this.all()
      .map((item) => ({ ...item, overdue: isOverdue(item) }))
      .sort((a, b) => Number(b.overdue) - Number(a.overdue));
  }

  private findOrThrow(id: string): TodoItem {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new Error(`no such item: ${id}`);
    return item;
  }
}

function isParseableDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

export function isOverdue(item: Pick<TodoItem, 'dueDate' | 'done'>): boolean {
  if (item.done || !item.dueDate || !isParseableDate(item.dueDate)) return false;
  return new Date(item.dueDate).getTime() < Date.now();
}

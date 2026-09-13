import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Predicate one-truth: "Overdue is computed in exactly one place; no other module
// recomputes it." A static check over the source files, not a runtime check.
// This is the shape "one server module computes overdue; the client bundle
// contains no date-vs-now comparison" takes in a single-process toy: view.ts
// (the display layer) must never do its own date math.
//
// Fails today because no due-date concept exists yet, so zero files compute
// overdue: the metric is 0, not 1.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '..', 'src');

describe('one-truth: overdue is computed in exactly one place', () => {
  it('exactly one source file defines the overdue computation, and the view module never re-derives it from a date comparison', () => {
    const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.ts'));
    const overdueWriterPattern = /function isOverdue/;

    const writers = files.filter((f) =>
      overdueWriterPattern.test(fs.readFileSync(path.join(srcDir, f), 'utf-8')),
    );
    expect(writers).toEqual(['todo.ts']);

    const viewSource = fs.readFileSync(path.join(srcDir, 'view.ts'), 'utf-8');
    const rawDateComparison = /new Date\([^)]*\)\s*[<>]|Date\.now\(\)\s*[<>]/;
    expect(rawDateComparison.test(viewSource)).toBe(false);
  });
});

# governed-build-loop (plugin)

A Claude Code skill: write a [goal contract](../PATTERN.md) before you write code. This is the in-session form of the pattern in the repository root; the mapping between the skill's four sections and the pattern's seven parts is at the top of [`SKILL.md`](skills/governed-build-loop/SKILL.md).

Most ad-hoc AI-assisted coding follows the same shape — orient with a few greps, write code,
open a PR, let review catch what planning should have caught. This skill replaces that with a
four-section contract (**GOAL / CONTEXT / DECOMPOSITION / DO-NOT**) authored before the first
edit, plus an independent-review gate on the contract itself before implementation starts.

See [`skills/governed-build-loop/SKILL.md`](skills/governed-build-loop/SKILL.md) for the full
skill definition, and [`examples/example-run.md`](examples/example-run.md) for a worked
contract on a fictional API feature — including a real conflict the independent-review gate
caught before any code existed.

## Install

Copy `plugin/skills/governed-build-loop/` into your project's `.claude/skills/`, or install it as a plugin via the Claude Code plugin directory (manifest: `plugin/.claude-plugin/plugin.json`).

## License

Apache-2.0, with the rest of this repository. Originally drafted 2026-09-05 as `vivekv77/governed-build-loop-skill` (MIT); consolidated here 2026-09-12.

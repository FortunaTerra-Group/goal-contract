# governed-build-loop (plugin)

A Claude Code skill: write a [goal contract](https://github.com/FortunaTerra-Group/goal-contract/blob/main/PATTERN.md) before you write code. This is the in-session form of the pattern in the repository root; the mapping between the skill's four sections and the pattern's seven parts is at the top of [`SKILL.md`](skills/governed-build-loop/SKILL.md).

Most ad-hoc AI-assisted coding follows the same shape — orient with a few greps, write code,
open a PR, let review catch what planning should have caught. This skill replaces that with a
four-section contract (**GOAL / CONTEXT / DECOMPOSITION / DO-NOT**) authored before the first
edit, plus an independent-review gate on the contract itself before implementation starts.

See [`skills/governed-build-loop/SKILL.md`](skills/governed-build-loop/SKILL.md) for the full
skill definition, and [`examples/example-run.md`](examples/example-run.md) for a worked
contract on a fictional API feature — including a real conflict the independent-review gate
caught before any code existed.

## Install

Copy `plugin/skills/governed-build-loop/` into your project's `.claude/skills/`, or install it from FortunaTerra's plugin marketplace: `claude plugin marketplace add FortunaTerra-Group/claude-plugins` then `claude plugin install governed-build-loop@fortunaterra` (manifest: `plugin/.claude-plugin/plugin.json`). Invoke it as `/governed-build-loop` if you copied the skill, or `/governed-build-loop:governed-build-loop` if you installed the plugin.

## What this plugin runs and sends

The plugin directory (`plugin/`) holds one skill file (`skills/governed-build-loop/SKILL.md`), a worked example (`examples/example-run.md`) and a manifest (`.claude-plugin/plugin.json`). It contains no hooks, no MCP servers, no scripts, no binaries and no executable code, so installing it executes nothing. The other directories in this repository (`schema/`, and `example/`, which has a small TypeScript project used as a demonstration) are not part of the installed plugin.

When you invoke the skill, it instructs the agent to write a four-section contract (GOAL, CONTEXT, DECOMPOSITION, DO-NOT) before editing code, to get an independent read of that contract from a person or a fresh agent instance, and only then to implement. After the contract is reviewed, the skill tells the agent to implement the work, which edits your project files through your session's normal tools and permissions. The skill does not name any command to run and does not specify where the contract is saved; the contract can be returned in the conversation or saved wherever you ask.

The plugin makes no network requests of its own, has no server or telemetry, and sends nothing to FortunaTerra. Content you share in the session is processed by the model, and by any fresh agent instance you use for the review, as any other session content is, under your Claude Code settings.

The repository's [SECURITY.md](https://github.com/FortunaTerra-Group/goal-contract/blob/main/SECURITY.md) and [CODE_OF_CONDUCT.md](https://github.com/FortunaTerra-Group/goal-contract/blob/main/CODE_OF_CONDUCT.md) are at the repository root and are not part of the installed plugin.

## License

Apache-2.0, with the rest of this repository. Originally drafted 2026-09-05 as `vivekv77/governed-build-loop-skill` (MIT); consolidated here 2026-09-12.

---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices". Also run it as part of QA before any client launch.
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Vercel's Web Interface Guidelines.

## How it works

1. Read the rules in `guidelines.md` (next to this file).
2. Read the specified files, or ask which files to review if none are given.
3. Check them against every rule in `guidelines.md`.
4. Output findings in the terse `file:line` format that `guidelines.md` specifies.

## About the rules file

`guidelines.md` is a pinned snapshot of
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
(taken 2026-10-02). Oceanalt vendors it rather than fetching it on every run, so the rules are reviewed in git and can't change underneath a review. To refresh, download that URL, diff it against `guidelines.md`, read the changes, and commit.

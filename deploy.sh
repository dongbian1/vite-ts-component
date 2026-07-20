#!/usr/bin/env sh
# 兼容 Linux / macOS / Git Bash；Windows 请直接：pnpm docs:deploy
set -e
cd "$(dirname "$0")"
node ./deploy.mjs

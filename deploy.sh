#!/bin/bash

set -e

# Check if required commands are available
command -v git >/dev/null 2>&1 || { echo >&2 "git is not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "npm is not installed. Aborting."; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo >&2 "pm2 is not installed. Aborting."; exit 1; }

cd ./ || exit

echo "🌀 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔁 Restarting app..."
pm2 restart alnakheelApi

#!/bin/bash
rm -rf src.zip
zip -r src.zip . -x build/\* node_modules/\* public/\* .git/\* .gitignore package-lock.json package.sh

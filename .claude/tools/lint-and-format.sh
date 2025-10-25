#!/bin/bash

# Log file for debugging
LOG_FILE="/tmp/claude-lint.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Read the file path from the tool input JSON
file_path=$(jq -r '.tool_input.file_path' 2>/dev/null || echo "")

log "Hook triggered for: $file_path"

if [ -z "$file_path" ]; then
    log "No file path found, exiting"
    exit 0
fi

# Skip certain files/directories
if echo "$file_path" | grep -qE '\.(env|lock)$|/node_modules/|/\.git/|/dist/|/tmp/'; then
    log "Skipping file (excluded pattern): $file_path"
    exit 0
fi

# Get file extension
ext="${file_path##*.}"
log "File extension: $ext"

# Change to the project root directory
cd "$(dirname "$0")/../.."

case "$ext" in
    js|cjs|mjs)
        # JavaScript files: ESLint fix + Prettier
        if [ -f "$file_path" ]; then
            log "Running ESLint and Prettier on JS file: $file_path"
            pnpm eslint "$file_path" --fix --quiet 2>/dev/null || log "ESLint failed for $file_path"
            pnpm prettier --write "$file_path" 2>/dev/null || log "Prettier failed for $file_path"
            log "Completed JS processing for: $file_path"
        else
            log "JS file not found: $file_path"
        fi
        ;;
    ts)
        # TypeScript files: ESLint fix + Prettier
        if [ -f "$file_path" ]; then
            log "Running ESLint and Prettier on TS file: $file_path"
            pnpm eslint "$file_path" --fix --quiet 2>/dev/null || log "ESLint failed for $file_path"
            pnpm prettier --write "$file_path" 2>/dev/null || log "Prettier failed for $file_path"
            log "Completed TS processing for: $file_path"
        else
            log "TS file not found: $file_path"
        fi
        ;;
    gjs|gts)
        # Glimmer JS/TS files: ESLint fix + Prettier
        if [ -f "$file_path" ]; then
            log "Running ESLint and Prettier on $ext file: $file_path"
            pnpm eslint "$file_path" --fix --quiet 2>/dev/null || log "ESLint failed for $file_path"
            pnpm prettier --write "$file_path" 2>/dev/null || log "Prettier failed for $file_path"
            log "Completed $ext processing for: $file_path"
        else
            log "$ext file not found: $file_path"
        fi
        ;;
    hbs)
        # Handlebars templates: ember-template-lint fix + Prettier
        if [ -f "$file_path" ]; then
            log "Running ember-template-lint and Prettier on HBS file: $file_path"
            pnpm ember-template-lint "$file_path" --fix 2>/dev/null || log "ember-template-lint failed for $file_path"
            pnpm prettier --write "$file_path" 2>/dev/null || log "Prettier failed for $file_path"
            log "Completed HBS processing for: $file_path"
        else
            log "HBS file not found: $file_path"
        fi
        ;;
    css)
        # CSS files: Stylelint fix + Prettier
        if [ -f "$file_path" ]; then
            log "Running Stylelint and Prettier on CSS file: $file_path"
            pnpm stylelint "$file_path" --fix 2>/dev/null || log "Stylelint failed for $file_path"
            pnpm prettier --write "$file_path" 2>/dev/null || log "Prettier failed for $file_path"
            log "Completed CSS processing for: $file_path"
        else
            log "CSS file not found: $file_path"
        fi
        ;;
    json|md|yml|yaml)
        # JSON, Markdown, YAML files: just Prettier
        if [ -f "$file_path" ]; then
            log "Running Prettier on $ext file: $file_path"
            pnpm prettier --write "$file_path" 2>/dev/null || log "Prettier failed for $file_path"
            log "Completed $ext processing for: $file_path"
        else
            log "$ext file not found: $file_path"
        fi
        ;;
    *)
        log "No processing rules for extension: $ext (file: $file_path)"
        ;;
esac

log "Hook completed for: $file_path"
exit 0

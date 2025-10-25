#!/bin/bash

# Log file for debugging
LOG_FILE="/tmp/claude-validate.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Read the file path from the tool input JSON
file_path=$(jq -r '.tool_input.file_path' 2>/dev/null || echo "")

log "Validation hook triggered for: $file_path"

if [ -z "$file_path" ]; then
    log "No file path found, allowing operation"
    exit 0
fi

# Check for protected files/directories that should not be edited
# Use exact patterns or path-specific checks to avoid false positives
if [[ "$file_path" == *"/.env" ]] || [[ "$file_path" == *"/.env."* ]] || [[ "${file_path##*/}" == ".env" ]]; then
    log "BLOCKED: Attempted to edit .env file: $file_path"
    echo "Error: Cannot edit .env file: $file_path"
    exit 2
fi

if [[ "$file_path" == *"/package-lock.json" ]] || [[ "${file_path##*/}" == "package-lock.json" ]]; then
    log "BLOCKED: Attempted to edit package-lock.json: $file_path"
    echo "Error: Cannot edit package-lock.json: $file_path"
    exit 2
fi

# Check for protected directories
protected_dirs=(".git/" "node_modules/" "dist/" "tmp/")
for dir in "${protected_dirs[@]}"; do
    if [[ "$file_path" == *"/$dir"* ]]; then
        log "BLOCKED: Attempted to edit file in protected directory: $file_path (dir: $dir)"
        echo "Error: Cannot edit files in protected directory: $dir"
        exit 2
    fi
done

# Check for protected file patterns
if [[ "${file_path##*/}" == ".DS_Store" ]] || [[ "$file_path" == *.lock ]] || [[ "$file_path" == *.log ]]; then
    log "BLOCKED: Attempted to edit protected file type: $file_path"
    echo "Error: Cannot edit this file type: $file_path"
    exit 2
fi

log "Validation passed for: $file_path"
exit 0
#!/bin/bash

LOG_FILE="/tmp/claude-lint.log"

if [ -f "$LOG_FILE" ]; then
    echo "=== Claude Lint Hook Log ==="
    tail -20 "$LOG_FILE"
    echo ""
    echo "Full log available at: $LOG_FILE"
    echo "Use 'tail -f $LOG_FILE' to watch real-time"
else
    echo "No log file found at $LOG_FILE"
    echo "The hook may not have been triggered yet, or there might be an issue with the hook configuration."
fi
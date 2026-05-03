#!/bin/bash
# Apply a custom icon to the cloned Streamlit source.
# Icons are sourced from the repo's top-level icons/ folder.
# Usage: ./select_animation.sh [icon-name-or-number]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ICONS_DIR="$REPO_ROOT/icons"
STREAMLIT_DIR="$SCRIPT_DIR/streamlit"
TARGET="$STREAMLIT_DIR/frontend/app/src/components/StatusWidget/IconRunning.tsx"

if [ ! -d "$STREAMLIT_DIR" ]; then
    echo "Error: Streamlit not cloned yet. Run: ./build_streamlit.sh clone"
    exit 1
fi

mapfile -t ICON_FILES < <(ls "$ICONS_DIR"/*.tsx 2>/dev/null | sort)

if [ ${#ICON_FILES[@]} -eq 0 ]; then
    echo "Error: No icon files found in $ICONS_DIR"
    exit 1
fi

echo ""
echo "Available icons:"
echo "----------------"
for i in "${!ICON_FILES[@]}"; do
    NAME=$(basename "${ICON_FILES[$i]}" .tsx)
    printf "  %2d) %s\n" "$((i+1))" "$NAME"
done
echo ""

if [ -n "$1" ]; then
    ARG="$1"
    if [[ "$ARG" =~ ^[0-9]+$ ]]; then
        IDX=$((ARG - 1))
        if [ "$IDX" -lt 0 ] || [ "$IDX" -ge "${#ICON_FILES[@]}" ]; then
            echo "Error: Invalid number $ARG (valid range: 1-${#ICON_FILES[@]})"
            exit 1
        fi
        SELECTED="${ICON_FILES[$IDX]}"
    else
        MATCH=$(ls "$ICONS_DIR/${ARG}.tsx" 2>/dev/null || true)
        if [ -z "$MATCH" ]; then
            echo "Error: Icon not found: $ARG"
            exit 1
        fi
        SELECTED="$MATCH"
    fi
else
    read -rp "Select icon (1-${#ICON_FILES[@]}): " CHOICE
    IDX=$((CHOICE - 1))
    if [ "$IDX" -lt 0 ] || [ "$IDX" -ge "${#ICON_FILES[@]}" ]; then
        echo "Error: Invalid selection"
        exit 1
    fi
    SELECTED="${ICON_FILES[$IDX]}"
fi

NAME=$(basename "$SELECTED" .tsx)
cp "$SELECTED" "$TARGET"
echo "Applied: $NAME"
echo ""
echo "Rebuild with: ./build_streamlit.sh rebuild"

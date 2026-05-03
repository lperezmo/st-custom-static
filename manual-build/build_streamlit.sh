#!/bin/bash
# Build script for customizing Streamlit's loading animation
# Run this script from the streamlit-custom directory

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STREAMLIT_DIR="$SCRIPT_DIR/streamlit"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "\n${GREEN}[STEP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_dependencies() {
    print_step "Checking dependencies..."
    
    local missing=()
    
    # Check Node.js (need v20+)
    if ! command -v node &> /dev/null; then
        missing+=("nodejs (v20+)")
    else
        NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -lt 20 ]; then
            print_warning "Node.js version is $NODE_VERSION, need 20+. May cause issues."
        fi
    fi
    
    # Check corepack/yarn
    if ! command -v corepack &> /dev/null; then
        missing+=("corepack")
    fi
    
    # Check protoc
    if ! command -v protoc &> /dev/null; then
        missing+=("protobuf-compiler (protoc)")
    fi
    
    # Check uv
    if ! command -v uv &> /dev/null; then
        missing+=("uv")
    fi
    
    if [ ${#missing[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing[*]}"
        echo ""
        echo "Install on Debian/Ubuntu:"
        echo "  sudo apt update"
        echo "  sudo apt install -y protobuf-compiler"
        echo "  # For Node.js v20:"
        echo "  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
        echo "  sudo apt install -y nodejs"
        echo "  sudo corepack enable"
        echo "  # For uv:"
        echo "  curl -LsSf https://astral.sh/uv/install.sh | sh"
        exit 1
    fi
    
    echo "All dependencies found."
}

clone_repo() {
    print_step "Cloning Streamlit repository..."
    
    if [ -d "$STREAMLIT_DIR" ]; then
        echo "Streamlit directory already exists. Skipping clone."
        echo "To get fresh copy, run: rm -rf $STREAMLIT_DIR"
        return
    fi
    
    # Clone with shallow history for speed
    git clone --depth 1 https://github.com/streamlit/streamlit.git "$STREAMLIT_DIR"
}

setup_python_env() {
    print_step "Setting up Python environment with uv..."
    
    cd "$SCRIPT_DIR"
    
    if [ ! -f "pyproject.toml" ]; then
        # Create minimal pyproject.toml
        cat > pyproject.toml << 'EOF'
[project]
name = "streamlit-custom"
version = "0.1.0"
requires-python = ">=3.9"
dependencies = []

[tool.uv]
dev-dependencies = []
EOF
    fi
    
    # Create venv if doesn't exist
    if [ ! -d ".venv" ]; then
        uv venv
    fi
    
    echo "Python environment ready at $SCRIPT_DIR/.venv"
}

install_frontend_deps() {
    print_step "Installing frontend dependencies..."
    
    cd "$STREAMLIT_DIR/frontend"
    corepack enable yarn
    corepack install
    yarn install --immutable
}

build_protobufs() {
    print_step "Building protobufs..."
    
    cd "$STREAMLIT_DIR"
    
    # Python protobufs
    protoc \
        --proto_path=proto \
        --python_out=lib \
        --mypy_out=lib \
        proto/streamlit/proto/*.proto
    
    # JS/TS protobufs
    cd frontend
    yarn workspace @streamlit/protobuf run generate-protobuf
}

build_frontend() {
    print_step "Building frontend..."
    
    cd "$STREAMLIT_DIR/frontend"
    yarn workspaces foreach --all --topological run build
    
    # Copy to static folder
    rsync -av --delete --delete-excluded --exclude=reports \
        "$STREAMLIT_DIR/frontend/app/build/" "$STREAMLIT_DIR/lib/streamlit/static/"
    
    # Move manifest
    mv "$STREAMLIT_DIR/lib/streamlit/static/.vite/manifest.json" \
       "$STREAMLIT_DIR/lib/streamlit/static/"
}

install_streamlit() {
    print_step "Installing custom Streamlit..."
    
    cd "$SCRIPT_DIR"
    source .venv/bin/activate
    
    # Install streamlit in editable mode
    uv pip install -e "$STREAMLIT_DIR/lib"
    
    echo ""
    echo -e "${GREEN}Done!${NC} Custom Streamlit installed."
    echo ""
    echo "Activate with: source .venv/bin/activate"
    echo "Run with: streamlit run your_app.py"
}

show_customization_info() {
    echo ""
    echo "=============================================="
    echo "WHERE TO CUSTOMIZE THE LOADING ANIMATION"
    echo "=============================================="
    echo ""
    echo "The 'running man' is defined in:"
    echo "  $STREAMLIT_DIR/frontend/app/src/components/StatusWidget/"
    echo ""
    echo "Key files:"
    echo "  - IconRunning.tsx    (new icon-based animation)"
    echo "  - StatusWidget.tsx   (main status component)"
    echo "  - styled-components.ts"
    echo ""
    echo "Options:"
    echo "  1. Replace the icon animation with a custom GIF"
    echo "  2. Modify IconRunning.tsx to use different icons"
    echo "  3. Add your own React component"
    echo ""
    echo "After changes, rebuild with:"
    echo "  ./build_streamlit.sh rebuild"
    echo ""
}

# Command handling
case "${1:-full}" in
    deps)
        check_dependencies
        ;;
    clone)
        clone_repo
        ;;
    frontend)
        install_frontend_deps
        build_protobufs
        build_frontend
        ;;
    install)
        install_streamlit
        ;;
    rebuild)
        # Quick rebuild after customization
        build_frontend
        install_streamlit
        ;;
    full)
        check_dependencies
        clone_repo
        setup_python_env
        install_frontend_deps
        build_protobufs
        build_frontend
        install_streamlit
        show_customization_info
        ;;
    info)
        show_customization_info
        ;;
    *)
        echo "Usage: $0 {full|deps|clone|frontend|install|rebuild|info}"
        echo ""
        echo "Commands:"
        echo "  full     - Complete setup from scratch (default)"
        echo "  deps     - Check dependencies only"
        echo "  clone    - Clone Streamlit repo"
        echo "  frontend - Build frontend only"
        echo "  install  - Install to Python env only"
        echo "  rebuild  - Quick rebuild (frontend + install)"
        echo "  info     - Show customization info"
        exit 1
        ;;
esac

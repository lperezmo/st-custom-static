# Custom Streamlit Build

Build Streamlit from source with a custom loading animation (replace the "running man").

## Quick Overview

There are two ways to use custom animations:

1. **Full Build** (one-time): Build Streamlit from source, customize, then copy the `static/` folder
2. **Copy Static Folder** (reuse): Copy pre-built `static/` to any matching Streamlit version

---

## Prerequisites (Debian/Ubuntu)

```bash
# Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Enable corepack for yarn
sudo corepack enable

# Protobuf compiler (need >= 3.20)
sudo apt install -y protobuf-compiler

# uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh
```

---

## Full Build (First Time)

### 1. Clone and Setup

```bash
mkdir ~/CustomStreamlit && cd ~/CustomStreamlit

# Clone streamlit
git clone --depth 1 https://github.com/streamlit/streamlit.git

# Create uv environment
uv venv
source .venv/bin/activate
```

### 2. Install Python Protobuf Dependencies

Put the `pyproject.toml` on your uv repo, and run

```bash
uv sync
```

### 3. Select Your Animation

Run the script to edit animation, or edit yourself at `streamlit/frontend/app/src/components/StatusWidget/IconRunning.tsx`

See the html preview for details 

```bash
cd ~/CustomStreamlit
./select_animation.sh 7  # Progress Ring
```

### 4. Build Frontend

This is the slow step (~3-5 minutes):

```bash
cd ~/CustomStreamlit/streamlit/frontend
yarn workspaces foreach --all --topological run build
```

### 5. Copy Built Files to Static Folder

```bash
cd ~/CustomStreamlit/streamlit

rsync -av --delete --delete-excluded --exclude=reports \
    frontend/app/build/ lib/streamlit/static/

mv lib/streamlit/static/.vite/manifest.json lib/streamlit/static/
```

Verify you have these files:
```bash
ls lib/streamlit/static/
# Should show: favicon.png  index.html  manifest.json  static/
```

### 6. Install Streamlit

```bash
cd ~/CustomStreamlit
source .venv/bin/activate
uv pip install -e streamlit/lib
```

### 7. Disable Development Mode

**Critical**: Without this, Streamlit looks for a Node dev server instead of static files.

```bash
mkdir -p ~/.streamlit
echo '[global]
developmentMode = false' >> ~/.streamlit/config.toml
```

Or per-project:
```bash
mkdir -p ~/CustomStreamlit/.streamlit
echo '[global]
developmentMode = false' > ~/CustomStreamlit/.streamlit/config.toml
```

### 8. Test

```bash
cd ~/CustomStreamlit
source .venv/bin/activate
streamlit run example_app.py
```

Should open on `http://localhost:8501` (not 3000). Interact with the slider to see your custom animation.

---

## Changing Animation Later

```bash
cd ~/CustomStreamlit

# Select new animation
./select_animation.sh 4  # Bar Chart

# Rebuild frontend only
cd streamlit/frontend
yarn workspaces foreach --all --topological run build

# Copy to static
cd ..
rsync -av --delete --delete-excluded --exclude=reports \
    frontend/app/build/ lib/streamlit/static/
mv lib/streamlit/static/.vite/manifest.json lib/streamlit/static/

# Test
cd ~/CustomStreamlit
streamlit run example_app.py
```

---

## Troubleshooting

### "Serving static content from the Node dev server"

Streamlit is in development mode. Fix:
```bash
echo '[global]
developmentMode = false' >> ~/.streamlit/config.toml
```

### Port 3000 instead of 8501

Same issue as above - development mode is enabled.

### `protoc-gen-mypy: program not found`

Install the Python protobuf plugin:
```bash
source .venv/bin/activate
uv pip install mypy-protobuf
```

### Yarn peer dependency warnings

Normal, ignore them. The build still works.

### Animation not showing / old animation

1. Hard refresh browser: `Ctrl+Shift+R`
2. Verify static files were copied:
   ```bash
   ls ~/CustomStreamlit/streamlit/lib/streamlit/static/
   ```
3. Check you're using the right environment:
   ```bash
   which streamlit
   ```

### Build takes forever

First build is slow due to node_modules. Subsequent rebuilds (after `yarn install`) are faster (~2-3 min).

---

## File Locations

| What | Path |
|------|------|
| Animation component | `streamlit/frontend/app/src/components/StatusWidget/IconRunning.tsx` |
| Built static files | `streamlit/lib/streamlit/static/` |
| Streamlit config | `~/.streamlit/config.toml` |
| Animation options | `IconRunning_options.tsx` |

---

## Project Structure

```
YourWorkingFolder/
├── .venv/                    # Python virtual environment
├── .streamlit/
│   └── config.toml           # developmentMode = false
├── streamlit/                # Cloned streamlit repo
│   ├── frontend/
│   │   └── app/src/components/StatusWidget/
│   │       └── IconRunning.tsx   # <-- Edit this
│   └── lib/
│       └── streamlit/
│           └── static/       # <-- Built frontend goes here
├── build_streamlit.sh
├── select_animation.sh
├── copy_to_env.sh
├── example_app.py
├── preview_animations.html
├── IconRunning_options.tsx
└── README.md
```
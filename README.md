# st-custom-static

[![PyPI version](https://img.shields.io/pypi/v/st-custom-static)](https://pypi.org/project/st-custom-static/)
[![Python versions](https://img.shields.io/pypi/pyversions/st-custom-static)](https://pypi.org/project/st-custom-static/)
[![License](https://img.shields.io/github/license/lperezmo/st-custom-static)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/lperezmo/st-custom-static/build-release.yml?label=build)](https://github.com/lperezmo/st-custom-static/actions/workflows/build-release.yml)

Drop-in replacements for Streamlit's default loading animation. Swap out the running man with one of 13 polished alternatives in seconds.

## Install

```bash
pip install st-custom-static
st-install --icon italic-h-sweep
```

Streamlit's version is auto-detected. Restart any running apps to apply the change.

## Restore the original

```bash
st-install --restore
```

## Available icons

| Name | Preview |
|------|---------|
| `italic-h-sweep` | italic H with a light sweep |
| `italic-h-striped` | italic H with column-by-column stripe wave |
| `italic-h-wave` | italic H bars filling sequentially |
| `italic-h-scan` | italic H ghost outline with scanning line |
| `italic-h-sequential` | italic H bars lighting up left to right |
| `italic-h-cascade` | italic H with per-stripe cascade |
| `three-dots` | ![Three Dots](example_animations/three-dots.svg) |
| `bar-chart` | ![Bar Chart](example_animations/bar-chart.svg) |
| `progress-ring` | ![Progress Ring](example_animations/progress-ring.svg) |
| `spinning-sync` | ![Spinning Sync](example_animations/spin-sync.svg) |
| `pulsing-dot` | ![Pulsing Dot](example_animations/pulse-dot.svg) |
| `rotating-gear` | ![Rotating Gear](example_animations/rotate-gear.svg) |
| `hourglass` | ![Hourglass](example_animations/hourglass.svg) |

## Supported Streamlit versions

1.45.1, 1.46.1, 1.47.1, 1.48.1, 1.49.1, 1.50.0, 1.51.0, 1.52.0, 1.53.1, 1.54.0, 1.55.0, 1.56.0, 1.57.0

Pin a specific version if auto-detection is wrong:

```bash
st-install --icon italic-h-sweep --version 1.57.0
```

## Use in a project

Add to `pyproject.toml` or `requirements.txt`:

```
st-custom-static
```

Then run `st-install --icon <name>` once after `pip install`.

## Manual build

Clone and build from source using the scripts in [`manual-build/`](manual-build/).

## How it works

Pre-built zips are published as GitHub Releases per version/icon combination. `st-install` downloads the matching zip, backs up Streamlit's original `static/` folder, and replaces it with the custom build. The CI workflow in this repo rebuilds those zips automatically when icons or workflow config changes.

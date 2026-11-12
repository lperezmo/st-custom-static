# CHANGELOG


## v1.0.3 (2026-11-12)

### Bug Fixes

- **ci**: Build only missing icon variants, raise apt step timeout to 8 min
  ([#5](https://github.com/lperezmo/st-custom-static/pull/5),
  [`da6ec77`](https://github.com/lperezmo/st-custom-static/commit/da6ec7738f609620176a3b8ab86ed769c2152095))


## v1.0.2 (2026-11-12)

### Bug Fixes

- **ci**: Correct release check, run weekly, add build timeouts
  ([#4](https://github.com/lperezmo/st-custom-static/pull/4),
  [`1bd9952`](https://github.com/lperezmo/st-custom-static/commit/1bd9952451b0ae823f839db227b78536fdaa4318))

The watch workflow's check piped `gh release list | grep -q` under `set -o pipefail`. grep exits on
  the first match, gh dies with SIGPIPE (exit 141), so the pipeline failed whenever the releases DID
  exist and all 13 builds re-ran every day.

- Check each expected `v<version>-<icon>` release with `gh release view` (no pipe, no list limit)
  and build if any is missing. - Define the icon list once in the check step and feed the build
  matrix from it, so the check and the matrix cannot drift. - Run the schedule weekly (Mondays 13:20
  UTC) instead of daily. - build-matrix: timeout-minutes 10 on the build job, 5 on the apt step (one
  job hung for 6 hours in apt-get on 2026-10-22).

### Chores

- Add build-all workflow for full 13x13 icon/version matrix
  ([`c942bac`](https://github.com/lperezmo/st-custom-static/commit/c942bac2986d23a0aff0cc65ab0bc7712caafc48))

- Add daily streamlit release watcher via reusable build workflow
  ([`9fca961`](https://github.com/lperezmo/st-custom-static/commit/9fca9619968542377ec8ee850efd85f2bc293059))

Extract the build matrix into a reusable workflow_call (build-matrix.yml) so both the manual entry
  point and the new watcher share one build core. build-release.yml becomes a thin dispatch wrapper.
  watch-streamlit.yml polls the latest stable Streamlit release daily and builds all 13 icons for
  any version not yet released here, calling the reusable workflow directly so it sidesteps the
  GITHUB_TOKEN no-retrigger rule.

- Add dockerfile for self-hosted demo (bakes custom icon at build time)
  ([`a02df92`](https://github.com/lperezmo/st-custom-static/commit/a02df9246c5aff4d1c759908409202a054bd0e53))

- Add Hugging Face Space demo badge
  ([`5b1cd17`](https://github.com/lperezmo/st-custom-static/commit/5b1cd176be51c630b5e26dca45857a8ed2717b20))

- Disable poetry package mode for demo app
  ([`9f92108`](https://github.com/lperezmo/st-custom-static/commit/9f92108f922b850de59f6f1b7c3ca82e1410b4ac))

- Fix st_custom_static import for hot-reloads, add streamlit badge
  ([`c58d377`](https://github.com/lperezmo/st-custom-static/commit/c58d377615c7fde529d41b798e3d94873266a6f6))

- Full dark/light theme config, drop Streamlit badge, fix gradient colors
  ([`f18a796`](https://github.com/lperezmo/st-custom-static/commit/f18a7965d0d15fe1a5cea0e4899589bea331dd07))

- Install custom icon at startup on streamlit cloud
  ([`3e1c944`](https://github.com/lperezmo/st-custom-static/commit/3e1c944f084186322fb8afabd5ab23d1ce1d1347))

- Lead install docs with uv, pip as fallback
  ([`000c248`](https://github.com/lperezmo/st-custom-static/commit/000c248e2d2312f9cab555778be26b927837c382))

- Move Dockerfile into demo/, switch to uv, update app styling
  ([`2f15da4`](https://github.com/lperezmo/st-custom-static/commit/2f15da4830d8cc58fe4d260b06095a7b0f3b1b3d))

- Demo is now self-contained under demo/ with its own Dockerfile and pyproject.toml - Switched from
  pip to uv for faster, reproducible installs - Updated app.py with gradient header, no st.title,
  width="stretch" - docker-compose.yml updated to build from demo/

- Move reload button to main area for mobile visibility
  ([`5dfb0d5`](https://github.com/lperezmo/st-custom-static/commit/5dfb0d5ae202773708b159d01c94946dddc528db))

- Revert demo icon patching, venv is read-only on streamlit cloud
  ([`eee9637`](https://github.com/lperezmo/st-custom-static/commit/eee9637d0e6defb04811765c084ee8123488c8f4))

- Show uv in sidebar install snippet
  ([`a85821b`](https://github.com/lperezmo/st-custom-static/commit/a85821bb1afef27f5caea4d70a45ea0f82939c61))

- **demo**: Bump Streamlit to 1.66.1 and pin Pillow, certifi, urllib3
  ([`0eb13cc`](https://github.com/lperezmo/st-custom-static/commit/0eb13cca3e2f94c44d1467ea93d03b8972d929ac))

Streamlit 1.66.1 is the first release that allows Pillow 13, which fixes the open Pillow advisories.
  Pins certifi and urllib3 to their fixed versions too.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>

- **demo**: Pin starlette>=1.3.1 to clear security advisories
  ([`9af0fb5`](https://github.com/lperezmo/st-custom-static/commit/9af0fb523318a7b4146e796267b3c761ca728962))

Adds an explicit floor on the transitive starlette dependency in the demo to resolve two Dependabot
  alerts pulled in via streamlit==1.57.0:

- GHSA-82w8-qh3p-5jfq / CVE-2026-54283 (high): request.form() limits silently ignored for
  application/x-www-form-urlencoded, enabling DoS. Patched in 1.3.1. - GHSA-jp82-jpqv-5vv3 /
  CVE-2026-54282 (low): unvalidated request path concatenated into authority poisons
  request.url.hostname. Patched in 1.3.0.

starlette>=1.3.1 clears both. Resolution verified with uv pip compile (streamlit==1.57.0 stays,
  starlette==1.3.1).

- **demo**: Update vulnerable dependencies
  ([`f2e1f6a`](https://github.com/lperezmo/st-custom-static/commit/f2e1f6aaeb6421dcb7019867c7854aeb56f62989))


## v1.0.1 (2026-05-03)

### Bug Fixes

- Regenerate italic-h svg previews with correct geometry and animations
  ([`f1c1129`](https://github.com/lperezmo/st-custom-static/commit/f1c112906ecd203f4c3e90057e213d57f62051ef))

Replace broken SVG previews with properly animated versions. Each SVG uses CSS keyframe animations
  matching its TSX counterpart, correct skewX(-12) italic H geometry, and the brand color. Add
  generator script at scripts/generate_preview_svgs.py.

- Resize italic-h svg previews to 24x24 to match other icons
  ([`3477df9`](https://github.com/lperezmo/st-custom-static/commit/3477df9e3580104a7ac375c0eced300cbfe608b8))


## v1.0.0 (2026-05-03)


## v0.1.0 (2026-05-03)

### Bug Fixes

- Handle release race condition in matrix builds
  ([`5d9fa37`](https://github.com/lperezmo/st-custom-static/commit/5d9fa37a1b9a13c408b73b7d98f816e232bbe37b))

### Chores

- Add animated svg previews for italic-h icon variants
  ([`3066adf`](https://github.com/lperezmo/st-custom-static/commit/3066adf871eca4e327d6b638ddfe7fe6462d8d11))

### Continuous Integration

- Replace publish.yml with semantic release, add ruff config
  ([`425125b`](https://github.com/lperezmo/st-custom-static/commit/425125b2f3289618ee72794738be16a0170ea79a))

# CHANGELOG


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

#!/usr/bin/env python3
"""Generate animated SVG previews for the H-variant icons."""

from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "example_animations"
C = "#004F98"

# Match the 24x24 used by all other icon SVGs in this repo
VW, VH = 24, 24
CX, CY = 12, 12

# H geometry: 16px wide, 14px tall, centered in 24x24 with 4px side padding
# Left bar  (x=4-7),  height 14 (y=5-19)
# Right bar (x=17-20), height 14 (y=5-19)
# Mid bar   (x=4-20), height 3  (y=11-14)
LX, LY, LW, LH = 4,  5, 3, 14   # left vertical bar
MX, MY, MW, MH = 4, 11, 16, 3   # horizontal crossbar
RX, RY, RW, RH = 17, 5, 3, 14   # right vertical bar

# Striped / cascade: col_w=4, gap=2 -> 3*4+2*2=16 wide; stripe_h=2, gap=1 -> 5*2+4*1=14 tall
COL_X = [4, 10, 16]
COL_W = 4
STRIPE_Y = [5, 8, 11, 14, 17]
STRIPE_H = 2


def make_svg(defs: str, style: str, body: str) -> str:
    defs_block = f"\n  <defs>{defs}\n  </defs>" if defs.strip() else ""
    style_block = f"\n  <style>{style}\n  </style>" if style.strip() else ""
    return (
        f'<svg width="{VW}" height="{VH}" viewBox="0 0 {VW} {VH}" '
        f'xmlns="http://www.w3.org/2000/svg">'
        f"{defs_block}{style_block}\n"
        f'  <g transform="translate({CX},{CY}) skewX(-12) translate(-{CX},-{CY})">\n'
        f"{body}\n"
        f"  </g>\n"
        f"</svg>"
    )


def italic_h_sweep() -> str:
    # Sheen rects: width=9 (3x bar width of 3), centered on each bar.
    # L/R travel ±9px, M travel ±13px (to cover full 16px crossbar).
    defs = f"""
    <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="white" stop-opacity="0"/>
      <stop offset="50%" stop-color="white" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="cL"><rect x="{LX}" y="{LY}" width="{LW}" height="{LH}"/></clipPath>
    <clipPath id="cM"><rect x="{MX}" y="{MY}" width="{MW}" height="{MH}"/></clipPath>
    <clipPath id="cR"><rect x="{RX}" y="{RY}" width="{RW}" height="{RH}"/></clipPath>"""
    style = """
    @keyframes swpLR { 0%{transform:translateX(-9px)} 50%,100%{transform:translateX(9px)} }
    @keyframes swpM  { 0%{transform:translateX(-13px)} 50%,100%{transform:translateX(13px)} }
    .sL{animation:swpLR 1.5s ease-in-out 0s   infinite}
    .sM{animation:swpM  1.5s ease-in-out 0.2s infinite}
    .sR{animation:swpLR 1.5s ease-in-out 0.4s infinite}"""
    # Sheen rect base positions: centered on each bar (LX+LW/2=5.5 -> x=1, MX+MW/2=12 -> x=8, RX+RW/2=18.5 -> x=14)
    body = (
        f'    <rect x="{LX}" y="{LY}" width="{LW}" height="{LH}" fill="{C}"/>\n'
        f'    <g clip-path="url(#cL)"><rect class="sL" x="1"  y="{LY}" width="9" height="{LH}" fill="url(#sheen)"/></g>\n'
        f'    <rect x="{MX}" y="{MY}" width="{MW}" height="{MH}" fill="{C}"/>\n'
        f'    <g clip-path="url(#cM)"><rect class="sM" x="8"  y="{MY}" width="9" height="{MH}" fill="url(#sheen)"/></g>\n'
        f'    <rect x="{RX}" y="{RY}" width="{RW}" height="{RH}" fill="{C}"/>\n'
        f'    <g clip-path="url(#cR)"><rect class="sR" x="14" y="{RY}" width="9" height="{RH}" fill="url(#sheen)"/></g>'
    )
    return make_svg(defs, style, body)


def italic_h_striped() -> str:
    style = """
    @keyframes reveal{0%,100%{opacity:.25}50%{opacity:1}}
    .c0{animation:reveal 1.6s ease-in-out 0s   infinite}
    .c1{animation:reveal 1.6s ease-in-out 0.2s infinite}
    .c2{animation:reveal 1.6s ease-in-out 0.4s infinite}"""
    rows = []
    for ci, cx in enumerate(COL_X):
        for sy in STRIPE_Y:
            rows.append(
                f'    <rect class="c{ci}" x="{cx}" y="{sy}" '
                f'width="{COL_W}" height="{STRIPE_H}" rx="2" fill="{C}"/>'
            )
    return make_svg("", style, "\n".join(rows))


def italic_h_wave() -> str:
    bottom = LY + LH  # 32
    style = f"""
    @keyframes fillUp{{0%,100%{{height:0px;y:{bottom}px}}50%{{height:{LH}px;y:{LY}px}}}}
    @keyframes fillRt{{0%,100%{{width:0px}}50%{{width:{MW}px}}}}
    .fL{{animation:fillUp 1.4s ease-in-out 0s   infinite}}
    .fM{{animation:fillRt 1.4s ease-in-out 0.3s infinite}}
    .fR{{animation:fillUp 1.4s ease-in-out 0.6s infinite}}"""
    body = (
        f'    <rect x="{LX}" y="{LY}" width="{LW}" height="{LH}" fill="{C}" opacity="0.25"/>\n'
        f'    <rect x="{MX}" y="{MY}" width="{MW}" height="{MH}" fill="{C}" opacity="0.25"/>\n'
        f'    <rect x="{RX}" y="{RY}" width="{RW}" height="{RH}" fill="{C}" opacity="0.25"/>\n'
        f'    <rect class="fL" x="{LX}" y="{bottom}" width="{LW}" height="0" fill="{C}"/>\n'
        f'    <rect class="fM" x="{MX}" y="{MY}"      width="0"    height="{MH}" fill="{C}"/>\n'
        f'    <rect class="fR" x="{RX}" y="{bottom}"  width="{RW}" height="0" fill="{C}"/>'
    )
    return make_svg("", style, body)


def italic_h_scan() -> str:
    scan_h = 4
    end_y = LY + LH - scan_h  # 28
    style = f"""
    @keyframes scan{{0%,100%{{y:{LY}px}}50%{{y:{end_y}px}}}}
    .sc{{animation:scan 1.2s ease-in-out infinite}}"""
    body = (
        f'    <rect x="{LX}" y="{LY}" width="{LW}" height="{LH}" fill="{C}" opacity="0.3"/>\n'
        f'    <rect x="{MX}" y="{MY}" width="{MW}" height="{MH}" fill="{C}" opacity="0.3"/>\n'
        f'    <rect x="{RX}" y="{RY}" width="{RW}" height="{RH}" fill="{C}" opacity="0.3"/>\n'
        f'    <rect class="sc" x="{LX}" y="{LY}" width="{MW}" height="{scan_h}" fill="{C}"/>'
    )
    return make_svg("", style, body)


def italic_h_sequential() -> str:
    style = """
    @keyframes seqFade{0%,25%,100%{opacity:.2}12.5%{opacity:1}}
    .bL{animation:seqFade 1.8s ease-in-out 0s   infinite}
    .bM{animation:seqFade 1.8s ease-in-out 0.3s infinite}
    .bR{animation:seqFade 1.8s ease-in-out 0.6s infinite}"""
    body = (
        f'    <rect class="bL" x="{LX}" y="{LY}" width="{LW}" height="{LH}" fill="{C}"/>\n'
        f'    <rect class="bM" x="{MX}" y="{MY}" width="{MW}" height="{MH}" fill="{C}"/>\n'
        f'    <rect class="bR" x="{RX}" y="{RY}" width="{RW}" height="{RH}" fill="{C}"/>'
    )
    return make_svg("", style, body)


def italic_h_cascade() -> str:
    delays = [
        [0, 0.08, 0.16, 0.24, 0.32],
        [0.4, 0.48, 0.56, 0.64, 0.72],
        [0.8, 0.88, 0.96, 1.04, 1.12],
    ]
    style = """
    @keyframes cascH{0%,20%,100%{opacity:.2}10%{opacity:1}}
    .cs{opacity:.2;animation:cascH 2s ease-in-out infinite}"""
    rows = []
    for cx, col_delays in zip(COL_X, delays):
        for sy, delay in zip(STRIPE_Y, col_delays):
            rows.append(
                f'    <rect class="cs" style="animation-delay:{delay}s" '
                f'x="{cx}" y="{sy}" width="{COL_W}" height="{STRIPE_H}" rx="2" fill="{C}"/>'
            )
    return make_svg("", style, "\n".join(rows))


ICONS = {
    "italic-h-sweep": italic_h_sweep,
    "italic-h-striped": italic_h_striped,
    "italic-h-wave": italic_h_wave,
    "italic-h-scan": italic_h_scan,
    "italic-h-sequential": italic_h_sequential,
    "italic-h-cascade": italic_h_cascade,
}

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for name, fn in ICONS.items():
        path = OUT / f"{name}.svg"
        path.write_text(fn(), encoding="utf-8")
        print(f"  wrote {path.name}")
    print(f"Done. {len(ICONS)} SVGs in {OUT}")

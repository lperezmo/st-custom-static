#!/usr/bin/env python3
import argparse
import importlib.util
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import zipfile
from pathlib import Path
from typing import Optional

GITHUB_REPO = "lperezmo/st-custom-static"
ICONS = [
    "italic-h-sweep",
    "italic-h-striped",
    "italic-h-wave",
    "italic-h-scan",
    "italic-h-sequential",
    "italic-h-cascade",
    "three-dots",
    "bar-chart",
    "progress-ring",
    "spinning-sync",
    "pulsing-dot",
    "rotating-gear",
    "hourglass",
]


def get_streamlit_static_dir() -> Path:
    spec = importlib.util.find_spec("streamlit")
    if not spec or not spec.origin:
        sys.exit("Streamlit is not installed in this environment.")
    static_dir = Path(spec.origin).parent / "static"
    if not static_dir.exists():
        sys.exit(f"Streamlit static folder not found at: {static_dir}")
    return static_dir


def get_streamlit_version() -> str:
    result = subprocess.run(
        [sys.executable, "-c", "import streamlit; print(streamlit.__version__)"],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout.strip()


def download_zip(repo: str, tag: str, zip_filename: str, dest: Path) -> None:
    url = f"https://github.com/{repo}/releases/download/{tag}/{zip_filename}"
    print(f"Downloading {url}")
    try:
        urllib.request.urlretrieve(url, dest)
    except Exception as exc:
        sys.exit(
            f"Download failed: {exc}\n"
            f"Check that the release exists: https://github.com/{repo}/releases/tag/{tag}"
        )


def install(icon: str, version: Optional[str], repo: str) -> None:
    if not version:
        version = get_streamlit_version()
        print(f"Detected Streamlit version: {version}")

    static_dir = get_streamlit_static_dir()
    print(f"Streamlit static folder: {static_dir}")

    tag = f"v{version}-{icon}"
    zip_name = f"streamlit-{version}-{icon}.zip"

    with tempfile.TemporaryDirectory() as tmp:
        tmp_zip = Path(tmp) / zip_name
        download_zip(repo, tag, zip_name, tmp_zip)

        backup_dir = static_dir.parent / "static.original"
        if not backup_dir.exists():
            print(f"Backing up original static folder -> {backup_dir.name}")
            shutil.copytree(static_dir, backup_dir)

        extract_dir = Path(tmp) / "extracted"
        with zipfile.ZipFile(tmp_zip, "r") as zf:
            zf.extractall(extract_dir)

        extracted_static = extract_dir / "static"
        if not extracted_static.exists():
            sys.exit("Zip does not contain a top-level 'static/' folder.")

        shutil.rmtree(static_dir)
        shutil.copytree(extracted_static, static_dir)

    print(f"Done. Installed '{icon}' for Streamlit {version}.")
    print("Restart any running Streamlit apps to apply the change.")


def restore() -> None:
    static_dir = get_streamlit_static_dir()
    backup_dir = static_dir.parent / "static.original"
    if not backup_dir.exists():
        sys.exit("No backup found (static.original). Nothing to restore.")
    print(f"Restoring from {backup_dir.name}...")
    shutil.rmtree(static_dir)
    shutil.copytree(backup_dir, static_dir)
    shutil.rmtree(backup_dir)
    print("Restored original Streamlit static files.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Install custom Streamlit loading icons from GitHub releases."
    )
    parser.add_argument(
        "--icon",
        default="italic-h-sweep",
        choices=ICONS,
        help="Icon animation to install (default: italic-h-sweep)",
    )
    parser.add_argument(
        "--version",
        default=None,
        help="Streamlit version string (auto-detected from environment if omitted)",
    )
    parser.add_argument(
        "--repo",
        default=GITHUB_REPO,
        help="GitHub repo in owner/name format",
    )
    parser.add_argument(
        "--restore",
        action="store_true",
        help="Restore original Streamlit static files from backup",
    )
    args = parser.parse_args()

    if args.restore:
        restore()
    else:
        install(args.icon, args.version, args.repo)


if __name__ == "__main__":
    main()

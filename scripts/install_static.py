#!/usr/bin/env python3
"""
Install custom Streamlit static files from GitHub releases.

Usage:
    python scripts/install_static.py --icon italic-h-sweep
    python scripts/install_static.py --icon italic-h-sweep --version 1.57.0
    python scripts/install_static.py --restore
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from st_custom_static.install import main

if __name__ == "__main__":
    main()

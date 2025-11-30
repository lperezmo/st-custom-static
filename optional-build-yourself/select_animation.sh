#!/bin/bash
# Select a professional loading animation style
# Usage: ./select_animation.sh [1-7]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STREAMLIT_DIR="$SCRIPT_DIR/streamlit"
STATUS_WIDGET_DIR="$STREAMLIT_DIR/frontend/app/src/components/StatusWidget"

show_options() {
    echo ""
    echo "Available loading animation styles:"
    echo ""
    echo "  1) Spinning Sync     - Clean rotating arrows (universally understood)"
    echo "  2) Pulsing Dot       - Minimal, modern single dot"
    echo "  3) Three Dots        - Classic bouncing dots"
    echo "  4) Bar Chart         - Animated bars (data-themed, fits Streamlit)"
    echo "  5) Rotating Gear     - Industrial feel (good for production/ops)"
    echo "  6) Hourglass         - Flipping hourglass (elegant, time-based)"
    echo "  7) Progress Ring     - Circular spinner (modern SaaS style)"
    echo ""
}

if [ -z "$1" ]; then
    show_options
    read -p "Select animation style (1-7): " CHOICE
else
    CHOICE="$1"
fi

if ! [[ "$CHOICE" =~ ^[1-7]$ ]]; then
    echo "Invalid choice. Please select 1-7."
    exit 1
fi

# Check streamlit dir exists
if [ ! -d "$STATUS_WIDGET_DIR" ]; then
    echo "Error: Streamlit not cloned yet. Run ./build_streamlit.sh clone first."
    exit 1
fi

echo "Applying animation style $CHOICE..."

case $CHOICE in
    1)
        # Spinning Sync
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Spinning Sync
 */
import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const SpinningIcon = styled.span<{ color: string }>`
  font-family: "Material Symbols Rounded";
  font-size: 16px;
  color: ${props => props.color};
  animation: spin 1s linear infinite;
  display: inline-block;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  return <SpinningIcon color={theme.colors.fadedText60}>sync</SpinningIcon>
}

export default IconRunning
EOF
        echo "Applied: Spinning Sync"
        ;;
    2)
        # Pulsing Dot
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Pulsing Dot
 */
import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const PulsingDot = styled.span<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: inline-block;
  animation: pulse 1.2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1); }
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  return <PulsingDot color={theme.colors.primary} />
}

export default IconRunning
EOF
        echo "Applied: Pulsing Dot"
        ;;
    3)
        # Three Dots
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Three Dots
 */
import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const DotsContainer = styled.span`
  display: inline-flex;
  gap: 3px;
  align-items: center;
`

const Dot = styled.span<{ color: string; delay: number }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => props.color};
  animation: bounce 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-4px); opacity: 1; }
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.fadedText60
  return (
    <DotsContainer>
      <Dot color={color} delay={0} />
      <Dot color={color} delay={0.16} />
      <Dot color={color} delay={0.32} />
    </DotsContainer>
  )
}

export default IconRunning
EOF
        echo "Applied: Three Dots"
        ;;
    4)
        # Bar Chart
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Animated Bar Chart
 */
import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const BarsContainer = styled.span`
  display: inline-flex;
  gap: 2px;
  align-items: flex-end;
  height: 14px;
`

const Bar = styled.span<{ color: string; delay: number }>`
  width: 3px;
  background-color: ${props => props.color};
  border-radius: 1px;
  animation: barPulse 1s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes barPulse {
    0%, 100% { height: 4px; }
    50% { height: 14px; }
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.fadedText60
  return (
    <BarsContainer>
      <Bar color={color} delay={0} />
      <Bar color={color} delay={0.15} />
      <Bar color={color} delay={0.3} />
      <Bar color={color} delay={0.45} />
    </BarsContainer>
  )
}

export default IconRunning
EOF
        echo "Applied: Bar Chart"
        ;;
    5)
        # Rotating Gear
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Rotating Gear
 */
import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const RotatingIcon = styled.span<{ color: string }>`
  font-family: "Material Symbols Rounded";
  font-size: 16px;
  color: ${props => props.color};
  animation: rotate 2s linear infinite;
  display: inline-block;
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  return <RotatingIcon color={theme.colors.fadedText60}>settings</RotatingIcon>
}

export default IconRunning
EOF
        echo "Applied: Rotating Gear"
        ;;
    6)
        # Hourglass
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Hourglass Flip
 */
import React, { useState, useEffect } from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const HourglassIcon = styled.span<{ color: string }>`
  font-family: "Material Symbols Rounded";
  font-size: 16px;
  color: ${props => props.color};
  display: inline-block;
`

const icons = ["hourglass_top", "hourglass_bottom"]

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % icons.length)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <HourglassIcon color={theme.colors.fadedText60}>
      {icons[index]}
    </HourglassIcon>
  )
}

export default IconRunning
EOF
        echo "Applied: Hourglass Flip"
        ;;
    7)
        # Progress Ring
        cat > "$STATUS_WIDGET_DIR/IconRunning.tsx" << 'EOF'
/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 * Custom loading animation: Circular Progress Ring
 */
import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const Ring = styled.svg`
  width: 14px;
  height: 14px;
  animation: rotate 1.4s linear infinite;
  
  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
`

const Circle = styled.circle<{ color: string }>`
  fill: none;
  stroke: ${props => props.color};
  stroke-width: 2;
  stroke-dasharray: 28;
  stroke-dashoffset: 20;
  stroke-linecap: round;
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  return (
    <Ring viewBox="0 0 14 14">
      <Circle color={theme.colors.fadedText60} cx="7" cy="7" r="5" />
    </Ring>
  )
}

export default IconRunning
EOF
        echo "Applied: Progress Ring"
        ;;
esac

echo ""
echo "Now rebuild with: ./build_streamlit.sh rebuild"

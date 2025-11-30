/**
 * Custom IconRunning component - Professional loading animations
 * Replace streamlit/frontend/app/src/components/StatusWidget/IconRunning.tsx with one of these
 */

// =============================================================================
// OPTION 1: Spinning Sync Icon (clean, universally understood)
// =============================================================================
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


// =============================================================================
// OPTION 2: Pulsing Dot (minimal, modern)
// =============================================================================
/*
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
*/


// =============================================================================
// OPTION 3: Three Dots Loading (classic, professional)
// =============================================================================
/*
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
*/


// =============================================================================
// OPTION 4: Animated Bar Chart (data-themed, fits Streamlit's purpose)
// =============================================================================
/*
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
*/


// =============================================================================
// OPTION 5: Rotating Gear (industrial, good for production/ops context)
// =============================================================================
/*
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
*/


// =============================================================================
// OPTION 6: Hourglass Flip (time-based, elegant)
// =============================================================================
/*
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
*/


// =============================================================================
// OPTION 7: Circular Progress Ring (modern SaaS style)
// =============================================================================
/*
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
*/

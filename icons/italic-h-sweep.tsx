import React from "react"
import { keyframes } from "@emotion/react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const sweepLeft = keyframes`
  0% { left: -100%; }
  50%, 100% { left: 200%; }
`

const sweepPseudo = `
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
`

const HWrapper = styled.span`
  display: inline-block;
  width: 18px;
  height: 14px;
  position: relative;
  transform: skewX(-12deg);
`

interface BarProps {
  barColor: string
}

const LeftBar = styled.span<BarProps>`
  position: absolute;
  background: ${(p) => p.barColor};
  overflow: hidden;
  width: 3px;
  height: 100%;
  left: 0;

  &::after {
    ${sweepPseudo}
    animation: ${sweepLeft} 1.5s ease-in-out 0s infinite;
  }
`

const MidBar = styled.span<BarProps>`
  position: absolute;
  background: ${(p) => p.barColor};
  overflow: hidden;
  width: 100%;
  height: 3px;
  top: 50%;
  transform: translateY(-50%);

  &::after {
    ${sweepPseudo}
    animation: ${sweepLeft} 1.5s ease-in-out 0.2s infinite;
  }
`

const RightBar = styled.span<BarProps>`
  position: absolute;
  background: ${(p) => p.barColor};
  overflow: hidden;
  width: 3px;
  height: 100%;
  right: 0;

  &::after {
    ${sweepPseudo}
    animation: ${sweepLeft} 1.5s ease-in-out 0.4s infinite;
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.primary

  return (
    <HWrapper>
      <LeftBar barColor={color} />
      <MidBar barColor={color} />
      <RightBar barColor={color} />
    </HWrapper>
  )
}

export default IconRunning

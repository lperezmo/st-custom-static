import React from "react"
import { keyframes } from "@emotion/react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const fillUp = keyframes`
  0%, 100% { height: 0%; }
  50% { height: 100%; }
`

const fillRight = keyframes`
  0%, 100% { width: 0%; }
  50% { width: 100%; }
`

const HWrapper = styled.span`
  display: inline-block;
  width: 18px;
  height: 14px;
  position: relative;
  transform: skewX(-12deg);
`

interface BarProps {
  color: string
  dimColor: string
}

const LeftBar = styled.span<BarProps>`
  position: absolute;
  background: ${(p) => p.dimColor};
  overflow: hidden;
  width: 3px;
  height: 100%;
  left: 0;

  &::before {
    content: "";
    position: absolute;
    background: ${(p) => p.color};
    width: 100%;
    bottom: 0;
    left: 0;
    animation: ${fillUp} 1.4s ease-in-out 0s infinite;
  }
`

const MidBar = styled.span<BarProps>`
  position: absolute;
  background: ${(p) => p.dimColor};
  overflow: hidden;
  width: 100%;
  height: 3px;
  top: 50%;
  transform: translateY(-50%);

  &::before {
    content: "";
    position: absolute;
    background: ${(p) => p.color};
    height: 100%;
    top: 0;
    left: 0;
    animation: ${fillRight} 1.4s ease-in-out 0.3s infinite;
  }
`

const RightBar = styled.span<BarProps>`
  position: absolute;
  background: ${(p) => p.dimColor};
  overflow: hidden;
  width: 3px;
  height: 100%;
  right: 0;

  &::before {
    content: "";
    position: absolute;
    background: ${(p) => p.color};
    width: 100%;
    bottom: 0;
    left: 0;
    animation: ${fillUp} 1.4s ease-in-out 0.6s infinite;
  }
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.primary
  const dimColor = theme.colors.fadedText60

  return (
    <HWrapper>
      <LeftBar color={color} dimColor={dimColor} />
      <MidBar color={color} dimColor={dimColor} />
      <RightBar color={color} dimColor={dimColor} />
    </HWrapper>
  )
}

export default IconRunning

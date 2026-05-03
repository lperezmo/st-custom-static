import React from "react"
import { keyframes } from "@emotion/react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const scan = keyframes`
  0%, 100% { top: 0; }
  50% { top: 12px; }
`

const HWrapper = styled.span`
  display: inline-block;
  width: 18px;
  height: 14px;
  position: relative;
  transform: skewX(-12deg);
`

const LeftBar = styled.span<{ color: string }>`
  position: absolute;
  background: ${(p) => p.color};
  opacity: 0.3;
  width: 3px;
  height: 100%;
  left: 0;
`

const MidBar = styled.span<{ color: string }>`
  position: absolute;
  background: ${(p) => p.color};
  opacity: 0.3;
  width: 100%;
  height: 3px;
  top: 50%;
  transform: translateY(-50%);
`

const RightBar = styled.span<{ color: string }>`
  position: absolute;
  background: ${(p) => p.color};
  opacity: 0.3;
  width: 3px;
  height: 100%;
  right: 0;
`

const Scanner = styled.span<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 2px;
  background: ${(p) => p.color};
  box-shadow: 0 0 4px ${(p) => p.color};
  animation: ${scan} 1.2s ease-in-out infinite;
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.primary

  return (
    <HWrapper>
      <LeftBar color={color} />
      <MidBar color={color} />
      <RightBar color={color} />
      <Scanner color={color} />
    </HWrapper>
  )
}

export default IconRunning

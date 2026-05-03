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
  stroke: ${(props) => props.color};
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

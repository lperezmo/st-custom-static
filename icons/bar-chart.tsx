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
  background-color: ${(props) => props.color};
  border-radius: 1px;
  animation: barPulse 1s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

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

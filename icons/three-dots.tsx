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
  background-color: ${(props) => props.color};
  animation: bounce 1.4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

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

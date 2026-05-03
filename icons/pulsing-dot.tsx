import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const PulsingDot = styled.span<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
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

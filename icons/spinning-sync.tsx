import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const SpinningIcon = styled.span<{ color: string }>`
  font-family: "Material Symbols Rounded";
  font-size: 16px;
  color: ${(props) => props.color};
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

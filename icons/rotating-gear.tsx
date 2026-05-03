import React from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const RotatingIcon = styled.span<{ color: string }>`
  font-family: "Material Symbols Rounded";
  font-size: 16px;
  color: ${(props) => props.color};
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

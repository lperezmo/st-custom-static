import React, { useState, useEffect } from "react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const HourglassIcon = styled.span<{ color: string }>`
  font-family: "Material Symbols Rounded";
  font-size: 16px;
  color: ${(props) => props.color};
  display: inline-block;
`

const ICONS = ["hourglass_top", "hourglass_bottom"]

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ICONS.length)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <HourglassIcon color={theme.colors.fadedText60}>
      {ICONS[index]}
    </HourglassIcon>
  )
}

export default IconRunning

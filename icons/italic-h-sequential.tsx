import React from "react"
import { keyframes } from "@emotion/react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const seqFade = keyframes`
  0%, 25%, 100% { opacity: 0.2; }
  12.5% { opacity: 1; }
`

const HWrapper = styled.span`
  display: inline-block;
  width: 18px;
  height: 14px;
  position: relative;
  transform: skewX(-12deg);
`

const Bar = styled.span<{ color: string; delay: number }>`
  position: absolute;
  background: ${(p) => p.color};
  animation: ${seqFade} 1.8s ease-in-out ${(p) => p.delay}s infinite;
`

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.primary

  return (
    <HWrapper>
      <Bar
        color={color}
        delay={0}
        style={{ width: 3, height: "100%", left: 0 }}
      />
      <Bar
        color={color}
        delay={0.3}
        style={{ width: "100%", height: 3, top: "50%", transform: "translateY(-50%)" }}
      />
      <Bar
        color={color}
        delay={0.6}
        style={{ width: 3, height: "100%", right: 0 }}
      />
    </HWrapper>
  )
}

export default IconRunning

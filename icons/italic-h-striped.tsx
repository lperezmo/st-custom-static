import React from "react"
import { keyframes } from "@emotion/react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const reveal = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
`

const HWrapper = styled.span`
  display: inline-flex;
  gap: 3px;
  height: 14px;
  transform: skewX(-12deg);
`

const Col = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 4px;
`

const Stripe = styled.span<{ color: string; delay: number }>`
  height: 2px;
  background: ${(p) => p.color};
  border-radius: 1px;
  animation: ${reveal} 1.6s ease-in-out ${(p) => p.delay}s infinite;
`

const COL_DELAYS = [0, 0.2, 0.4]

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.primary

  return (
    <HWrapper>
      {COL_DELAYS.map((delay, col) => (
        <Col key={col}>
          {[0, 1, 2, 3, 4].map((row) => (
            <Stripe key={row} color={color} delay={delay} />
          ))}
        </Col>
      ))}
    </HWrapper>
  )
}

export default IconRunning

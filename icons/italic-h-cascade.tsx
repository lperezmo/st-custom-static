import React from "react"
import { keyframes } from "@emotion/react"
import { useTheme } from "@emotion/react"
import { EmotionTheme } from "@streamlit/lib"
import styled from "@emotion/styled"

const cascade = keyframes`
  0%, 20%, 100% { opacity: 0.2; }
  10% { opacity: 1; }
`

const HWrapper = styled.span`
  display: inline-flex;
  gap: 2px;
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
  opacity: 0.2;
  animation: ${cascade} 2s ease-in-out ${(p) => p.delay}s infinite;
`

const DELAYS: number[][] = [
  [0, 0.08, 0.16, 0.24, 0.32],
  [0.4, 0.48, 0.56, 0.64, 0.72],
  [0.8, 0.88, 0.96, 1.04, 1.12],
]

const IconRunning: React.FC = () => {
  const theme = useTheme() as EmotionTheme
  const color = theme.colors.primary

  return (
    <HWrapper>
      {DELAYS.map((colDelays, col) => (
        <Col key={col}>
          {colDelays.map((delay, row) => (
            <Stripe key={row} color={color} delay={delay} />
          ))}
        </Col>
      ))}
    </HWrapper>
  )
}

export default IconRunning

import { Button as MuiButton, ButtonProps } from '@mui/material'
import React from 'react'

const BUTTON_COLORS: Record<'BROWN' | 'GREEN' | 'WHITE' | 'LIGHT_GREEN', React.CSSProperties | undefined> = {
  BROWN: {
    background: 'var(--brown)',
    color: 'var(--white)'
  },
  GREEN: {
    background: 'var(--green-dark)',
    color: 'var(--white)',
  },
  WHITE: {
    background: 'var(--white)',
    color: 'var(--green-dark)',
  },
  LIGHT_GREEN: {
    background: 'inherit',
    color: 'var(--white)',
    borderColor: 'var(--white)'
  }
}

const Button = ({ btnType, ...props }: ButtonProps & { btnType: keyof typeof BUTTON_COLORS }) => {
  return (
    <MuiButton
      {...props}
      variant={props.variant || 'contained'}
      style={{
        ...BUTTON_COLORS[btnType],
        ...props.style,
        borderRadius: 10,
        textTransform: 'none'
      }} />
  )
}

export default Button
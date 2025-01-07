import styled from '@emotion/styled';
import { TextField, TextFieldProps } from '@mui/material'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--green-dark)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--green)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--green)',
    },
  },
});

const Input = (props: TextFieldProps & { borderColor?: string }) => {
  return (
    <CssTextField {...props} />
  )
}

export default Input
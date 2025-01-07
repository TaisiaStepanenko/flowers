import { MenuItem, Select, styled } from "@mui/material";

export const StyledSelect = styled(Select)({
  '& fieldset': {
      borderColor: 'var(--green-dark) !important',
    },
  '&:hover fieldset': {
      borderColor: 'var(--green) !important',
    },
  '&.Mui-focused fieldset': {
      borderColor: 'var(--green) !important',
    },
});

export const StyledMenuItem = styled(MenuItem)({
  '&.Mui-selected': {
    background: 'var(--green)',
  }
})
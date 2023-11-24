import React from 'react'
import Button from '@mui/material/Button';

function MudraButton({children,...props}) {
  return (
    <Button {...props} >{children}</Button>
  )
}

export default MudraButton
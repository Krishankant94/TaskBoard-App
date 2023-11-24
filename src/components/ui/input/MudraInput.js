import React from 'react'
import TextField from '@mui/material/TextField';

function MudraInput({...props}) {
  return (
    <TextField {...props} variant="standard" />
  )
}

export default MudraInput
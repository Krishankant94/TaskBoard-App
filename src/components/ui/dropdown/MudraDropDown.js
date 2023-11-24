import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React from 'react'



function MudraDropDown({menuItems,...props}) {
  return <TextField
  {...props}
  select
>
  {menuItems.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>
}

export default MudraDropDown
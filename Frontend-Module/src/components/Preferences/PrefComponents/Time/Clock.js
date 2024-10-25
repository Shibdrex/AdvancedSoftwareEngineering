import * as React from 'react';
import 'react-time-picker/dist/TimePicker.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button } from '@mui/material';

function Clock(){
    return (
      <div className='content'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label="Basic time picker" />
            </DemoContainer>
        </LocalizationProvider>
         <Button variant="contained" color="secondary">
            + Hinzufügen
          </Button>
      </div>
    );
}

export default Clock;

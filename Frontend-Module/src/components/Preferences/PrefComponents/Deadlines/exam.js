import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from '@mui/material';
import { Input } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

function Exam({ tasks, setTasks }) {
  const [selectedDate, setDate] = useState(null);
  const [examName, setExamName] = useState('');

  const handleAddExam = () => {
    if (selectedDate && examName) {
      const formattedDate = selectedDate.toLocaleDateString("de-DE"); // Format für deutsches Datum
      const newTask = { name: examName, date: formattedDate };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setDate(null);
      setExamName('');
    }
  };

  return (
    <div style={{ gap: '25px' }}>
         <div className="flex-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="flex-container" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Input
        onChange={(e) => setExamName(e.target.value)}
         sx={{
          background: 'white',
          width: '220px',
          borderRadius: '5px',
          padding: '10px 16px', // Innenabstand oben/unten verringern
          border: 'none', // keinen Rahmen
          outline: 'none',
          borderBottom: '2px solid #007bff', // Kurzer blauer Rahmen als Unterstreichung
          transition: 'border-bottom 0.2s',
          '&:focus': {
              outline: 'none',
              borderBottom: '2px solid #0056b3', // Dunklerer blauer Rahmen beim Fokus
          },
        }}
      />
      <DatePicker
        selected={selectedDate}
        onChange={(newValue) => setDate(newValue)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Datum auswählen"
      />
      <Button
        variant="contained"
        color="secondary"
        style={{ width: '300px', marginTop: '10px' }}
        onClick={handleAddExam}
      >
        + Hinzufügen
      </Button>
    </div>
    </div>
    </div>
  );
}

export default Exam;

import { Button } from '@mui/material';

function ExamList({ tasks, handleRemoveTask }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <div className="list" key={index}>
          {task.name} - {task.date}
          <Button
            variant="outlined"
            color="secondary"
            id="removeButton"
            onClick={() => handleRemoveTask(index)}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ExamList;

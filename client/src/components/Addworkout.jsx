import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";


const Card = styled.div`
flex: 1;
min-width: 200px;
padding: 24px;
border: 1px solid ${({theme}) => theme.text_primary + 20};
border-radius: 14px;
box-shadow: 0px 6px 20px 0px ${({theme}) => theme.text_primary + 10};
display: flex;
@media (max-width: 600px) {
  padding: 16px;   
};
flex-direction: column;
gap: 6px;
`;
const Title = styled.div`
font-weight: 600;
font-size: 16px;
color: ${({theme}) => theme.primary};
@media (max-width: 600px) {
  font-size: 14px;
}
`;

// New styled components for the button row
const QuickAddRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 12px 0;
`;

const QuickButton = styled.button`
  background: ${({ theme }) => theme.primary + 20};
  border: 1px solid ${({ theme }) => theme.primary + 40};
  color: ${({ theme }) => theme.primary};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + 40};
  }
`;

const AddWorkOut = ({ workout, buttonLoading, addNewWorkout, setWorkout }) => {
  // Templates for quick add
 const templates = {
  'weight lifting': `#weight_lifting
weight of dimar
1 set
1 rep
0 kg
30 min`,

  'push ups': `#push ups
Push Ups
1 set
25 reps
0 kg
45 min`,

  Running: `#Running
Running
1 set
1 rep
0 kg
30 min`,

  Cycling: `#Cycling
Cycling
1 set
1 rep
0 kg
45 min`,

  Swimming: `#Swimming
Swimming
1 set
1 rep
0 kg
40 min`,

  'Back Squat': `#Back Squat
Back Squat
5 sets
6 reps
60 kg
20 min`,

  'legs excersice': `#legs excersice
Legs Exercise
5 sets
6 reps
60 kg
20 min`,

  'Bench Press': `#Bench Press
Bench Press
4 sets
8 reps
50 kg
15 min`,

  'other workout': `#Additional workout
Other Workout
1 set
1 rep
0 kg
0 min`,
};

  const handleQuickAdd = (key) => {
    setWorkout(templates[key]);
  };

  return (
    <Card>
      <Title>Add new workout</Title>

      <TextInput
        label="Workout details"
        textArea
        rows={10}
        placeholder={`Enter one item per line:
#Category
Workout Name
Sets (e.g., 5 sets)
Reps (e.g., 6 reps)
Weight (e.g., 30 kg)
Duration (e.g., 10 min)`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />

      {/* Quick‑add buttons */}
      <QuickAddRow>
        {Object.keys(templates).map((key) => (
          <QuickButton key={key} onClick={() => handleQuickAdd(key)}>
            {key}
          </QuickButton>
        ))}
      </QuickAddRow>

      <Button
        text="Add Workout"
        small
        onClick={addNewWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkOut;
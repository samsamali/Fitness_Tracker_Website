import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/Card/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { getWorkouts } from "../Api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  padding: 0px 16px;
  gap: 22px;

  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.3;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 0px 6px 20px 0px ${({ theme }) => theme.text_primary + 10};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Right = styled.div`
  flex: 1;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 100px;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Workouts = () => {
  // 🔥 Store date as ISO string (BEST PRACTICE)
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = async () => {
  setLoading(true);
  try {
    // Send local date in YYYY-MM-DD format
    const localDate = selectedDate.format('YYYY-MM-DD');
    const res = await getWorkouts(localDate);
    setWorkouts(res?.data?.todaysWorkouts || []);
  } catch (err) {
    console.error("Fetch Error:", err);
    setWorkouts([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchWorkouts();
  }, [selectedDate]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Workouts</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => {
                if (newValue) {
                  setSelectedDate(newValue);
                }
              }}
            />
          </LocalizationProvider>
        </Left>

        <Right>
          <Section>
            <SecTitle>
              Workouts for {selectedDate.format("MMMM DD, YYYY")}
            </SecTitle>

            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {workouts.length > 0 ? (
                  workouts.map((workout) => (
                    <WorkoutCard workout={workout} key={workout._id} />
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "grey",
                    }}
                  >
                    No workouts found for this date.
                  </div>
                )}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
import React, { useEffect, useState } from "react";
import { getDashboardDetails, getWorkouts, addWorkout } from "../Api";
import CountsCard from "../components/Card/CountsCard";
import WeeklyStatCard from "../components/Card/Weeklystat";
import CategoryChart from "../components/Card/CategoryChart";
import AddWorkOut from "../components/Addworkout";
import WorkoutCard from "../components/Card/WorkoutCard";
import styled from "styled-components";
import { counts } from "../utils/data";

const Container = styled.div`flex: 1; height: 100%; padding: 22px 0; overflow-y: scroll; display: flex; justify-content: center;`;
const Wrapper = styled.div`flex:1; max-width: 1400px; display: flex; flex-direction: column; gap: 22px;`;
const Title = styled.div`padding: 0 16px; font-size: 22px; font-weight: 500; color: ${({theme}) => theme.text_primary};`;
const FlexWrap = styled.div`display: flex; flex-wrap: wrap; gap: 22px; padding: 0 16px; justify-content: space-between;`;
const Section = styled.div`display: flex; flex-direction: column; padding: 0 16px; gap: 22px;`;
const CardWrapper = styled.div`display: flex; flex-wrap: wrap; gap: 22px; justify-content: center; margin-bottom: 100px;`;

const Dashboard = () => {
  const [data, setData] = useState({});
  const [todayWorkouts, setTodayWorkouts] = useState([]);
const [workout, setWorkout] = useState(`#Back Squat\n5 sets\n6 reps\n30 kg\n10 min`);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await getDashboardDetails();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const fetchTodaysWorkout = async () => {
  setLoading(true);
  try {
    const today = new Date().toLocaleDateString('en-CA');
    const res = await getWorkouts(today);
    setTodayWorkouts(res.data.todaysWorkouts || []);
  } catch (err) { console.error(err); } 
  finally { setLoading(false); }
};

 const addNewWorkout = async () => {
  setButtonLoading(true);
  try {
    // Get today's local date in YYYY-MM-DD
    const today = new Date();
    const localDate = today.toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD
    await addWorkout({ workoutString: workout, date: localDate });
    fetchDashboard();
    fetchTodaysWorkout();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to add workout");
  } finally {
    setButtonLoading(false);
  }
};

  useEffect(() => {
    fetchDashboard();
    fetchTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => <CountsCard key={item.key} item={item} data={data} />)}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkOut workout={workout} setWorkout={setWorkout} addNewWorkout={addNewWorkout} buttonLoading={buttonLoading} />
        </FlexWrap>

        <Section>
          <Title>Today's Workouts</Title>
          <CardWrapper>
            {todayWorkouts.map((w, i) => <WorkoutCard key={i} workout={w} />)}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
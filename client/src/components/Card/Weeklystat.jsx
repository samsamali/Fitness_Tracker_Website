import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import styled from "styled-components";

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

const WeeklyStatCard= ({ data }) => {
    return (
        <Card>
            <Title>Weekly Calories Burned</Title>
            {data?.weeklyCalories && ( <BarChart 
            xAxis={[
                {scaleType: "band", data: data?.weeklyCalories?.weeks}
            ]}
            series={[
                {data: data?.weeklyCalories?.caloriesBurned}
            ]}
            height={300}
            />
            )}
        </Card>
    )
}
export default WeeklyStatCard;
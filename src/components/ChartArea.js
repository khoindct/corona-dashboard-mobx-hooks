import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";

const ChartArea = ({ data }) => {
  const series = data.map((el) => el.new_confirmed);

  return (
    // <Chart>
    <Chart style={{ height: "10vw", width: "15vw" }}>
      <ChartValueAxis>
        <ChartValueAxisItem visible={false} />
      </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem type='area' data={series} />
      </ChartSeries>
    </Chart>
  );
};

export default ChartArea;

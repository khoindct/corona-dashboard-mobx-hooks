import React from "react";
import CoronaCasesCard from "../components/CoronaCasesCard";
import "./CoronaStatistic.scss";
import CoronaTotalCard from "../components/CoronaTotalCard";

const CoronaStatistic = () => {
  return (
    <section className='statistic-container'>
      <CoronaTotalCard />
      <CoronaCasesCard />
    </section>
  );
};

export default CoronaStatistic;

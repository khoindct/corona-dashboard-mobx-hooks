import React from "react";
import "./App.scss";
import CoronaMap from "./components/CoronaMap";
import CoronaStatistic from "./components/CoronaStatistic";
import CustomInput from "./components/CustomInput";

function App() {
  return (
    <div className='container'>
      <section className='corona-map'>
        <CoronaMap />
        <CustomInput />
      </section>
      <main className='statistic'>
        <CoronaStatistic />
      </main>
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import "./App.scss";
import CoronaMap from "./components/CoronaMap";
import CoronaStatistic from "./containers/CoronaStatistic";
import CustomInput from "./components/CustomInput";
import { StoreContext } from ".";

function App() {
  const store = useContext(StoreContext);

  return (
    <div className='container'>
      <section className='corona-map'>
        <CoronaMap />
        <div className='corona-map__input'>
          <CustomInput />
          <div className='icon-display' onClick={() => store.setCountry(null)}>
            <ion-icon
              name='close-outline'
              class='corona-map__input-icon'
            ></ion-icon>
          </div>
        </div>
      </section>
      <main className='statistic'>
        <CoronaStatistic />
      </main>
    </div>
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import axios from "axios";
import api from "../api/api";
import { StoreContext } from "..";
import "./CoronaTotalCard.scss";
import ChartArea from "./ChartArea";
import { Loader } from "@progress/kendo-react-indicators";
import moment from "moment";

const CoronaTotalCard = () => {
  const store = useContext(StoreContext);
  const [statistic, setStatistic] = useState();
  const [newCase14, setNewCase14] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res;
      if (store.country) {
        res = await axios.get(
          api.getCountriesDataTimeline + "/" + store.country.CountryCode
        );
      } else {
        res = await axios.get(api.getWorldDataTimeline);
      }
      // const res = await axios.get(api.getWorldDataTimeline);
      const data = await res.data;
      store.country
        ? setStatistic(data.data.timeline)
        : setStatistic(data.data);
    };

    fetchData();
  }, [store.country]);

  useEffect(() => {
    if (statistic) {
      setNewCase14(statistic.slice(0, 14));
    }
  }, [statistic]);

  return useObserver(() =>
    !newCase14.length ? (
      <div className='total-card'>
        <Loader className='total-card__loading' type='infinite-spinner' />
      </div>
    ) : (
      <div className='total-card'>
        <h3 className='total-card__header'>
          {store?.country?.Country || "Worldwide"}
        </h3>
        <div className='total-card__details'>
          <div className='total-card__details--total-cases-title'>
            Total cases
          </div>
          <div className='total-card__details--total-cases-result'>
            {" "}
            {store?.country?.TotalConfirmed?.toLocaleString() ||
              store?.global?.TotalConfirmed?.toLocaleString()}{" "}
          </div>
          <div className='total-card__details--new-cases-title'>New cases</div>
          <div className='total-card__details--new-cases-result'>
            {" "}
            <ChartArea data={newCase14} />{" "}
          </div>
          <div className='total-card__details--new-cases-range'>
            {" "}
            From{" "}
            {moment(
              store.country ? newCase14[13].updated_at : newCase14[13]?.date
            ).format("MMM d, yyyy")}{" "}
            to{" "}
            {moment(
              store.country ? newCase14[13].updated_at : newCase14[0]?.date
            ).format("MMM d, yyyy")}
            : +{""}
            {
              (
                newCase14[0]?.confirmed - newCase14[13]?.confirmed
              ).toLocaleString()
              // newCase14[0].confirmed - newCase14[13].confirmed.toLocaleString()
            }{" "}
          </div>
          <div className='total-card__details--deaths-title'> Deaths </div>
          <div className='total-card__details--deaths-result'>
            {" "}
            {store?.country?.TotalDeaths?.toLocaleString() ||
              store?.global?.TotalDeaths?.toLocaleString()}{" "}
          </div>
        </div>
        <div className='total-card__footer'>
          Source:{" "}
          <small>
            {" "}
            <a href='https://documenter.getpostman.com/view/10808728/SzS8rjbc'>
              {" "}
              Covid-19 Postman{" "}
            </a>{" "}
          </small>{" "}
        </div>
      </div>
    )
  );
};

export default CoronaTotalCard;

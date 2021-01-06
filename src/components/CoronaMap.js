import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import { StoreContext } from "..";
import countryCoors from "../dev-data/countryCoors.json";
import api from "../api/api";
import axios from "axios";
import "./CoronaMap.scss";
import "leaflet/dist/leaflet.css";
import { useObserver } from "mobx-react";
import { toJS } from "mobx";

const CoronaMap = () => {
  const position = countryCoors["vietnam"];
  const store = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      const dataSummary = await axios.get(api.getDataSummary);
      store.global = await { ...dataSummary.data.Global };
      const countries = await dataSummary.data.Countries;
      countries.forEach((country) => {
        const countryObj = { ...country, Coors: countryCoors[country.Slug] };
        store.countries.push(countryObj);
      });
    };

    fetchData();
  }, [store]);

  return useObserver(() =>
    !store.countries ? (
      "Loading"
    ) : (
      <section className='leaflet-container'>
        <MapContainer
          // center={ ? : }
          center={position}
          zoom={4}
          minZoom={3}
          maxZoom={6}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            //   url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            //   url='http://tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg'
            url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERNAME}/${process.env.REACT_APP_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          {store.countries.map((country, index) => {
            return (
              toJS(country.Coors) && (
                <Circle
                  key={index}
                  center={toJS(country.Coors)}
                  pathOptions={{ fillColor: "red", color: "red" }}
                  radius={toJS(country.TotalConfirmed) / 10}
                  eventHandlers={{
                    mouseover: function () {
                      this.openPopup();
                    },
                    mouseout: function () {
                      this.closePopup();
                    },
                    click: function () {
                      store.country = { ...country };
                    },
                  }}
                >
                  <Popup>
                    <div className='infor'>
                      <div className='infor__name'> {country.Country} </div>
                      <div className='infor__details'>
                        <div className='infor__details--cases-title'>
                          Total cases
                        </div>
                        <div className='infor__details--cases-number'>
                          {country.TotalConfirmed.toLocaleString()}
                        </div>
                        <div className='infor__details--deaths-title'>
                          Deaths
                        </div>
                        <div className='infor__details--deaths-number'>
                          {country.TotalDeaths.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Circle>
              )
            );
          })}
        </MapContainer>
      </section>
    )
  );
};

export default CoronaMap;

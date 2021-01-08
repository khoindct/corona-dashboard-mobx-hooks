import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";
import "./CoronaCasesCard.scss";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Loader } from "@progress/kendo-react-indicators";

const CoronaCasesCard = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(api.getCountriesDataTimeline);
      const data = res.data;
      setCountryData(data.data);
    };
    fetchData();
  }, []);

  return !countryData ? (
    <div className='corona-cases'>
      <Loader className='corona-cases__loading' type='infinite-spinner' />
    </div>
  ) : (
    <div className='corona-cases'>
      <div className='corona-cases__header'>Cases</div>
      <div className='corona-cases__details'>
        <Grid style={{ height: "400px" }} data={countryData}>
          <Column field='name' title='Location' />
          <Column field='latest_data.confirmed' title='Total cases' />
          {/* <Column field='Category.CategoryName' title='New cases' /> */}
          <Column field='latest_data.deaths' title='Deaths' />
          {/* <Column
            field='Discontinued'
            cell={(props) => (
              <td>
                <input
                  disabled
                  type='checkbox'
                  checked={props.dataItem[props.field]}
                />
              </td>
            )}
          /> */}
        </Grid>
      </div>
      <div className='corona-cases__footer'>
        Sources:{" "}
        <small>
          {" "}
          <a href='https://about-corona.net/'> About Corona </a>{" "}
        </small>
      </div>
    </div>
  );
};

export default CoronaCasesCard;

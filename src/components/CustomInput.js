import { toJS } from "mobx";
import { useObserver } from "mobx-react";
import React, { useContext } from "react";
import { StoreContext } from "..";
import "./CustomInput.scss";

const CustomInput = ({ ...props }) => {
  const store = useContext(StoreContext);

  return useObserver(() => (
    <input
      className='custom-input'
      value={toJS(store?.country?.Country) || "Worldwide"}
      readOnly
      {...props}
    />
  ));
};

export default CustomInput;

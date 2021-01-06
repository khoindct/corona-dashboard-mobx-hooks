import React from "react";
import "./CustomInput.scss";

const CustomInput = ({ ...props }) => {
  return <input className='custom-input' {...props} />;
};

export default CustomInput;

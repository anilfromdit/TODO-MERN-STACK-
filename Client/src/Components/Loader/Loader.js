import React from 'react';
import "./Loader.css"
import { Spin } from 'antd';
const Loader = ({ simple }) => {

  return (

    <div> {simple ? <Spin size="large" style={{margin:"2rem"}} /> : <div className="loaderContainer" >
      <div className="circle-1 "></div>
      <div className="circle-2 "></div>
      <div className="circle-3 "></div>
      <div className="circle-4 "></div>
      <div className="circle-5 "></div>
    </div>
    }</div>

  )
};

export default Loader;

import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading id="loading" type={type} color={'#FE9C02'} height={'20%'} width={'20%'} />
);
 
export default Loading;
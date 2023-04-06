import React from 'react';
import './custom.font.css';
import './index.css';



const Weather = (props) => {
    return (
        <div className='text-slate-900 text-2xl text-white text-center bg-slate-600 bg-opacity-10 backdrop-blur-xl rounded drop-shadow-lg  items-center m-3 p-1 font-semibold italic'>
            <h1>{props.city}</h1>
            <p>Temperature: {props.temperature}</p>
            <p>Conditions: {props.conditions}</p>
        </div>
    );
};

export default Weather;
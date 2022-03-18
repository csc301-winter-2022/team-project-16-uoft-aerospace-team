import { useState } from "react";

import SelectCheckBoxes from "./SelectCheckBoxes";
import InfoTable from "./InfoTable";
import pageStyle from "../styles/pageStyle";
import { dividerStyle, titleStyle } from "../styles/InfoPageStyle";
import * as services from '../backend/controllers/services';

const fakeFlights = [
  {
    name: 'mommy',
    time: new Date(),
    site: 'your house',
    pilots: 'me, you',
    drone: 'a drone',
    note: 'sick flight',
    duration: 'long',
    weather: 'nice',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },

  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
  {
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },{
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },{
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },{
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },{
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },{
    name: 'daddy',
    time: new Date(),
    site: 'tprpmto',
    pilots: 'Luna',
    drone: 'prototype',
    note: 'yoooo',
    duration: 'short',
    weather: 'bad',
    
  },
];

const InfoPage = () => {

    const [page, setPage] = useState('flight');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortFunction, setSortFunction] = useState();

    const allCategories = Object.keys(fakeFlights[0]).map( key => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return { value: key, label: label };
    });

    return (
      <div style={pageStyle}>
        <div style={titleStyle}>
          <strong><em>Flight History</em></strong>
        </div>

        <hr style={dividerStyle} />

        <SelectCheckBoxes
            options={allCategories}
            setOptions={setSelectedCategories}
            />

        <InfoTable 
          headers={selectedCategories} 
          data={fakeFlights}
          />

      </div>
    );
}

export default InfoPage;
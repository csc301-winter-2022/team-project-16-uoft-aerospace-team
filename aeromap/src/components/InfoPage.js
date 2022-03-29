import { useState, useEffect } from "react";

import SelectCheckBoxes from "./SelectCheckBoxes";
import InfoTable from "./InfoTable";
import pageStyle from "../styles/pageStyle";
import { dividerStyle, titleStyle } from "../styles/InfoPageStyle";



const InfoPage = ({path}) => {

    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState('flight');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortFunction, setSortFunction] = useState();
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
      fetch(`${path}get-logs`)
        .then(res => res.json())
        .then(initialLogs => {console.log('initialLogs', initialLogs);
         setLogs(initialLogs)
      })
        .then(() => {
          if(logs.length > 0)
            setAllCategories(Object.keys(logs[0]).map( key => {
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              return { value: key, label: label }
              })
          )   
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


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
          data={logs}
          />

      </div>
    );
}

export default InfoPage;
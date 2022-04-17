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

    const declareAllCategories = () => {
      if (logs.length > 0)
        setAllCategories(
          Object.keys(logs[0]).map((key) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return { value: key, label: label };
          })
        )
    }
          
    useEffect(() => {
      fetch(`${path}get-logs`)
        .then(res => res.json())
        .then(initialLogs => setLogs(initialLogs));
    }, []);

    useEffect(declareAllCategories, [logs])


    return (
      <div style={pageStyle}>
        <div style={titleStyle}>
          <strong>Flight History</strong>
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
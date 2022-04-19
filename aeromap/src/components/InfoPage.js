import { useState, useEffect } from "react";
import Select from 'react-select';
import StyledTextField from "./widgets/StyledTextField";
import Header from "./widgets/Header";
import SelectCheckBoxes from "./widgets/SelectCheckBoxes";
import InfoTable from "./widgets/InfoTable";

import * as service from "../services/service"

import pageStyle from "../styles/Page";
import { 
  optionsContainerStyle, sortSelectStyle, 
  upArrowImg, imgStyle, downArrowImg,
  searchFieldStyle
} from "../styles/InfoPage";



const InfoPage = () => {

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState('flight');
  const [selectedCategories, setSelectedCategories] = useState(['date','sitename']);
  const [allCategories, setAllCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(false)
  const [searchParam, setSearchParam] = useState('')
  const [filteredLogs, setFilteredLogs] = useState([])
 
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
    service
      .get_logs()
      .then(initialLogs => setLogs(initialLogs))
  }, []);

  useEffect(declareAllCategories, [logs])

  useEffect(() => {
    const keyword = searchParam.toLowerCase();
    const filtered = 
        searchParam === '' 
            ? logs
            : logs.filter(log => {
                for (const property in log) {

                  if (log[property] instanceof Array) {
                    for (const elem of log[property]) {
                      if (elem.toLowerCase().includes(keyword))
                        return true
                    }
                  }else if (log[property].toLowerCase().includes(keyword)) {
                    return true
                  }
                  
                }
                return false
              })

    setFilteredLogs(filtered)
  }, [searchParam, logs, sortOrder])

  const onSelectSortParams = param => {
    const sortParam = param.value
    const logsCopy = logs.slice()

    // eslint-disable-next-line array-callback-return
    logsCopy.sort((a, b) => {
      if (a[sortParam] > b[sortParam]) return 1;
      if (a[sortParam] === b[sortParam]) return 0;
      if (a[sortParam] < b[sortParam]) return -1;
    })

    setSortOrder(true)
    setLogs(logsCopy)
  }

  const generateSortOrder = () => {
    const handleClickOnUp = () => {
      setLogs(logs.reverse())
      setSortOrder(false)
    }

    const handleClickOnDown = () => {
      setLogs(logs.reverse())
      setSortOrder(true)
    }

    return (
      sortOrder
      ? <div onClick={handleClickOnUp}><img src={upArrowImg} style={imgStyle} alt='Ascending Order'/></div>
      : <div onClick={handleClickOnDown}><img src={downArrowImg} style={imgStyle} alt='Descending Order'/></div>
    )
  }

  return (
    <div style={pageStyle}>
      
    <Header text='Flight History' />

      <div style={optionsContainerStyle}>
        <SelectCheckBoxes
          options={allCategories}
          setOptions={setSelectedCategories}
          />
        <div style={sortSelectStyle}>
          <Select
            options={allCategories}
            placeholder='Sort By'
            onChange={selected => onSelectSortParams(selected)}
          />
        </div>
        {generateSortOrder()}
        <div style={searchFieldStyle}>
          <StyledTextField
            value={searchParam}
            onChange={({target}) => setSearchParam(target.value)}
            label="Search"
            variant="outlined"
            size="small"
            />
        </div>
      </div>

      <InfoTable 
        headers={selectedCategories} 
        data={filteredLogs}
        />

    </div>
  );
}

export default InfoPage;
import { useState, useEffect } from "react";
import Select from 'react-select';
import StyledTextField from "./widgets/StyledTextField";
import Header from "./widgets/Header";
import SelectCheckBoxes from "./widgets/SelectCheckBoxes";
import InfoTable from "./widgets/InfoTable";
import CustomToggleButton from "./widgets/CustomToggleButton";

import * as service from "../services/service"

import pageStyle from "../styles/Page";
import { 
  optionsContainerStyle, sortSelectStyle, 
  upArrowImg, imgStyle, downArrowImg,
  searchFieldStyle,
  toggleContainerStyle
} from "../styles/InfoPage";



const InfoPage = () => {

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState('flight');
  const [selectedCategories, setSelectedCategories] = useState([]);
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
    setSelectedCategories([])
    setSortOrder(false)
    setSearchParam('')

    if (page === 'flight') {
      service
      .get_logs()
      .then(initialLogs => setLogs(initialLogs))
    } else if (page === 'site') {
      service
      .get_sites()
      .then(initialLogs => {
        const transformedLogs = initialLogs.map(log => {
          log['Class of Airspace'] = log.airspace_class
          delete log.airspace_class
          delete log.emergency_contacts
          delete log.nearby_aerodromes
          delete log.pins
          return log
        })
        setLogs(transformedLogs)
      })
    } else if (page === 'drone') {
      service
      .get_drones()
      .then(initialLogs => {
        const transformedLogs = initialLogs.map(log => {
          log['Full Name'] = log.name.fullName
          log['Short Name'] = log.name.shortName
          log['Version Number'] = log.name.versionNum
          delete log.name
          return log
        })
        setLogs(transformedLogs)
      })
    }
    
  }, [page]);

  useEffect(declareAllCategories, [logs, page])

  useEffect(() => {
    const keyword = searchParam.toLowerCase();
    const filtered = 
        searchParam === '' 
            ? logs
            : logs.filter(log => {
                for (let property in log) {
                  if (typeof log[property] === 'object' || typeof log[property] === 'undefined') {
                    return false;
                  }
                  if (!isNaN(log[property])) {
                    log[property] = String(log[property])
                  }

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

    // cheat for numerical comparison, should look to generalize
    if (param.value === 'margin') {
      logsCopy.sort((a,b) => +a[sortParam] - +b[sortParam])
    } else {
      // eslint-disable-next-line array-callback-return
      logsCopy.sort((a, b) => {
        if (a[sortParam] > b[sortParam]) return 1;
        if (a[sortParam] === b[sortParam]) return 0;
        if (a[sortParam] < b[sortParam]) return -1;
      })
    }

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

    <div style={toggleContainerStyle}>
      <CustomToggleButton page={page} setPage={setPage}/>
    </div>
      
    <Header text='Information' />

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
        page={page}
        />

    </div>
  );
}

export default InfoPage;
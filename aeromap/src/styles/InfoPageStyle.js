const tableContainerStyle = {
    backgroundColor: 'white',
    marginLeft: '20px',
    padding: '5px',
    width: 'calc(90% - 10px)',
    height: '600px',
    overflow: 'auto',
}

const tableStyle = {
    width: '98%',
    marginLeft: '10px',
    borderCollapse: 'separate',
    borderSpacing: '0 100%',
}

const headerStyle = {
    position: 'sticky', 
    top: 0,
    background: 'LightSlateGrey',
}

const headerRowStyle = {
}

const headerCellStyle = {
    textAlign: 'left',
    paddingLeft: '10px',
}

const tableBodyStyle = {
}

const rowDataStyle = {
    backgroundColor: 'aliceblue',
    cursor: 'pointer',
}

const cellDataStyle = {
    padding: '5px 10px',
}

const optionsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px 0px 5px 20px',
}

const sortSelectStyle = {
    width: 120,
    marginLeft: 20
}

const imgStyle = {
    margin: '7px 5px',
    height: 25,
    width: 20,
    filter: 'invert(100%)',
    cursor: 'pointer'
}

const searchFieldStyle = {
    marginLeft: 320,
    height: 50,
}

export { 
    tableContainerStyle, tableStyle, 
    headerStyle, headerRowStyle, headerCellStyle,
    tableBodyStyle, rowDataStyle, cellDataStyle,
    optionsContainerStyle, sortSelectStyle,
    imgStyle, searchFieldStyle
 };

 export { default as upArrowImg } from './Images/upArrow.png';
 export { default as downArrowImg } from './Images/downArrow.png';
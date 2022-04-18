import { nanoid } from "nanoid";

import {
    tableContainerStyle,
    tableStyle,
    headerStyle,
    headerRowStyle,
    headerCellStyle,
    tableBodyStyle,
    rowDataStyle,
    cellDataStyle,
} from "../../styles/InfoPageStyle";

const generateHeader = (tableHeaders) => (
  <thead style={headerStyle}><tr style={headerRowStyle}>
      {tableHeaders.map((header) => (
        <th key={nanoid()} style={headerCellStyle} >
          {header.charAt(0).toUpperCase() + header.slice(1)}
        </th>
      ))}
    </tr></thead>
);

const generateBody = (tableHeaders, tableBodyData) => 
    <tbody style={tableBodyStyle}>
        {tableBodyData.map(rowData => {
            const tableData = [];
            tableHeaders.forEach(category => {
                let data = rowData[category];
                data = data instanceof Date
                    ? data.toISOString().split('T')[0]
                    : data
                tableData.push(<td key={nanoid()} style={cellDataStyle}>{data}</td>)});

            return(<tr key={nanoid()} onClick={() => console.log('bruh')} style={rowDataStyle}>{tableData}</tr>);
        })}
    </tbody>;

const InfoTable = ({ headers, data }) => {

    return(
        <div style={tableContainerStyle}>
            <table style={tableStyle}>
                {generateHeader(headers)}
                {generateBody(headers, data)}
            </table>
        </div>
        
    );
}

export default InfoTable
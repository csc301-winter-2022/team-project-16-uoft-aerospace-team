import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import {
    tableContainerStyle,
    tableStyle,
    headerStyle,
    headerRowStyle,
    headerCellStyle,
    tableBodyStyle,
    rowDataStyle,
    cellDataStyle,
} from "../../styles/widgets/InfoTable";

const generateHeader = (tableHeaders) => (
  <thead style={headerStyle}><tr style={headerRowStyle}>
      {tableHeaders.map((header) => (
        <th key={nanoid()} style={headerCellStyle} >
          {header.charAt(0).toUpperCase() + header.slice(1)}
        </th>
      ))}
    </tr></thead>
);

const generateBody = (tableHeaders, tableBodyData, navigate) => 
    <tbody style={tableBodyStyle}>
        {tableBodyData.map(rowData => {
            const tableData = [];
            tableHeaders.forEach(category => {
                let data = rowData[category];
                data = data instanceof Array
                    ? data.join(', ')
                    : data
                tableData.push(<td key={nanoid()} style={cellDataStyle}>{data}</td>)});

            return(<tr key={nanoid()} onClick={navigate ?  () => navigate(`/view-flight/${rowData.fid}`) : null} style={rowDataStyle}>{tableData}</tr>);
        })}
    </tbody>;

const InfoTable = ({ headers, data, page }) => {
    const navigate = useNavigate();

    return(
        <div style={tableContainerStyle}>
            <table style={tableStyle}>
                {generateHeader(headers)}
                {
                    page === 'flight'
                    ? generateBody(headers, data, navigate)
                    : generateBody(headers, data)
                }
            </table>
        </div>
        
    );
}

export default InfoTable
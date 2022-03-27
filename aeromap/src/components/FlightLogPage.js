import pageStyle from "../styles/pageStyle";
import {dividerStyle, flightLogsTitleStyle} from "../styles/flightLogStyle";
import { nanoid } from 'nanoid';
import React, {useState} from 'react';

const FlightLogPage = (props) => {
  
    const path = props.path

    const [logs, setLogs] = useState([]);

    // Log will show past flights
    // Make get request for past flight data

    const get_logs = async () => {
      await fetch(`${path}get-logs`)
      .then(res => res.json())
      .then(data => {
        setLogs(JSON.parse(data));
      })
    }

    get_logs();

    return (
      <div style={pageStyle}>
        <div style={flightLogsTitleStyle}>
          <strong>
            <em>Flight Logs</em>
          </strong>
        </div>
        <hr style={dividerStyle} />
        {/* need information on logs to format log table */}
        <div>
          <table style={{ color: "white" }}>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Drone ID</th>
                <th>Site</th>
              </tr>
              {logs.map(flight => {
                return (
                  <tr key={nanoid()}>
                    <td>{flight.date}</td>
                    <td>{flight.date}</td>
                    <td>{flight.drone}</td>
                    <td>{flight.sitename}</td>
                  </tr>                        
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default FlightLogPage;
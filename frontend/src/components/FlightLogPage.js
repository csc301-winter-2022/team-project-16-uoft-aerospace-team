import pageStyle from "../styles/pageStyle";
import {dividerStyle, flightLogsTitleStyle} from "../styles/flightLogStyle";

const FlightLogPage = () => {

    // Log will show past flights
    // Make get request for past flight data

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
                <th>Location</th>
              </tr>
              <tr>
                <td>04/02/2022</td>
                <td>3:00</td>
                <td>2948323</td>
                <td>2555 Dundas St</td>
              </tr>
              <tr>
                <td>don't</td>
                <td>judge</td>
                <td>formatting</td>
                <td>I got lazy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default FlightLogPage;
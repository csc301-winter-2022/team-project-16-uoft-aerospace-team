import pageStyle from "../styles/pageStyle";

const FlightLogPage = () => {

    // Log will show past flights
    // Make get request for past flight data

    return (
      <div style={pageStyle}>
        {/* max got lazy remind him to refactor css files */}
        <div style={{ marginLeft: 25, fontSize: 50, color: "white" }}>
          <strong><em>Flight Logs</em></strong>
        </div>
        <hr
          style={{ margin: 20, width: "90%", borderTop: "3px solid orange" }}
        />

        <div>
            {/*ahhhhhhh I'll do table populating don't stress me ahhhhhh*/}
          <table style={{color: 'white'}}>
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
          </table>
        </div>
      </div>
    );
}

export default FlightLogPage;
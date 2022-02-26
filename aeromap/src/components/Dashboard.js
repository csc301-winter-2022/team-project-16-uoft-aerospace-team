import pageStyle from "../styles/pageStyle";
import { 
    dashFlightsContainerStyle as containerStyle, 
    dashFlightsHeaderStyle as headerStyle,
    dashFlightContentStyle as contentStyle } from "../styles/dashFlightsStyle";

const Dashboard = () => {

    // Dashboard will show upcoming flights
    // Make get request for flight data

    return(
        <div style={pageStyle}>
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2><strong><em>Upcoming Flights</em></strong></h2>
                </div>
                <div style={contentStyle}>
                    <strong>
                        03-04-2022 at 72 Address St.
                        <br/>
                        Potentially a google calendar
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
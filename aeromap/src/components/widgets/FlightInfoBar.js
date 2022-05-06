import { Link } from 'react-router-dom';

import {
    barContainerStyle, buttonStyle, contentContainerStyle, dateContainerStyle,
    detailsContainerStyle, detailsLinkStyle, detailsTextContainerStyle, 
    hourContainerStyle, linkContainerStyle, timeContainerStyle,
    toolsContainerStyle, underlineContainerStyle,
    underlineStyle,
} from '../../styles/widgets/FlightInfoBar';

const FlightInfoBar = ({flight, handleRemove}) => {
    return(
        <div style={barContainerStyle}>

            <div style={contentContainerStyle}>
                <div style={timeContainerStyle}>
                    <div style={dateContainerStyle}>
                        {flight.date.split(' ')[0]}
                    </div>
                    <div style={hourContainerStyle}>
                    {flight.date.split(' ')[1]}
                    </div>
                </div>
                <div style={detailsContainerStyle}>
                    <div style={detailsTextContainerStyle}>
                        {flight.sitename}
                    </div>
                    <div style={toolsContainerStyle}>
                        <div style={linkContainerStyle}>
                            <Link style={detailsLinkStyle} to={`/view-flight/${flight.fid}`}> 
                                View Details 
                            </Link>
                        </div>
                        <div>
                            <button style={buttonStyle} onClick={handleRemove}> Remove </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={underlineContainerStyle}>
                <hr style={underlineStyle}/>
            </div>
        </div>
    )
}

export default FlightInfoBar
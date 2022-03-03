const AddFlight = () => {

    // Dashboard will show upcoming flights
    // Make get request for flight data

    return(
        <div> 
            <h1>Add Flight</h1>

            <label for="flight-time">Choose a time for your appointment:</label> <br/>

            <input type="datetime-local" id="flight-time" name="flight-time"></input>

            <div class="scrollable">
                
            </div>

        </div>
    );
}

export default AddFlight;
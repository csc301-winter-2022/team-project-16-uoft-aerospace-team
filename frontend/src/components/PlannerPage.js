import pageStyle from "../styles/pageStyle";

const PlannerPage = () => {
    return(
        <div style={pageStyle}>
            
                    <div>
                        {/* dangerous iframe embedding, only for demo purpose */}
                        <iframe title='map' width="1000" height="700"
                            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                    </div>
            
        </div>
    );
}

export default PlannerPage;
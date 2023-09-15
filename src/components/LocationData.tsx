import React, {useState, useEffect} from "react";
import axios from "axios";

export  function GetHourNow() {
    let hour = new Date();
    let hourConverted = hour.toLocaleTimeString();

    return <div>{hourConverted}</div>;
}

export function GetLocationIp() {

    const [location, setLocation] = useState(null);


    useEffect(() => {
        axios.get('https://ipinfo.io')
        .then(response => setLocation(response.data))
        .catch(err => console.log(`erro ao buscar IP: ${err}`));
    }, []);


    return(
        <div>
            {location && (
                <p>{location}</p>
            )}
            
        </div>
    );
}
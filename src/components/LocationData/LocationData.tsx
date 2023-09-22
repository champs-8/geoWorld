import {useState, useEffect} from "react";
import axios from "axios";

export  function GetHourNow() {
    let hour = new Date();
    let hourConverted = hour.toLocaleTimeString();

    return <div>{hourConverted}</div>;
}

interface InfosProps {
    ip: string, 
    city: string,
    country: string,
    region: string
}

export function GetLocationIp() {

    const [location, setLocation] = useState<InfosProps | null>(null);

    
    useEffect(() => {
        
        const tokenInfo = process.env.REACT_APP_IP_INFO;

        axios.get('https://ipinfo.io?token='+ tokenInfo)
        .then(response => setLocation(response.data))
        .catch(err => console.log(`erro ao buscar IP: ${err}`));
    }, []);
    
    return(
        <div>
            {location ? (
                <p>{location.city} - {location.region}/{location.country}</p>
            ): (
                <p>Carregando informações...</p>
            )}
        </div>
    );
}
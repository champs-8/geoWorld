import axios from "axios";
import { useState } from "react";


export interface CountryProps  {
    country: string
}

interface InfoCountryProps {
    name: string
}


export default function SearchCountry(country: CountryProps) {

    const [infoCountry, setInfoCountry] = useState('')

    //URL base da API de informações dos países : https://restcountries.com/v3.1/all

    axios.get('https://restcountries.com/v3.1/name/'+country.country)
    .then((response) => {
        setInfoCountry(response.data);
    }).catch((error) => {
        console.log(`Erro ao buscar o país ${country.country} : ${error}`);
    })

    return (
        <div>
            {infoCountry ? (
                <div>
                    {infoCountry}
                </div>
            ) : (
                <p>
                    Infelizmente não encontramos informações desse país
                </p>
            )}
        </div>
        
    );
}
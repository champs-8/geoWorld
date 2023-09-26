import axios from "axios";
import { useState, useEffect } from "react";


export interface CountryProps  {
    country: string
}

interface InfoCountryProps {
    official: string,
    independent: boolean
    currencies: string,
    capital: string,
    region: string,
    languages: string,
    area: number,
    maps: string,
    population: number,
    flags: string



}


export default function SearchCountry({country}: CountryProps) {

    const [infoCountry, setInfoCountry] = useState<InfoCountryProps | null>(null)

    //URL base da API de informações dos países : https://restcountries.com/v3.1/all

    useEffect(() => {
        //definir função para buscar info dos países

        const fetchCountryInfo = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/name/'+country);
                setInfoCountry(response.data)
                console.log(response.data);
            } catch(error) {
                console.log(`Erro ao buscar o país ${country} : ${error}`);
                setInfoCountry(null);
            }
        }
        console.log(infoCountry);

        fetchCountryInfo();
    }, [country])

    return (
        <div>
            {infoCountry ? (
                <div>
                    <h2>{country}</h2>
                    <p>Nome oficial: {infoCountry.official}</p>
                </div>
            ) : (
                <p>
                    Infelizmente não encontramos informações desse país
                </p>
            )}
        </div>
        
    );
}
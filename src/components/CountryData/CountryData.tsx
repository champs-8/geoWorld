/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";


export interface CountryProps  {
    country: string
}

interface InfoCountryProps {
    name: {
        official: string,
    }
    capital: string,
    languages:{
        [key: string]: any
    },
    area: number,
    population: number,
    subregion: string,
    currencies: {
        [key: string]: {
            name: string,
            symbol: string
        }
    },
    maps: {
        googleMaps : string
    },
    independent: boolean
    flags: {
        png: string,
        svg: string
    }
}


export default function SearchCountry({country}: CountryProps) {

    const [infoCountry, setInfoCountry] = useState<InfoCountryProps[] | null>(null)
    

    //URL base da API de informações dos países : https://restcountries.com/v3.1/all

    useEffect(() => {
        //definir função para buscar info dos países

        const fetchCountryInfo = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/name/'+country);
                setInfoCountry(response.data)
                // console.log(response.data[0]);

            } catch(error) {
                console.log(`Erro ao buscar o país ${country} : ${error}`);
                setInfoCountry(null);
            }
        }

        fetchCountryInfo();
    }, [country]);


    //quando atualizar o infoCountry, irá mostrar no clg
    useEffect(() => {
        console.log(infoCountry);
    }, [infoCountry]);


    return (
        <div>
            {infoCountry ? (
                <div>
                    <h2>{country}</h2>
                    <p>Nome oficial: {infoCountry[0].name.official}</p>
                    <p>Capital: {infoCountry[0].capital}</p>

                    {/* buscando idiomas dinamicamente, ja que nao será sempre as mesmas propriedades */}

                    {Object.entries(infoCountry[0].languages).map(([index ,value]) => (
                        <p>Idioma {index}: {value}</p>
                    ))}
                    
                    <p>Área: {(infoCountry[0].area).toLocaleString()} km²</p>
                    <p>População: {(infoCountry[0].population).toLocaleString()}</p>
                    <p>Região: {infoCountry[0].subregion}</p>

                    {/* <p>Moedas: {infoCountry[0].currencies["key"].name}</p> */}
                    <div>
                        <p>Moedas: {Object.keys(infoCountry[0].currencies)} - {Object.keys(infoCountry[0].currencies).map((currencyKey) => (
                            infoCountry[0].currencies[currencyKey].symbol
                        ))}</p>
                    </div>

                    <p>Mapa: {infoCountry[0].maps.googleMaps}</p>
                    <p>Independente: {infoCountry[0].independent}</p>
                    <p>{infoCountry[0].flags.png}</p>
                </div>
            ) : (
                <p>
                    Infelizmente não encontramos informações desse país
                </p>
            )}
        </div>
        
    );
}
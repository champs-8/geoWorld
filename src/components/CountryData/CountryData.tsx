/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'


export interface CountryProps  {
    country: string
}

interface CurrencieProps {
    name: string,
    symbol: string
}
interface LanguagesProps {
    name: string,
    code: string
}

interface InfoCountryProps {
    name: {
        official: string,
    }
    capital: string,
    capitalInfo : {
        latlng: [
            x: number,
            y: number
        ]
    }
    languages:{
        [key: string]: LanguagesProps
    },
    area: number,
    population: number,
    subregion: string,
    currencies: {
        [key: string]: CurrencieProps
    },
    maps: {
        googleMaps : string
    },
    independent: boolean
    flags: {
        png: string,
        svg: string
    },
    latlng: [
        x: number,
        y: number
    ]
}


export default function SearchCountry({country}: CountryProps) {

    const [infoCountry, setInfoCountry] = useState<InfoCountryProps[] | null>(null);    

    //URL base da API de informações dos países : https://restcountries.com/v3.1/all

    useEffect(() => {
        //definir função para buscar info dos países

        const fetchCountryInfo = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/name/'+country);
                setInfoCountry(response.data)

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

        //informações do país pronta

        if( infoCountry && infoCountry[0] && document.getElementById('map')){
            // criar map leaflet

            //recebendo coordenadas
            const [coordX, coordY] = [infoCountry[0].latlng[0], infoCountry[0].latlng[1]]; 
            //coordenadas da capital
            const [coordCapX, coordCapY] = [infoCountry[0].capitalInfo.latlng[0], infoCountry[0].capitalInfo.latlng[1]];

            const map = L.map('map').setView([coordX, coordY], 3);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([coordCapX, coordCapY]).addTo(map).bindPopup(`Capital: ${infoCountry[0].capital}`)

            return () => {
                map.remove();
            } 
        }
    }, [country]);
    

    return (
        <div>
            {infoCountry ? (
                <div>
                    <h2>{country}</h2>
                    <img alt="Flag" src={infoCountry[0].flags.png}/>
                    <p>Nome oficial: {infoCountry[0].name.official}</p>
                    <p>Capital: {infoCountry[0].capital}</p>

                    {/* buscando idiomas dinamicamente, ja que nao será sempre as mesmas propriedades */}

                    {Object.entries(infoCountry[0].languages).map(([index ,value]) => (
                        <p>Idioma {index}: {value.name}</p>
                    ))}
                    
                    <p>Área: {(infoCountry[0].area).toLocaleString()} km²</p>
                    <p>População: {(infoCountry[0].population).toLocaleString()}</p>
                    <p>Região: {infoCountry[0].subregion}</p>

                    <div>
                        <p>Moedas: {Object.keys(infoCountry[0].currencies)} - {Object.keys(infoCountry[0].currencies).map((currencyKey) => (
                            infoCountry[0].currencies[currencyKey].symbol
                        ))}</p>
                    </div>
                    
                    <p> Independente: {(infoCountry[0].independent) === true ? 'Sim': 'Não'}</p>

                    <p>Mapa: {infoCountry[0].maps.googleMaps}</p>
                    <div id="map" style={{ width: '100%', height: '400px' }}></div>
                </div>
            ) : (
                <p>
                    Infelizmente não encontramos informações desse país
                </p>
            )}
        </div>
        
    );
}
export interface CountryProps  {
    country: string
}


export default function SearchCountry(country: CountryProps) {

    return (
        <div>
            {country ? (
                <div>
                    informations of the country
                </div>
            ) : (
                <p>
                    Infelizmente não encontramos informações desse país
                </p>
            )}
        </div>
        
    );
}
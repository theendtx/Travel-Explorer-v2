type CountryCardProps = {
    country: any;
};

function CountryCard({ country }: CountryCardProps) {
    return (
        <div className="country-card">
            <img
  src={country.flags?.png}
  alt={country.name.common}
/>

            <h2>{country.name.common}</h2>

            <p>Population: {country.population}</p>
        </div>
    );
}

export default CountryCard;
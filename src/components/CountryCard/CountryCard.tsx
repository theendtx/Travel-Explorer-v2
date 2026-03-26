import { Link } from "react-router-dom";

type Props = {
    country: any;
};

function CountryCard({ country }: Props) {
    return (
        <Link to={`/country/${country.name.common}`}>
            <div className="country-card">
                <img src={country.flags?.png}
                alt={country.name.common}
                />

                <h3>{country.name.common}</h3>

                <p>Population: {country.population}</p>
            </div>
        </Link>
    );
}

export default CountryCard;
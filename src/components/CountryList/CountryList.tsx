import CountryCard from "../CountryCard/CountryCard";

type CountryListProps = {
    countries: any[];
};

function CountryList({ countries }: CountryListProps) {
    return (
        <div className="country-list">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    );
}

export default CountryList;
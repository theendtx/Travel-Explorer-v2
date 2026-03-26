type Props = {
    value: string;
    onChange: (value: string) => void;
};

function RegionFilter({ value, onChange }: Props) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    );
}

export default RegionFilter;
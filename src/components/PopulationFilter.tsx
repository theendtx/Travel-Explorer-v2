type Props = {
    value: string;
    onChange: (value: string) => void;
};

function RegionFilter({ value, onChange }: Props) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">No sorting</option>
            <option value="asc">Population ↑</option>
            <option value="desc">Population ↓</option>
        </select>
    );
}

export default RegionFilter;
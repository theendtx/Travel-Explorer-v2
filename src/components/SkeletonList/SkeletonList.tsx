import SkeletonCard from "../SkeletonCard/SceletonCard";

function SkeletonList() {
    return (
        <div className="country-list">
            {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
}

export default SkeletonList;
// 🔥 props типі
type Props = {
  favorites: string[];
};

function Favorites({ favorites }: Props) {
  return (
    <div>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((name) => (
          <p key={name}>{name}</p>
        ))
      )}
    </div>
  );
}

export default Favorites;
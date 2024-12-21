import { useEffect, useState } from 'react';

const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Sphynx' },
  { name: 'Mittens', age: '2', breed: 'Persian' },
  { name: 'Shadow', age: '1', breed: 'Siamese' },
  { name: 'Pumpkin', age: '3', breed: 'Bengal' },
  { name: 'Luna', age: '4', breed: 'Abyssinian' },
  { name: 'Simba', age: '2', breed: 'Birman' },
  { name: 'Fluffy', age: '2', breed: 'Peterbald' },
];

const breeds = ['Sphynx', 'Peterbald', 'Birman', 'Abyssinian', 'Persian', 'Bengal', 'Siamese'];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState(availableCats);
  const [searchName, setSearchName] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() =>
            fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json())
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));
        setCats(catsWithImages);
        setFilteredCats(catsWithImages);
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchCatImages();
  }, []);

  useEffect(() => {
    const filtered = cats.filter(
      (cat) =>
        (selectedBreed === '' || cat.breed === selectedBreed) &&
        cat.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredCats(filtered);
  }, [searchName, selectedBreed, cats]);

  return (
    <section className="text-center mt-4">
      <h2 style={{ marginTop: '-10px' }}>Meet our adorable cats looking for their forever home!</h2> {/* Move the Featured Cats section up */}
      <p></p>

      <div
        style={{
          position: 'relative',
          top: '-80px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',  // Added gap between the fields
        }}
        className="mt-2"
      >
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="form-control mb-2"
          style={{ width: '200px' }}
        />
        <select
          className="form-control mb-2"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 row g-4 cats-container" id="cats-container">
        {filteredCats.map((cat, i) => (
          <div key={i} className="col-md-4">
            <div className="cat-card">
              <img
                src={cat.image}
                alt={cat.name}
                className="img-fluid mb-2"
                style={{ borderRadius: '8px', height: '200px', objectFit: 'cover' }}
              />
              <div className="cat-info">
                <h3 className="h5 mb-1">{cat.name}</h3>
                <p className="mb-0">
                  Age: {cat.age}, Breed: {cat.breed} {/* Display Age and Breed side by side */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

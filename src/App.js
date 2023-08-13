import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { createResource as fetchData } from './helper';

function App() {
  let [message, setMessage] = useState('Seach for music')
  let [search, setSearch] = useState('')
  let [data, setData] = useState(null)
  
  useEffect(() => {
    if (searchTerm) {
        setData(fetchData(searchTerm))
    }
}, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term)
  }
  return (
    <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        <Suspense fallback={<h1>Loading...</h1>}>
            // <Gallery data={data} />
        </Suspense>
    </div>
)

}
export default App;

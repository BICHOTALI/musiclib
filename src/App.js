import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { createResource as fetchData } from './helper';
import Spinner from './components/Spinner';

function App() {
  let [message, setMessage] = useState('Seach for music')
  let [searchTerm, setSearch] = useState('')
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

  const renderGallery = () => {
    if(data){
        return (
            <Suspense fallback={<Spinner/>}>
                <Gallery data={data} />
            </Suspense>
        )
    }
  }


  return (
    <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        {renderGallery()}
    </div>
  )

}
export default App;

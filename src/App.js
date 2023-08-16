import { useEffect, useState, Suspense , Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';

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
        {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        {renderGallery()}
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
  );
}
export default App;
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
console.log (accessKey)
 export default function App() {
    const [images, setImages]=useState([])
    const[pages,setPage]=useState(1)
    const [query,setQuery]=useState('')
    
    useEffect(()=>{
      getPhotos()
      },[pages])

      function getPhotos () {

        let apiUrl=`https://api.unsplash.com/photos?`
        if(query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`

        apiUrl += `&page=${pages}`
        apiUrl += `&client_id=${accessKey}`

        fetch (apiUrl)
        .then((res)=>res.json())
        .then((data)=>{
          const imagesFromApi = data.results ?? data
          console.log (data)
          if(pages===1) setImages(imagesFromApi)
          setImages((images)=>[...images, ...imagesFromApi])
       }
        )}
      
       function searchPhotos(e){
         e.preventDeefault()
         setPage(1)
         getPhotos()
       }

      if(!accessKey){
        return (
          <a href="https://unspash.com/developers" className='error'>
            Required: Get Your Unsplash API KEY First
          </a>
        )
      }

  return (
    <div className="App">
      <h1>Unsplas Image Gallery!</h1>


        <form onSubmit={searchPhotos}>
          <input 
           type="text" 
           placeholder="Search Unsplash..."
           value={query}
           onChange={(e)=>setQuery(e.target.value)}


           />
          <button>Search</button>
        </form>

          <InfiniteScroll
            dataLength={images.length}
            next={()=>setPage((page)=>page+1)}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >

      <div className="image-grid">
      {images.map((image,index)=>(
            <a className="image" key={index} href={image.links.html} target="_blank" rel='noopener noreferrer'>
              <img src={image.urls.regular} alt={image.alt_description}/> 

          {/* {[...Array(100)].map((_,index)=>(
            <div className="image" key={index}>
              <img src="https://placekitten.com/g/1920/1080" alt="Sampel"/>  */}

            </a>
          ))}
       </div>
       </InfiniteScroll>
    </div>
  );
}



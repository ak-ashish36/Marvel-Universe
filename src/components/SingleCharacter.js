import React, { useEffect, useState } from 'react'
import Character from './CharactersCard'
import Spinner from './Spinner';
var md5 = require('md5');

const SingleCharacter = (props) => {
  const ts = "1";
  const public_key = "6d7fd1276392e07395eee358f0725fdf";
  const private_key = "ead7eb81d75adc59a73f685d6d79876aeed2cc79";
  const hash = md5(ts + private_key + public_key);
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const name=props.name;

  const capitalizeFirstLetter = (str) => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());

  const FetchCharacter = async () => {
    props.setProgress(10);
    setLoading(true)
    const url = `https://gateway.marvel.com/v1/public/characters?&name=${name}&limit=100&ts=1&apikey=6d7fd1276392e07395eee358f0725fdf&hash=3e12076ca4ca902f6b44bc4fe39f330e`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setResults(parsedData.data.results)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = capitalizeFirstLetter(name);
    FetchCharacter();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>{capitalizeFirstLetter(name)}</h1>
      {loading && <Spinner />}
      <div className="d-flex justify-content-center" >
        {results.map((element) => {
          return <div className="col-md-" key={element.url}>
            <Character name={element.name ? element.name : ""} description={element.description ? element.description : "Not Availabe"} date={element.modified} thumbnail={element.thumbnail.path + "/portrait_xlarge.jpg"} characterUri={element.resourceURI + `?ts=${ts}&apikey=${public_key}&hash=${hash}`} totalComics={element.comics.available} comics={element.comics.collectionURI + `?ts=${ts}&apikey=${public_key}&hash=${hash}`} />
          </div>
        })}
      </div>
    </>
  )
}
export default SingleCharacter;

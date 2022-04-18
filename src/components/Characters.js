import React, { useEffect, useState } from 'react'
import Character from './CharactersCard'
import Spinner from './Spinner';
var md5 = require('md5');

const Characters = (props) => {
    const ts="1";
    const public_key = "6d7fd1276392e07395eee358f0725fdf";
    const private_key ="ead7eb81d75adc59a73f685d6d79876aeed2cc79";
    const hash = md5(ts+private_key+public_key);
    const [limit, setlimit] = useState(12);
    const [offset, setOffset] = useState(1);
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)


    const FetchCharacters = async () => {
        props.setProgress(10);
        setLoading(true)
        const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}&limit=${limit}&offset=${offset}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setResults(parsedData.data.results)
        setTotal(parsedData.data.total);
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = "Marvel Characters";
        FetchCharacters();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        props.setProgress(10);
        setLoading(true)
        const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}&limit=${limit}&offset=${offset+1}`;
        setOffset(offset+1);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setResults(results.concat(parsedData.data.results));
        setTotal(parsedData.data.total);
        setLoading(false)
        props.setProgress(100);
    };

    const handleNextClick = async () => {
        fetchMoreData();
    }

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Marvel Charcters</h1>
            {loading && <Spinner />}

            <div className="container">
                <div className="row">
                    {results.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <Character name={element.name? element.name : ""} description={element.description ? element.description :"Not Availabe"} date={element.modified} thumbnail={element.thumbnail.path+"/portrait_xlarge.jpg"} characterUri={element.resourceURI+`?ts=${ts}&apikey=${public_key}&hash=${hash}`} totalComics={element.comics.available} comics={element.comics.collectionURI+`?ts=${ts}&apikey=${public_key}&hash=${hash}`} />
                        </div>
                    })}
                </div>
                <div className="d-grid gap-5">
                    <button disabled={offset + 1 > Math.ceil(total /limit)} type="button" className=" d-grid gap-2 btn btn-dark btn-lg" onClick={handleNextClick}>More</button>
                </div>
            </div>

        </>
    )

}
export default Characters;

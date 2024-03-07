import React from "react";
import { useState } from 'react';
import Unsplash, {toJson} from 'unsplash-js'


const unsplash = new Unsplash({
    accessKey: "VU3rv4YgmESP7FDE0iIlaBqp-jdFS4TJBRj5bWwRjm4"
})

export default function SearchPhotos(){


    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);

    const searchP = async(e) =>{
        e.preventDefault();
        console.log("submitting request")
        unsplash.search.photos(query)
        .then(toJson)
        .then((json) =>{
            setPics(json.results)
        })
    }



    document.addEventListener('DOMContentLoaded', function() {
        const cardImages = document.querySelectorAll('.card-image');
      
        cardImages.forEach(image => {
          image.addEventListener('click', function handleClick() {
            if (image.classList.contains('modal-open')) {
              image.classList.remove('modal-open');
            } else {
              cardImages.forEach(otherImage => {
                otherImage.classList.remove('modal-open');
              });
              image.classList.add('modal-open');
            }
            
            // Remova o ouvinte de evento após o primeiro clique
            image.removeEventListener('click', handleClick);
          });
        });
      });


    return(
        <div>
            <form className="form" onSubmit={searchP}>
                <label className="label" htmlFor="query">
                    {" "}
                </label>
                <input
                    className="input" 
                    type="text"
                    name="query"
                    placeholder="Digite algum lugar bacana para viajar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Procurar</button>
            </form>

            <div className="card-list">
                {pics.map((pic) => <div className="card" key={pic.id}>
                    <img
                        src={pic.urls.full}
                        alt={pic.alt_description}
                        className="card-image"
                        width="50%"
                        height="50%"
                    />
                </div>
            )}</div>
        </div>
    )
}
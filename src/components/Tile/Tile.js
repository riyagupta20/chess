import React from 'react';
import "./Tile.css";
// import images from "../../assests/images/queen_b.png";

interface Props{
    image?: string;
    number: Number;
}

export default function Tile({number, image}:Props){
    if(number % 2 === 0){
        return(
            <div className='tile black-tile'>
                {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}
            </div>
        )
    }
    else{
        return(
            <div className='tile white-tile'>
                {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}
            </div>
        )
    }
}

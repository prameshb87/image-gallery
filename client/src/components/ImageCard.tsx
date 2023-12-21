import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

import '../styles/ImageCard.css';

const ImageCard: React.FC<ImageCardProps> = ({ id, name, url, caption = 'Image', handleLike, handleDisLike, likedCount, dislikedCount }) => {

    return (
        <div  className="image-card__wrapper">
            <figure className={`image-card`} >
                <img className="image-card__image" src={url} alt={name}></img>
                <figcaption>{caption}</figcaption>
            </figure>
            <div className="image-card__status">
                <span className="image-card__icon" onClick={() => handleLike(id)}>
                    <FontAwesomeIcon icon={faThumbsUp} className={`like-icon ${likedCount && 'like-icon--liked'}`} color={`${likedCount ? 'white' : 'aqua'}`} />
                    <span>{likedCount || ''}</span>
                </span>
                <span className="image-card__icon" onClick={() => handleDisLike(id)}>
                    <FontAwesomeIcon icon={faThumbsDown} className={`dislike-icon ${dislikedCount && 'dislike-icon--disliked'}`} color={`${dislikedCount ? 'orange' : 'aqua'}`} />
                    <span>{dislikedCount || ''}</span>
                </span>
            </div>
        </div>
    );
};

interface ImageCardProps {
    id: number,
    name: string,
    url: string,
    caption?: string,
    handleLike: (id:number) => void,
    handleDisLike: (id:number) => void,
    likedCount: number,
    dislikedCount: number,
}

export default ImageCard;
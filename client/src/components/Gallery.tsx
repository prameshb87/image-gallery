import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import '../styles/Gallery.css';

const Gallery = () => {

    const [images, setImages] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3001/api/photos');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        })();
    }, []);

    const handleLike = async (id: number) => {
        try {
            const response = await fetch(`/api/photos/like/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const updatedImages = await response.json();
            setImages(updatedImages);
        } catch (error) {
            console.error('Error updating image status');
        }
    };

    const handleDisLike = async (id: number) => {
        try {
            const response = await fetch(`/api/photos/dislike/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const updatedImages = await response.json();
            setImages(updatedImages);
        } catch (error) {
            console.error('Error updating image status');
        }
    };

    return (
        <div className="image-gallery">
            <div className="image-gallery__wrapper">
                {
                    images.map(({ id, name, url, caption, likedCount, dislikedCount }, index) => {
                        return <ImageCard
                            key={index}
                            id={id}
                            name={name}
                            url={url}
                            caption={caption}
                            handleLike={handleLike}
                            handleDisLike={handleDisLike}
                            likedCount={likedCount}
                            dislikedCount={dislikedCount}
                        />
                    })
                }
            </div>
        </div>
    )
};

export default Gallery;
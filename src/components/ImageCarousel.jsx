import React, { useEffect, useRef, useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import { IMAGE_API_LINK } from '../utils/constants'

const ImageCarousel = () => {
    const [imagesData, setImagesData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const timerRef = useRef(null);

    const data = useFetchData(IMAGE_API_LINK);

    const handleNextButtonClick = () => {
        setCurrentImageIndex((prevValue) => (prevValue + 1) % imagesData.length);
    };

    const handlePreviousButtonClick = () => {
        setCurrentImageIndex((prevValue) => (prevValue - 1 + imagesData.length) % imagesData.length)
    };

    const handleMouseEnter = () => {
        clearInterval(timerRef.current);
    };

    const handleMouseLeave = () => {
        timerRef.current = setInterval(() => {
            handleNextButtonClick();
        }, 2000);
    };

    useEffect(() => {

        timerRef.current = setInterval(() => {
            handleNextButtonClick();
        }, 2000);

        return () => {
            clearInterval(timerRef.current)
        };

    }, [imagesData]);

    useEffect(() => {
        setImagesData(data);
    }, [data]);

  return (
    <div className='container'>
        <div onClick={handlePreviousButtonClick} className="left-nav-button">{"<"}</div>
        <div className='carousel-image'>
            {imagesData ?
                <img
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    src={imagesData[currentImageIndex]?.download_url}
                    alt='' 
                /> :
                <></>
            }
        </div>
        <div onClick={handleNextButtonClick} className="right-nav-button">{">"}</div>
    </div>
  )
}

export default ImageCarousel
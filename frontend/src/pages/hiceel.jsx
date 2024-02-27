// pages/index.js
import React from 'react';
import ReactPlayer from 'react-player';

const Hiceel = () => {
    return (
        <div className='mt-20 ml-32'>
            <h1>Video Player</h1>
            <ReactPlayer

                url="https://https://youtu.be/H5v3kku4y6Q?si=CXUIwuRyq48x7DZj/your-video.mp4"
                controls={true}
                width="1500px"
                height="1000px"
            />
        </div>
    );
};

export default Hiceel;

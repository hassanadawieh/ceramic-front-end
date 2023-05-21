import React from 'react';
import "./LandingVideo.css";
const LandingVideo = () => {
  return (
    <div className='landing-video-container'>
        <video className='landing-video' autoplay loop muted>
            {/* <source src={} /> */}
        </video>
    </div>
  )
}

export default LandingVideo;

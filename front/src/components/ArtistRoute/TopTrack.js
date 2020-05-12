import React, { useState } from "react";
import styled from "styled-components";
import PlayButton from "react-play-button";

const TopTrack = ({ currentlyPlaying ,setCurrentlyPlaying,eachTrack }) => {
  //console.log(eachTrack, "IN TOP TRACKS");
// const [ currentlyPlaying, setCurrentlyPlaying] = useState(null)
//console.log(currentlyPlaying)
  return (
    <React.Fragment>
      <PlayButton
      active={currentlyPlaying == eachTrack.name}
      play={()=> {setCurrentlyPlaying(eachTrack.name)}}
      stop={()=> {setCurrentlyPlaying(null)}}
        url={eachTrack.preview_url}
        playIconColor={"#FFFFFF"}
        stopIconColor={"#FFFFFF"}
        idleBackgroundColor={"#2B3033"}
        progressCircleColor={"#3354FF"}
        progressCircleWidth={5}
      />
    </React.Fragment>
  );
};

export default TopTrack;

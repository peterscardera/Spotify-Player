import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RelatedArtists = ({ eachRelatedArtist }) => {
  console.log(eachRelatedArtist);
  return (
    <React.Fragment>
      <WrapperRA>
        <Link to={`/artists/${eachRelatedArtist.id}`}>
          <StyledImg src={eachRelatedArtist.images[2].url} />{" "}
        </Link>
        <StyledName>{eachRelatedArtist.name}</StyledName>
      </WrapperRA>
    </React.Fragment>
  );
};

export default RelatedArtists;

const StyledImg = styled.img`
  display: inline;
  width: 90px;
  height: 90px;
  border-radius: 48px;
`;
const StyledName = styled.div`
  width: 79px;
  height: 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: lowercase;
  text-shadow: 4px 8px 25px #000000, 0px 4px 4px rgba(0, 0, 0, 0.5),
    1px 2px 2px rgba(0, 0, 0, 0.75);
`;

const WrapperRA = styled.div`
  display: inline-block;
  margin-right: 40px;
  text-align: center;
`;

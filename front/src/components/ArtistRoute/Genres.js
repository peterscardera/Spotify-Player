import React from "react";
import styled from "styled-components";

const Genres = ({ twoGenres }) => {
  // console.log(twoGenres);
  return (
    <React.Fragment>
      <Wrapper>
        {twoGenres.slice(0, 2).map((item, i) => {
          return (
            <>
              <Styled>{item}</Styled>
            </>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};

export default Genres;

const Wrapper = styled.div`
 
`;

const Styled = styled.div`
  background: rgba(75, 75, 75, 0.4);
`;

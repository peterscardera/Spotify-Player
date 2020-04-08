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
            <div>{item}</div>
          </>
        );
    })}
    </Wrapper>
    </React.Fragment>
  );
};

export default Genres;

const Wrapper = styled.div`
display: flex;
`

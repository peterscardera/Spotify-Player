import React from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner'

const Loading = () => {
  return (
    <React.Fragment>
      <Wrapper>
              <Loader type="Audio" color="pink" height={80} width={80}  />
      </Wrapper>

    </React.Fragment>
  );
};


export default Loading

const Wrapper = styled.div`
display: flex;
height: 100vh;
justify-content: center;
align-items: center;
`
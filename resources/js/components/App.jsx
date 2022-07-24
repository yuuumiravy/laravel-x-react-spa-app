import React from 'react';
import styled from 'styled-components';
import { Calender } from './Calender';

export const App = () => {
    return (
        <_Container>
            <Calender />
        </_Container>
    );
};

const _Container = styled.div`
    width: 80vh;
    margin: 0 auto;
`

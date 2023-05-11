import styled from '@emotion/styled';
import React from 'react';

import { Lookup } from '../components/lookup';

const Wrapper = styled.div`
    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;
`;

type LookupViewProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const LookupView: React.FC<LookupViewProps> = ({
    ...props
}) => {
    return (
        <Wrapper {...props}>
            <Lookup />
        </Wrapper>
    );
};

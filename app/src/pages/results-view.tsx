import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.div`

`;

type ResultsViewProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const ResultsView: React.FC<ResultsViewProps> = ({
    ...props
}) => {
    return (
        <Wrapper {...props}>
            
        </Wrapper>
    );
};

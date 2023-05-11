import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.div`

`;

type LocationCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const LocationCard: React.FC<LocationCardProps> = ({
    ...props
}) => {
    return (
        <Wrapper {...props}>
            
        </Wrapper>
    );
};

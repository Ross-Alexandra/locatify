import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.div`

`;

type LocationsViewProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const LocationsView: React.FC<LocationsViewProps> = ({
    ...props
}) => {
    return (
        <Wrapper {...props}>
            
        </Wrapper>
    );
};

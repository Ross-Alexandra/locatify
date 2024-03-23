import styled from '@emotion/styled';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { theme } from '../theme';

const Wrapper = styled.div`
    min-height: calc(100svh - var(--footer-height) - 30px);

    display: grid;
    place-items: center;

    .error-card {
        ${theme.card}

        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

type ErrorViewProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipDataState: 'prefetch' | 'loading' | 'success' | 'error';
}

export const ErrorView: React.FC<ErrorViewProps> = ({
    ipDataState,
    ...props
}) => {
    if (ipDataState !== 'error') {
        return <Navigate to='/lookup' />;
    }

    return (
        <Wrapper {...props}>
            <div className='error-card'>
                <h1>Something Went Wrong...</h1>
                <p>Please try again later</p>
            </div>
        </Wrapper>
    );
};

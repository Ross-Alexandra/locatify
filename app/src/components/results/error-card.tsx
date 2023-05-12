import styled from '@emotion/styled';
import React from 'react';

import { ErrorIcon } from '../../icons';
import { theme } from '../../theme';
import { IpError } from '../../types';

const Wrapper = styled.div`
    ${theme.card}

    height: 400px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    text-align: center;

    svg {
        width: 5rem;
        height: 5rem;
    }
`;

type ErrorCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipData: IpError;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
    ipData,
    ...props
}) => {
    return (
        <Wrapper {...props}>
            <ErrorIcon color={theme.colors.text} />

            <div className='content'>
                {ipData.tag ? (
                    <h2>{ipData.tag} ({ipData.ip_address})</h2>
                ) : (
                    <h2>{ipData.ip_address}</h2>
                )}

                <p>
                    Failed to fetch data for this IP address. This IP address is either invalid or does not exist.
                </p>
            </div>
        </Wrapper>
    );
};

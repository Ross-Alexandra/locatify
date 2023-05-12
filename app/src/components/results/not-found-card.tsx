import styled from '@emotion/styled';
import React from 'react';

import { MissingIcon } from '../../icons';
import { theme } from '../../theme';
import { IpNotFound } from '../../types';

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

type NotFoundCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipData: IpNotFound;
}

export const NotFoundCard: React.FC<NotFoundCardProps> = ({
    ipData,
    ...props
}) => {
    return (
        <Wrapper {...props}>
            <MissingIcon color={theme.colors.text} />

            <div className='content'>
                {ipData.tag ? (
                    <h2>{ipData.tag} ({ipData.ip_address})</h2>
                ) : (
                    <h2>{ipData.ip_address}</h2>
                )}

                <p>
                    Couldn&apos;t find info for this IP, is it public?
                </p>
            </div>
        </Wrapper>
    );
};

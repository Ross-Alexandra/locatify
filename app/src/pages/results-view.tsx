import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Summary } from '../components/results';
import { IpCard } from '../components/results/ip-card';
import { theme } from '../theme';
import { IpData } from '../types';

const Wrapper = styled.div`
    margin: 100px auto 0px auto;
    min-height: calc(100svh - var(--footer-height) - 100px - 30px);
    width: 80%;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;

    place-items: center;

    @media (max-width: ${theme.breakpoints.laptop}) {
        width: 100%;
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        display: flex;
        flex-direction: column;

        margin: 0px;
    }
`;

type ResultsViewProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipData: IpData[];
    ipDataState: 'prefetch' | 'loading' | 'success' | 'error';
}

export const ResultsView: React.FC<ResultsViewProps> = ({
    ipData,
    ipDataState,
    ...props
}) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (ipDataState === 'prefetch') {
            navigate('/lookup');
        }
    }, [ipDataState, navigate]);

    return (
        <Wrapper {...props}>
            <Summary ipData={ipData} isLoading={ipDataState === 'loading'} />

            {ipData.map((ip, cardIndex) => 
                <IpCard key={cardIndex} ipData={ip} />
            )}

            {ipDataState === 'error' && (
                <div>Error</div>
            )}
        </Wrapper>
    );
};

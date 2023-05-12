import styled from '@emotion/styled';
import _ from 'lodash';
import React from 'react';

import { theme } from '../../theme';
import { IpData } from '../../types';
import { Button } from '../ui';
import { Spinner } from '../ui/spinner';

const Wrapper = styled.div`
    ${theme.card}

    grid-column: 1 / -1;
    align-self: center;
    justify-self: center;

    display: flex;
    flex-direction: column;
    gap: 10px;

    height: auto;
    width: max-content;

    .title {
        line-height: 1.1;
    }

    .failure-counts {
        opacity: 0.5;
    }

    .json-download {
        text-decoration: underline;
        cursor: pointer;
    }

    #json-download-anchor {
        display: none;
    }

    .buttons {
        align-self: end;

        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;

function downloadJsonObject(object: unknown) {
    const data = JSON.stringify(object, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.getElementById('json-download-anchor') as HTMLAnchorElement;

    anchor.href = url;
    anchor.download = 'ip-addresses.json';
    anchor.click();
    window.URL.revokeObjectURL(url);
}

type SummaryProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipData: IpData[];
    isLoading: boolean;
}

export const Summary: React.FC<SummaryProps> = ({
    ipData,
    isLoading,
    ...props
}) => {
    if (isLoading) return <Spinner />;

    const statusCounts = _.countBy(ipData, 'status');
    const successCount = _.get(statusCounts, '200', 0) + _.get(statusCounts, 'undefined', 0);
    const notFoundCount = _.get(statusCounts, '404', 0);
    const errorCount = _.get(statusCounts, '400', 0);

    return (
        <Wrapper {...props}>
            <div className='title'>
                <h2>Found {successCount} location{successCount > 1 && 's'}</h2>
                <p className='failure-counts'>{notFoundCount} not found | {errorCount} errors</p>
            </div>

            <a id='json-download-anchor'/>

            <div className='buttons'>
                <Button as='button' onClick={() => downloadJsonObject(ipData)}>
                    Download Data
                </Button>
                <Button as='link' to='/lookup'>
                    Start Over
                </Button>
            </div>
        </Wrapper>
    );
};

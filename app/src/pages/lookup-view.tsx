import styled from '@emotion/styled';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { BulkLookup, ManualLookup } from '../components/lookup';
import { theme } from '../theme';

const Wrapper = styled.div`
    display: grid;
    place-items: center;

    width: 100%;
    min-height: calc(100vh - var(--footer-height) - 30px);
    min-height: calc(100svh - var(--footer-height) - 30px);

    .lookup-view {
        overflow: hidden;
        border-radius: var(--border-radius);
        background-color: var(--background-color);

        height: max-content;

        .title {
            width: 55ch;

            @media (max-width: ${theme.breakpoints.mobile}) {
                width: 95%;
            }
        }
    
        .view-content {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 10px;
            padding: 15px;
        }
    
        .buttons {
            display: flex;
            flex-direction: row;
            gap: 10px;
    
            align-self: end;
        }
    
        .warnings {
            text-align: right;
            align-self: end;
    
            p {
                color: var(--text-color);
                font-size: 0.75rem;
            }
        }
    }
`;

type LookupViewProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const LookupView: React.FC<LookupViewProps> = ({
    ...props
}) => {
    const onLookup = React.useCallback(() => {
        console.log('lookup');
    }, []);

    return (
        <Wrapper {...props}>
            <div className='lookup-view'>
                <Routes>
                    <Route path='/bulk' element={
                        <BulkLookup onLookup={onLookup}/>
                    }/>

                    <Route path="/" element={
                        <ManualLookup onLookup={onLookup}/>
                    }/>

                    <Route path="*" element={
                        <Navigate to='/' replace={true}/>
                    }/>
                </Routes>
            </div>
        </Wrapper>
    );
};

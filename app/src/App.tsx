import { Global, css } from '@emotion/react';
import { AxiosError } from 'axios';
import _ from 'lodash';
import React from 'react';
import {
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';

import { Body, Footer } from './components/layout';
import { LookupView, ResultsView } from './pages';
import { api } from './services';
import { theme } from './theme';
import {
    IpAddress,
    IpData,
    IpError,
    IpNotFound,
} from './types';

const rootCSS = css`
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        --background-color: ${theme.colors.background};
        --text-color: ${theme.colors.text};
        --primary-color: ${theme.colors.primary};
        --error-color: ${theme.colors.error};
        --warning-color: ${theme.colors.warning};
        --focus-outline: ${theme.colors.focusOutline};

        --layer-color: ${theme.colors.layer};
        --border-color: ${theme.colors.border};

        --footer-height: ${theme.sizing.footerHeight};

        --border-radius: ${theme.sizing.borderRadius};
        --border-radius-small: ${theme.sizing.borderRadiusSmall};
    }

    body {
        margin: unset;
        padding: unset;

        background-color: var(--background-color);
    }

    #root {
        display: flex;
        flex-direction: column;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a,
    button {
        /* Default styling for text within the app */
        margin: unset;

        color: var(--text-color);
        font-family: ${theme.fonts.primary};
        font-size: ${theme.sizing.paragraph};
    }

    h1 {
        font-size: ${theme.sizing.primaryHeading};
        font-weight: 700;
    }

    h2 {
        font-size: ${theme.sizing.sectionHeading};
        font-weight: 700;
    }

    h3 {
        font-size: ${theme.sizing.subHeading};
    }
`;

export function App() {
    const navigate = useNavigate();
    const [ipData, setIpData] = React.useState<IpData[]>([]);
    const [ipDataState, setIpDataState] = React.useState<'prefetch' | 'loading' | 'success' | 'error'>('prefetch');

    const onLookup = React.useCallback(async (ipsToLookup: IpAddress[]) => {
        const ipSet = _.uniqBy(ipsToLookup, 'ip');

        if (ipSet.length === 0) {
            return;
        }

        setIpDataState('loading');
        navigate('/results');

        if (ipSet.length === 1) {
            try {
                const { data: ipData } = await api.get<IpData>(`/ip/${ipSet[0].ip}`);

                ipData.tag = ipSet[0].tag;
                setIpData([ipData]);
            } catch (error) {
                const axiosErrorAssertion = error as AxiosError;
                if (axiosErrorAssertion?.response?.status === 404) {
                    setIpData([{
                        ...axiosErrorAssertion.response.data as Pick<IpNotFound, 'ip_address' | 'error'>,
                        status: 404,
                    }]);
                } else if (axiosErrorAssertion?.response?.status === 400) {
                    setIpData([{
                        ...axiosErrorAssertion.response.data as Pick<IpError, 'ip_address' | 'error'>,
                        status: 400,
                    }]);
                } else {
                    setIpDataState('error');
                }
            }
        } else {
            const { data: ipData } = await api.post<IpData[]>('/ips/', {
                ip_addresses: ipSet.map(({ ip }) => ip),
            });

            ipData.map((ipData, index) => {
                if (ipSet[index].tag) {
                    ipData.tag = ipSet[index].tag;
                }
            });
            setIpData(ipData);
        }

        setIpDataState('success');
    }, [setIpDataState, navigate]);

    return (
        <>
            <Global styles={rootCSS} />
            <Body>
                <Routes>
                    <Route path='/lookup/*' element={
                        <LookupView onLookup={onLookup}/>
                    } />

                    <Route path='/results/*' element={
                        <ResultsView 
                            ipData={ipData}
                            ipDataState={ipDataState}
                        />
                    } />

                    <Route path='*' element={
                        <Navigate to='/lookup' replace={true} />
                    } />
                </Routes>
            </Body>
            <Footer />
        </>
    );
}

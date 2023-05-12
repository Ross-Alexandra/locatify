import { AxiosError } from 'axios';
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
import {
    IpAddress,
    IpData,
    IpError,
    IpNotFound,
} from './types';

export function App() {
    const navigate = useNavigate();
    const [ipData, setIpData] = React.useState<IpData[]>([]);
    const [ipDataState, setIpDataState] = React.useState<'prefetch' | 'loading' | 'success' | 'error'>('prefetch');

    const onLookup = React.useCallback(async (ipsToLookup: IpAddress[]) => {
        if (ipsToLookup.length === 0) {
            return;
        }

        setIpDataState('loading');
        navigate('/results');

        if (ipsToLookup.length === 1) {
            try {
                const { data: ipData } = await api.get<IpData>(`/ip/${ipsToLookup[0].ip}`);

                ipData.tag = ipsToLookup[0].tag;
                setIpData([ipData]);
            } catch (error) {
                const axiosErrorAssertion = error as AxiosError;
                if (axiosErrorAssertion?.response?.status === 404) {
                    console.log(axiosErrorAssertion.response.data);
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
                ip_addresses: ipsToLookup.map(({ ip }) => ip),
            });

            ipData.map((ipData, index) => {
                if (ipsToLookup[index].tag) {
                    ipData.tag = ipsToLookup[index].tag;
                }
            });
            setIpData(ipData);
        }

        setIpDataState('success');
    }, [setIpDataState, navigate]);

    return (
        <>
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

import { getByText, render } from '@testing-library/react';

import { IpError } from '../../types';

import { ErrorCard } from './error-card';

test('ErrorCard should show the tag and ip address if a tag is provided', () => {
    const ipData: IpError = {
        status: 400,
        ip_address: '1.1.1.1',
        error: 'Invalid IP address',
        tag: 'test',
    };

    const { container } = render(
        <ErrorCard ipData={ipData} />
    );

    const title = `${ipData.tag} (${ipData.ip_address})`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('ErrorCard should show the ip address if no tag is provided', () => {
    const ipData: IpError = {
        status: 400,
        ip_address: '1.1.1.1',
        error: 'Invalid IP address',
    };

    const { container } = render(
        <ErrorCard ipData={ipData} />
    );

    const title = `${ipData.ip_address}`;
    expect(getByText(container, title)).toBeInTheDocument();
});

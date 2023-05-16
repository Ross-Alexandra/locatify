import { getByText, render } from '@testing-library/react';

import { IpNotFound } from '../../../types';

import { NotFoundCard } from '.';

test('NotFoundCard should show the tag and ip address if a tag is provided', () => {
    const ipData: IpNotFound = {
        status: 404,
        ip_address: '1.1.1.1',
        error: 'Invalid IP address',
        tag: 'test',
    };

    const { container } = render(
        <NotFoundCard ipData={ipData} />
    );

    const title = `${ipData.tag} (${ipData.ip_address})`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('NotFoundCard should show the ip address if no tag is provided', () => {
    const ipData: IpNotFound = {
        status: 404,
        ip_address: '1.1.1.1',
        error: 'Invalid IP address',
    };

    const { container } = render(
        <NotFoundCard ipData={ipData} />
    );

    const title = `${ipData.ip_address}`;
    expect(getByText(container, title)).toBeInTheDocument();
});

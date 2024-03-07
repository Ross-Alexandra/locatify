import { getByText, render } from '@testing-library/react';

import { IpSuccess } from '../../../types';

import { LocationCard } from '.';

test('LocationCard should show the tag and ip address if a tag is provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        tag: 'test',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `${ipData.tag} (${ipData.ip_address})`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show the ip address if no tag is provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `${ipData.ip_address}`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if the latitude or longitude is missing', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    expect(getByText(container, 'Location not found')).toBeInTheDocument();
});

test('LocationCard should show google maps if the latitude and longitude are provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        latitude: -33.8688,
        longitude: 151.2093,
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    expect(container.querySelector('iframe')).toBeInTheDocument();
});

test('LocationCard should show the city and country if they are provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        city: 'Sydney',
        country_code: 'AU',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `${ipData.city}, ${ipData.country_code}`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if the city is missing', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        country_code: 'AU',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `City not found, ${ipData.country_code}`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if the country is missing', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        city: 'Sydney',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `${ipData.city}, Country not found`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if neither the city nor the country are provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = 'City not found, Country not found';
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show the postal code if it is provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        postal_code: 'V1Y',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `${ipData.postal_code}`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if the postal code is missing', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = 'Postal code not found';
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show the accuracy radius if it is provided', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        accuracy_radius: 100,
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = `${ipData.accuracy_radius} km`;
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if the accuracy radius is missing', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = 'unknown km';
    expect(getByText(container, title)).toBeInTheDocument();
});

test('LocationCard should show a warning if the timezone is missing', () => {
    const ipData: IpSuccess = {
        status: 200,
        ip_address: '101.167.212.53',
        accuracy_radius: 100,
    };

    const { container } = render(
        <LocationCard ipData={ipData} />
    );

    const title = 'unknown';
    expect(getByText(container, title)).toBeInTheDocument();
});

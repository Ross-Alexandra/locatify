import _ from 'lodash';

import { LocationCard } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LocationCard> = {
    title: 'Results/Location Card',
    component: LocationCard,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LocationCard>;

export const Component: Story = {
    args: {
        ipData: {
            ip_address: '192.168.1.1',
            status: 200,
            tag: 'Internal IP',
            latitude: 0.01,
            longitude: 0.01,
            city: 'Null Island',
            country_code: 'NI',
            postal_code: '00000',
            time_zone: 'GMT',
            accuracy_radius: 0,
        },
    },
};

export const NoLocation: Story = _.omit(Component, ['args.ipData.latitude', 'args.ipData.longitude']);
export const NoCity: Story = _.omit(Component, ['args.ipData.city']);
export const NoCountry: Story = _.omit(Component, ['args.ipData.country_code']);
export const NoPostalCode: Story = _.omit(Component, ['args.ipData.postal_code']);
export const NoAccuracy: Story = _.omit(Component, ['args.ipData.accuracy_radius']);
export const NoTimeZone: Story = _.omit(Component, ['args.ipData.time_zone']);
export const NoCountryOrCity: Story = _.omit(Component, ['args.ipData.country_code', 'args.ipData.city']);

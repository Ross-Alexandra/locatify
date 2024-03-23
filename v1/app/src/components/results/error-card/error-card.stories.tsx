import { ErrorCard } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorCard> = {
    title: 'Results/Error Card',
    component: ErrorCard,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorCard>;

export const Component: Story = {
    args: {
        ipData: {
            ip_address: '1.1.1.1',
            status: 400,
            error: 'Invalid IP address',
            tag: 'A weird IP',
        },
    },
};

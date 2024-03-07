import { NotFoundCard } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NotFoundCard> = {
    title: 'Results/Not Found Card',
    component: NotFoundCard,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotFoundCard>;

export const Component: Story = {
    args: {
        ipData: {
            ip_address: '192.168.1.1',
            status: 404,
            error: 'Ip not found',
            tag: 'Internal IP',
        },
    },
};

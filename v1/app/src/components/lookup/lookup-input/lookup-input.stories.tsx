import { LookupInput } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LookupInput> = {
    title: 'Lookup/IP Input',
    component: LookupInput,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LookupInput>;

export const Component: Story = {};

import styled from '@emotion/styled';
import _ from 'lodash';

import { LookupViewChildCSS } from '../../../pages';
import { IpAddress } from '../../../types';

import { BulkLookup } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const StoryWrapper = styled.div`
    ${LookupViewChildCSS}
`;

const onLookup = async (ips: IpAddress[]) => _.noop(ips);

const meta: Meta<typeof BulkLookup> = {
    title: 'Lookup/Bulk Lookup',
    component: BulkLookup,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        onLookup: { control: { disable: true } },
    },
    decorators: [
        Story => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof BulkLookup>;

export const Component: Story = {
    args: {
        onLookup,
    },
};

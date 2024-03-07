import styled from '@emotion/styled';
import _ from 'lodash';

import { LookupViewChildCSS } from '../../../pages';
import { IpAddress } from '../../../types';

import { ManualLookup } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const StoryWrapper = styled.div`
    ${LookupViewChildCSS}
`;

const onLookup = async (ips: IpAddress[]) => _.noop(ips);

const meta: Meta<typeof ManualLookup> = {
    title: 'Lookup/Manual Lookup',
    component: ManualLookup,
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
type Story = StoryObj<typeof ManualLookup>;

export const Component: Story = {
    args: {
        onLookup,
    },
};

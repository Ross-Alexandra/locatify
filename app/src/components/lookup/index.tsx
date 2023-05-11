import styled from '@emotion/styled';
import React from 'react';

import { BulkIcon, SearchIcon } from '../../icons';
import { ipRegex } from '../../services/ip';
import { Button } from '../ui';
import { Input } from '../ui/input';

import { LookupInput } from './lookup-input';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;

    padding: 15px;
    border-radius: var(--border-radius);

    background-color: var(--background-color);

    .new-ip {
        margin-right: 29px;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        gap: 10px;

        align-self: end;
    }
`;

type LookupProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const Lookup: React.FC<LookupProps> = ({
    ...props
}) => {
    const [ips, setIps] = React.useState<string[]>([]);
    const [ipTags, setIpTags] = React.useState<Record<string, string>>({});

    const updateIp = React.useCallback((index: number, nextValue: string) => {
        setIps(previousIps => {
            const newIps = [...previousIps];
            newIps[index] = nextValue;

            return newIps;
        });
    }, [setIps]);

    const removeIp = React.useCallback((index: number) => {
        setIps(previousIps => {
            const newIps = [...previousIps];
            newIps.splice(index, 1);

            return newIps;
        });
    }, [setIps]);

    const setTag = React.useCallback((index: number, value: string) => {
        setIpTags(previousIpTags => {
            const ipToTag = ips[index];

            const newIpTags = { ...previousIpTags };
            newIpTags[ipToTag] = value;

            return newIpTags;
        });
    }, []);

    return (
        <Wrapper {...props}>
            <div className='title'>
                <h2>IP Lookup</h2>
                <p>
                    Enter as many IP addresses as you want to lookup.
                </p>
            </div>
            {ips.map((ip, i) => (
                <LookupInput
                    key={ip}
                    type="text"
                    value={ip}
                    onRemove={() => removeIp(i)}
                    onTagChange={(tag: string) => setTag(i, tag)}
                    onChange={e => {
                        const element = e.target as HTMLInputElement;
                        updateIp(i, element.value);
                    }}
                />
            ))}

            <Input
                className='new-ip'
                type="text"
                placeholder='IP Address'
                pattern={ipRegex.source}
                onKeyDown={e => {
                    const element = e.target as HTMLInputElement;

                    if (e.key === 'Enter') {
                        console.log(element.value);
                        setIps(previousIps => [...previousIps, element.value]);

                        setTimeout(() => element.value = '');
                    }
                }}
            />

            <div className='buttons'>
                <Button className='secondary'>
                    <BulkIcon color="var(--primary-color)" size={24} />
                    Bulk
                </Button>
                <Button disabled={ips.length === 0}>
                    <SearchIcon color="var(--background-color)" size={24} />
                    Search
                </Button>
            </div>
        </Wrapper>
    );
};

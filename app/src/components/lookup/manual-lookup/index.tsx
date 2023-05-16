import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BulkIcon, NewItemIcon, SearchIcon } from '../../../icons';
import { ipRegex } from '../../../services/ip';
import { theme } from '../../../theme';
import { IpAddress } from '../../../types';
import { Button } from '../../ui';
import { Input } from '../../ui/input';
import { LookupInput } from '../lookup-input';

const Wrapper = styled.div`
    .existing-ips {
        display: flex;
        flex-direction: column;
        gap: 10px;

        width: 100%;
        max-height: 50svh;
        overflow-y: auto;

        scrollbar-width: thin;
        scrollbar-color: var(--border-color) var(--layer-color);

        @media (max-width: ${theme.breakpoints.mobile}) {
            max-height: calc(50svh - 80px);
        }
    }

    .new-ip-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;

        svg {
            cursor: pointer;
        }
    }
`;

interface ManualLookupProps {
    onLookup: (ips: IpAddress[]) => Promise<void>;
}

export const ManualLookup: React.FC<ManualLookupProps> = ({
    onLookup,
}) => {
    const [ips, setIps] = React.useState<IpAddress[]>([]);
    const [inFlightIp, setInFlightIp] = React.useState<IpAddress | null>(null);

    const editInProgressIp = React.useCallback((newIp: string) => {
        setInFlightIp(previousIp => {
            if (!previousIp) {
                return {
                    id: uuidv4(),
                    ip: newIp,
                };
            }

            return {
                ...previousIp,
                ip: newIp,
            };
        });
    }, [setInFlightIp]);

    const appendIp = React.useCallback((newIp: IpAddress | null) => {
        setIps(previousIps => {
            const nextIp = newIp ?? {
                id: uuidv4(),
                ip: '',
            };

            return [...previousIps, nextIp];
        });
    }, [setIps]);

    const updateIp = React.useCallback((index: number, nextIp: string) => {
        setIps(previousIps => {
            const previousValue = previousIps[index];
            const newIps = [...previousIps];

            newIps[index] = {
                ...previousValue,
                ip: nextIp,
            };

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

    const setTag = React.useCallback((index: number, newTag: string) => {
        setIps(previousIps => {
            const ipBeingTagged = previousIps[index];

            const newIps = [...previousIps];
            newIps[index] = {
                ...ipBeingTagged,
                tag: newTag,
            };

            return newIps;
        });
    }, [setIps]);

    const removeTag = React.useCallback((index: number) => {
        setTag(index, '');
    }, [setTag]);

    const filledIps = React.useMemo(() => {
        const createdIps = ips.filter(({ ip }) => ip !== '');

        return [...createdIps, inFlightIp].filter(Boolean) as IpAddress[];
    }, [ips, inFlightIp]);

    const duplicatesExist = React.useMemo(() => {
        const ipAddresses = filledIps.map(({ ip }) => ip);
        const uniqueIps = new Set(ipAddresses);

        return ipAddresses.length !== uniqueIps.size;
    }, [filledIps]);

    return (
        <Wrapper className='view-content'>
            <div className='title'>
                <h2>IP Lookup</h2>
                <p>
                    Manually enter IP addresses, or use bulk lookup to upload a file of IP addresses.
                </p>
            </div>

            <div className='existing-ips'>
                {ips.map((ip, i) => (
                    <LookupInput
                        key={ip.id}
                        type="text"
                        value={ip.ip}
                        placeholder='IP Address'
                        onRemove={() => removeIp(i)}
                        onChange={e => {
                            const element = e.target as HTMLInputElement;
                            updateIp(i, element.value);
                        }}

                        tag={ip.tag}
                        onTagChange={(tag: string) => setTag(i, tag)}
                        onRemoveTag={() => removeTag(i)}
                    />
                ))}
            </div>

            <div className='new-ip-container'>
                <Input
                    id='new-ip'
                    type="text"
                    placeholder='IP Address'
                    value={inFlightIp?.ip ?? ''}
                    onChange={e => {
                        const element = e.target as HTMLInputElement;
                        editInProgressIp(element.value);
                    }}
                    pattern={ipRegex.source}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            appendIp(inFlightIp);

                            setInFlightIp(null);
                        }
                    }}
                />
                <NewItemIcon 
                    width={24}
                    color="var(--text-color)"
                    onClick={() => {
                        appendIp(inFlightIp);
                        setInFlightIp(null);
                    }}
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            appendIp(inFlightIp);
                            setInFlightIp(null);
                        }
                    }}
                />
            </div>

            <div className='buttons'>
                <Button
                    as='link' 
                    to='/lookup/bulk'
                    className='secondary'
                    title="Upload and search many IPs at once"
                >
                    <BulkIcon color="var(--primary-color)" size={24} />
                    Bulk
                </Button>

                {/*
                    Only disable the search button if there are no ips, as we don't want to
                    prevent users from entering unexpected but valid IPs.

                    The regex pattern on the input should detect invalid IPs, but just in case
                    there is a bug in the regex, we don't want to prevent users from entering
                    valid IPs.
                */}
                <Button 
                    disabled={filledIps.length === 0}
                    title={filledIps.length === 0 ? 'Enter an IP address to search' : undefined}
                    onClick={() => onLookup(filledIps)}
                >
                    <SearchIcon color="var(--background-color)" size={24} />
                    Search
                </Button>
            </div>

            <div className='warnings'>
                {duplicatesExist && (
                    <p>
                        Only the first instance of duplicate IPs will be searched.
                    </p>
                )}
                {ips.length > 3 && (
                    <p>
                        Consider using bulk uploads when searching multiple ips. 
                    </p>
                )}
            </div>
        </Wrapper>
    );
};

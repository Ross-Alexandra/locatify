import styled from '@emotion/styled';
import * as csv from 'csv-parse/browser/esm/sync';
import _ from 'lodash';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ManualIcon, SearchIcon } from '../../icons';
import { FileUploadIcon } from '../../icons/file-upload-icon';
import { theme } from '../../theme';
import { IpAddress } from '../../types';
import { Button } from '../ui';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';

const Wrapper = styled.div`
    .upload {
        display: flex;
        flex-direction: column;
    }
    
    .file-uploader {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 10px;

        border: 1px dashed var(--border-color);
        border-radius: var(--border-radius-small);
        padding: 15px;      
    }

    input[type="file"] {
        position: absolute;
        opacity: 0;

        inset: 0;
        width: 100%;
        height: 100%;

        z-index: 1;

        cursor: pointer;

        outline: 3px solid var(--primary-color);
    }

    .ips {
        display: flex;
        flex-direction: column;

        width: 100%;

        .body {
            display: flex;
            flex-direction: column;
            gap: 10px;

            max-height: 300px;
            overflow-y: auto;
            
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) var(--layer-color);

            @media (max-width: ${theme.breakpoints.mobile}) {
                max-height: 300px;
            }
        }

        .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 10px;

            border-bottom: 1px solid var(--border-color);
        }

    }
`;

type BulkLookupProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    onLookup: (ips: IpAddress[]) => Promise<void>;
}

export const BulkLookup: React.FC<BulkLookupProps> = ({
    onLookup,
    ...props
}) => {
    const [parsing, setParsing] = React.useState(false);

    const [ips, setIps] = React.useState<IpAddress[]>([]);
    const onFileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;
            const records = csv.parse(text, {
                columns: true,
                skip_empty_lines: true,
                ltrim: true,
                rtrim: true,
            });

            const defaultedRecords = records.map((record: unknown) => _.defaults(record, {
                id: uuidv4(),
                ip: '',
                tag: '',   
            }));

            const safeRecords: IpAddress[] = _.map(
                defaultedRecords,
                record => _.pick(record, ['id', 'ip', 'tag'])
            );

            setIps(safeRecords);
            setParsing(false);
        };

        const file = event.target.files?.[0];
        if (file) {
            setParsing(true);
            reader.readAsText(file);
        }
    }, [setIps, setParsing]);

    const filledIps = React.useMemo(() => {
        return ips.filter(({ ip }) => ip !== '');
    }, [ips]);

    const duplicatesExist = React.useMemo(() => {
        const ipAddresses = filledIps.map(({ ip }) => ip);
        const uniqueIps = new Set(ipAddresses);

        return ipAddresses.length !== uniqueIps.size;
    }, [filledIps]);
    
    return (
        <Wrapper className='view-content' {...props}>
            <div className='title'>
                <h2>Bulk Lookup</h2>
                <p>
                    Upload a file containing many IPs to search.
                </p>
            </div>

            <div className='upload'>
                { parsing ? (
                    <Spinner />
                ) : (
                    <div 
                        className='file-uploader'
                        tabIndex={0}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                const input: HTMLInputElement | null = e.currentTarget.querySelector('input[type="file"]');

                                if (input) {
                                    input.click();
                                }
                            }
                        }}
                    >
                        <h3>
                            Drag &amp; Drop
                        </h3>
                        <FileUploadIcon size={35} color="var(--text-color)" />

                        <Input
                            tabIndex={-1}
                            type="file"
                            accept=".csv"
                            onChange={onFileChange}
                        />
                    </div>
                )}

                <a
                    href="/example.csv"
                    target='_blank'
                >
                    Download Example
                </a>
            </div>

            {filledIps.length > 0 && (
                <div className='ips'>
                    <div className='row'>
                        <h3>IP</h3>
                        <h3>Label</h3>
                    </div>
                    <div className='body'>
                        {ips.map(({ id, ip, tag }) => (
                            <div className='row' key={id}>
                                <p>
                                    {ip}
                                </p>
                                <p>
                                    {tag}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='buttons'>
                <Button
                    as='link' 
                    to='/lookup'
                    className='secondary'
                    title="Manually enter IPs to search"
                >
                    <ManualIcon color="var(--primary-color)" size={24} />
                    Manual
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
                    title={filledIps.length === 0 ? 'Upload a file with IPs to process' : undefined}
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
            </div>
        </Wrapper>
    );
};

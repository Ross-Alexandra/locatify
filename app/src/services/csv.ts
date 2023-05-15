import { parse } from 'csv-parse/browser/esm/sync';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { IpAddress } from '../types';

export function parseCSV(csvFile: File): Promise<unknown[]> {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;
            const records: unknown[] = parse(text, {
                columns: true,
                skip_empty_lines: true,
                ltrim: true,
                rtrim: true,
            });

            resolve(records);
        };
    
        reader.readAsText(csvFile);
    });
}

function isIpAddress(record: unknown): record is IpAddress {
    if (_.isEmpty(record)) {
        return false;
    }

    const ipAddress = record as IpAddress;
    return ipAddress.ip !== '';
}

export function csvRecordToIpAddressList(records: unknown[]): IpAddress[] {
    // Ensures that each record has the required fields for an IpAddress
    const ipAddressSupers = records
        .map((record: unknown) => 
            _.defaults(record, {
                id: uuidv4(),
                ip: '',
            })
        );

    // Removes any fields that are not part of an IpAddress
    const ipAddresses: unknown[] = _.map(
        ipAddressSupers,
        record => _.pick(record, ['id', 'ip', 'tag'])
    );

    return ipAddresses.filter(isIpAddress);
}

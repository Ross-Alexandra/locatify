export interface IpAddress {
    id: string; // Stable ID for the IP address so we can track it's input
    ip: string;
    tag?: string;
}

export * from './manual-lookup';
export * from './bulk-lookup';

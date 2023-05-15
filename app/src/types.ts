export interface IpAddress {
    id: string; // Stable ID for the IP address so we can track it's input
    ip: string;
    tag?: string;
}

export interface IpSuccess {
    ip_address: string,
    country_code?: string,
    postal_code?: string,
    city?: string,
    time_zone?: string,
    latitude?: number,
    longitude?: number,
    accuracy_radius?: number,
    status?: 200;
    tag?: string;
}

export interface IpError {
    status: 400;
    ip_address: string;
    error: string;
    tag?: string;
}

export interface IpNotFound {
    status: 404;
    ip_address: string;
    error: string;
    tag?: string;
}

export type IpData = IpSuccess | IpError | IpNotFound;

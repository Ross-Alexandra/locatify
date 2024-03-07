import React from 'react';

import { IpData } from '../../types';

import { ErrorCard } from './error-card';
import { LocationCard } from './location-card';
import { NotFoundCard } from './not-found-card';

type IpCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipData: IpData;
}

export const IpCard: React.FC<IpCardProps> = ({
    ipData,
    ...props
}) => {
    switch (ipData.status) {
        case 400:
            return <ErrorCard ipData={ipData} {...props} />;
        case 404:
            return <NotFoundCard ipData={ipData} {...props } />;
        default:
            return <LocationCard ipData={ipData} { ...props } />;
    }
};

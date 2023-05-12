import styled from '@emotion/styled';
import moment from 'moment-timezone';
import React from 'react';

import { AccuracyIcon, LocationIcon, PostalCodeIcon } from '../../icons';
import { ClockIcon } from '../../icons/clock-icon';
import { getMapUrl } from '../../services/maps';
import { theme } from '../../theme';
import { IpSuccess } from '../../types';

const Wrapper = styled.div`
    ${theme.card}

    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 10px;

    iframe {
        width: 100%;
        height: 100%;

        border: none;
        border-radius: var(--border-radius-small);
    }

    .location-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .accuracy,
    .location,
    .postal-code,
    .time {
        display: flex;
        flex-direction: row;
        gap: 5px;

        text-transform: capitalize;

        h3, p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

type LocationCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'> & {
    ipData: IpSuccess;
}

function getCurrentTimeInZone(zone?: string) {
    if (!zone) return 'unknown';

    const now = moment();
    const time = now.tz(zone).format('h:mm A ${} (Z)');

    return time.replaceAll('${}', zone);
}

export const LocationCard: React.FC<LocationCardProps> = ({
    ipData,
    ...props
}) => {
    return (
        <Wrapper {...props}>
            <div className='google-embed'>
                <iframe
                    title='Google Maps'
                    src={getMapUrl(ipData.latitude, ipData.longitude)}
                />
            </div>

            <div className='location-info'>
                {ipData.tag ? (
                    <h2>{ipData.tag} ({ipData.ip_address})</h2>
                ) : (
                    <h2>{ipData.ip_address}</h2>
                )}
                
                <div className='location'>
                    <LocationIcon 
                        title='Location'
                        color={theme.colors.text}
                        size={24}
                    />
                    <h3>{ipData.city ?? 'City not found'}, {ipData.country_code ?? 'Country not found'}</h3>
                </div>
                
                <div className='postal-code'>
                    <PostalCodeIcon
                        title='Postal code'
                        color={theme.colors.text}
                        size={24}
                    />
                    <p>{ipData.postal_code ?? 'Postal code not found'}</p>
                </div>

                <div className='accuracy'>
                    <AccuracyIcon
                        title='Location accuracy'
                        color={theme.colors.text}
                        size={24}
                    />
                    <p>{ipData.accuracy_radius ?? 'unknown'} km</p>
                </div>

                <div className='time'>
                    <ClockIcon
                        title='Local time'
                        color={theme.colors.text}
                        size={24}
                    />
                    <p>{getCurrentTimeInZone(ipData.time_zone)}</p>
                </div>
            </div>
        </Wrapper>
    );
};

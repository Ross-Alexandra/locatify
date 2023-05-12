import React from 'react';

import type { IconProps } from '.';

export const BulkIcon: React.FC<IconProps> = ({
    color,
    size,
    title,
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            {...props}

            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m21.011 8.498h-18.009c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.553-.449-.991-.988-.998zm-.92 3.5-1.2 7.5h-13.782l-1.2-7.5zm-.076-6.517h-16.029c-.524 0-1.001.422-1.001 1.007 0 .081-.011.016.139 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.917c.057-.436.054-.426.054-.482 0-.671-.575-1.001-1.001-1.001h-14.023c-.536 0-1.001.433-1.001 1 0 .056-.004.043.054.483z"
                fillRule="nonzero"
                fill={color}    
            />
            {title && <title>{title}</title>}
        </svg>
    );
};

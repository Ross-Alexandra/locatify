import React from 'react';

import type { IconProps } from '.';

export const ClockIcon: React.FC<IconProps> = ({
    color,
    size,
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            {...props}

            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"
                fill={color}    
            />
        </svg>
    );
};

import React from 'react';

import type { IconProps } from '.';

export const AccuracyIcon: React.FC<IconProps> = ({
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

            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm9.949 11h-2.019c-.451-3.617-3.313-6.479-6.93-6.931v-2.018c4.717.47 8.479 4.232 8.949 8.949zm-4.039 2c-.424 2.507-2.403 4.486-4.91 4.91v-2.91h-2v2.91c-2.507-.424-4.486-2.403-4.91-4.91h2.91v-2h-2.91c.424-2.507 2.403-4.486 4.91-4.91v2.91h2v-2.91c2.507.423 4.486 2.402 4.91 4.91h-2.91v2h2.91zm-6.91-10.949v2.019c-3.617.451-6.479 3.313-6.931 6.93h-2.018c.47-4.717 4.232-8.479 8.949-8.949zm-8.949 10.949h2.019c.452 3.617 3.313 6.479 6.931 6.931v2.019c-4.718-.471-8.48-4.233-8.95-8.95zm10.949 8.949v-2.019c3.617-.452 6.479-3.313 6.931-6.931h2.019c-.471 4.718-4.233 8.48-8.95 8.95z"
                fill={color}    
            />
            {title && <title>{title}</title>}
        </svg>
    );
};
import React from 'react';

import type { IconProps } from '.';

export const FileUploadIcon: React.FC<IconProps> = ({
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
                d="M23 17h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2zm-7 5v2h-15v-24h10.189c3.163 0 9.811 7.223 9.811 9.614v2.386h-2v-1.543c0-4.107-6-2.457-6-2.457s1.518-6-2.638-6h-7.362v20h13z"
                fill={color}    
            />
        </svg>
    );
};

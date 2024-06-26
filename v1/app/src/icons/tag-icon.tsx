import React from 'react';

import { IconProps } from '.';

export const TagIcon = React.forwardRef<SVGSVGElement, IconProps>(({
    size,
    color,
    title,
    ...props
}, ref) => {
    return (
        <svg
            width={size}
            height={size}
            {...props}
            
            ref={ref}
            viewBox='0 0 24 24'
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <path
                d="M14.101 24l-14.101-14.105v-9.895h9.855l14.145 14.101c-3.3 3.299-6.6 6.599-9.899 9.899zm-4.659-23h-8.442v8.481l13.101 13.105 8.484-8.484c-4.381-4.368-8.762-8.735-13.143-13.102zm-1.702 3.204c.975.976.975 2.56 0 3.536-.976.975-2.56.975-3.536 0-.976-.976-.976-2.56 0-3.536s2.56-.976 3.536 0zm-.708.707c.586.586.586 1.536 0 2.121-.585.586-1.535.586-2.121 0-.585-.585-.585-1.535 0-2.121.586-.585 1.536-.585 2.121 0z"
                fill={color}
            />
            {title && <title>{title}</title>}
        </svg>
    );
});
TagIcon.displayName = 'TagIcon';

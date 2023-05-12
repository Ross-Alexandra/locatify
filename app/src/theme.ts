import { css } from '@emotion/react';

export const theme = {
    breakpoints: {
        mobile: '600px',
        tablet: '960px',
        laptop: '1280px',
        desktop: '1920px',
    },
    colors: {
        primary: 'var(--primary-color)',
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        error: 'var(--error-color)',
        warning: 'var(--warning-color)',
        layer: 'var(--layer-color)',
        border: 'var(--border-color)',
    },
    card: css`
        background-color: var(--layer-color);
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        
        padding: 15px;
        border: 1px solid var(--border-color);
        backdrop-filter: saturate(180%) blur(20px);

        height: 400px;
        width: 100%;
    `,
};

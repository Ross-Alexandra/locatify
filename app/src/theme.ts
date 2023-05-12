import { css } from '@emotion/react';

export const theme = {
    breakpoints: {
        mobile: '600px',
        tablet: '960px',
        laptop: '1280px',
        desktop: '1920px',
    },
    colors: {
        primary: '#5b9cff',
        background: '#1a1a1d',
        text: '#f5f5f5',
        error: 'red',
        warning: '#cccc00',
        layer: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        focusOutline: '#ffbe5b',
    },
    sizing: {
        footerHeight: '50px',
        borderRadius: '10px',
        borderRadiusSmall: '5px',
        paragraph: '1rem',
        primaryHeading: '2rem',
        sectionHeading: '1.5rem',
        subHeading: '1.25rem',
    },
    fonts: {
        primary: "'Poppins', sans-serif",
    },
    card: css`
        background-color: var(--layer-color);
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        
        padding: 15px;
        border: 1px solid var(--border-color);
        backdrop-filter: saturate(180%) blur(20px);

        z-index: 10;
    `,
};

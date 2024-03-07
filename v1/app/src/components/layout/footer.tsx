import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    height: var(--footer-height);
    width: 100%;

    background-color: var(--layer-color);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 1px 0 var(--border-color);

    .inner-header {
        display: grid;
        place-items: center;

        width: 100%;
        max-width: 1920px;

        padding: 5px 3rem;
    }
`;

type FooterProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const Footer: React.FC<FooterProps> = ({
    ...props
}) => {
    return (
        <Wrapper {...props}>
            <div className='inner-header'>
                <p>&copy; 2023 Ross Alexandra</p>
            </div>
        </Wrapper>
    );
};

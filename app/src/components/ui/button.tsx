import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.button`
    appearance: none;
    outline: transparent;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    padding: 5px 10px;
    border-radius: var(--border-radius);
    
    background-color: var(--primary-color);
    color: var(--background-color);
    border: 1px solid var(--border-color);

    &.secondary {
        background-color: var(--background-color);
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
    }

    text-transform: capitalize;
    font-weight: 700;

    cursor: pointer;

    transition: filter 0.2s ease-in-out;
    &:hover {
        filter: brightness(1.2);
    }

    &:active {
        filter: brightness(0.8);
    }

    &:disabled {
        filter: grayscale(1);
        cursor: not-allowed;
    }
`;

type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'type'>

export const Button: React.FC<ButtonProps> = ({
    children,
    ...props
}) => {
    return (
        <Wrapper {...props}>
            {children}
        </Wrapper>
    );
};

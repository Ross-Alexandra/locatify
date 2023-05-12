import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const WrapperCss = css`
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

    &:focus-visible {
        outline: 3px solid var(--focus-outline);
    }
`;

const ButtonWrapper = styled.button`
    ${WrapperCss}
`;

const AnchorWrapper = styled.a`
    ${WrapperCss}

    text-decoration: none;
`;

const LinkWrapper = styled(Link)`
    ${WrapperCss}

    text-decoration: none;
`;

type ButtonElementProps = Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'type'>;
type AnchorElementProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'as'>;
type ButtonProps = (ButtonElementProps | AnchorElementProps | LinkProps) & {
    as?: 'button' | 'a' | 'link';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    as='button',
    ...props
}) => {
    switch (as) {
        case 'button':
            return (
                <ButtonWrapper {...(props as ButtonElementProps)}>
                    {children}
                </ButtonWrapper>
            );
        case 'a':
            return (
                <AnchorWrapper {...(props as AnchorElementProps)}>
                    {children}
                </AnchorWrapper>
            );
        case 'link':
            return (
                <LinkWrapper {...(props as LinkProps)}>
                    {children}
                </LinkWrapper>
            );
    }
};

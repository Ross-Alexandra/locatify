import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.input`
    appearance: none;
    outline: transparent;

    padding: 5px 15px;
    border-radius: var(--border-radius-small);

    border: 1px solid var(--border-color);
    background-color: var(--layer-color);
    color: var(--text-color);

    &:focus {
        border-color: var(--primary-color);
    }

    &:invalid {
        border-color: var(--error-color);
    }
`;

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'as'>

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <Wrapper ref={ref} {...props} />
));
Input.displayName = 'Input';

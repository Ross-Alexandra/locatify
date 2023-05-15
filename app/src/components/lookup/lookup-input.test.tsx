import { render } from '@testing-library/react';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';

import { LookupInput } from './lookup-input';

test('Ip inputs with invalid ips should have error-color borders', () => {
    const { container } = render(<LookupInput
        tag=''
        onTagChange={_.noop}
        onRemoveTag={_.noop}
        onRemove={_.noop}
    />);

    const ipInput = container.querySelector('.ip-input') as HTMLInputElement;
    expect(ipInput).not.toBeNull();
    expect(ipInput).toBeInTheDocument();

    act(() => {
        ipInput.value = 'not-an-ip';
    });

    expect(ipInput.validity.valid).toBeFalsy();
    expect(ipInput).toHaveStyle('border-color: var(--error-color)');
});

test('Ip inputs with valid ipv4s should have primary-color borders', () => {
    const { container } = render(<LookupInput
        tag=''
        onTagChange={_.noop}
        onRemoveTag={_.noop}
        onRemove={_.noop}
    />);

    const ipInput = container.querySelector('.ip-input') as HTMLInputElement;
    expect(ipInput).not.toBeNull();
    expect(ipInput).toBeInTheDocument();

    act(() => {
        ipInput.value = '1.1.1.1';
    });

    expect(ipInput.validity.valid).toBeTruthy();
    expect(ipInput).toHaveStyle('border-color: var(--primary-color)');
});

test('Ip inputs with valid ipv6s should have primary-color borders', () => {
    const { container } = render(<LookupInput
        tag=''
        onTagChange={_.noop}
        onRemoveTag={_.noop}
        onRemove={_.noop}
    />);

    const ipInput = container.querySelector('.ip-input') as HTMLInputElement;
    expect(ipInput).not.toBeNull();
    expect(ipInput).toBeInTheDocument();

    act(() => {
        ipInput.value = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
    });
    
    expect(ipInput.validity.valid).toBeTruthy();
    expect(ipInput).toHaveStyle('border-color: var(--primary-color)');
});

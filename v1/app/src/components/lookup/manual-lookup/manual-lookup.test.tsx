import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import { ManualLookup } from '.';

const mockOnLookup = jest.fn();

test('Search button is disabled when no IPs have been entered', () => {
    render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeDisabled();
});

test('Search button is enabled when a user starts typing an IP', () => {
    const { container } = render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const ipInput = container.querySelector('#new-ip') as HTMLInputElement;
    act(() => {
        fireEvent.change(ipInput, { target: { value: '1' } });
    });

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeEnabled();
});

test('Search includes the IPs that have been previously entered and the one that is currently being entered', () => {
    const { container } = render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const ipInput = container.querySelector('#new-ip') as HTMLInputElement;
    act(() => {
        fireEvent.change(ipInput, { target: { value: '1.1.1.1' } });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.change(ipInput, { target: { value: '1.1.1.2' } });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.change(ipInput, { target: { value: '1.1.1.3' } });
    });

    const searchButton = screen.getByText('Search');
    searchButton.click();

    expect(mockOnLookup).toHaveBeenCalledWith([{
        id: expect.any(String),
        ip: '1.1.1.1',
    }, {
        id: expect.any(String),
        ip: '1.1.1.2',
    }, {
        id: expect.any(String),
        ip: '1.1.1.3',
    }]);
});

test('Search button is disabled when only blank IPs have been entered', () => {
    const { container } = render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const ipInput = container.querySelector('#new-ip') as HTMLInputElement;

    act(() => {
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
    });

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeDisabled();
});

test('Search button is enabled when at least one valid IP has been entered', () => {
    const { container } = render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const ipInput = container.querySelector('#new-ip') as HTMLInputElement;

    act(() => {
        fireEvent.change(ipInput, { target: { value: '1.1.1.1' } });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
    });

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeEnabled();
});

test('Search button is enabled when at least one invalid IP has been entered', () => {
    const { container } = render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const ipInput = container.querySelector('#new-ip') as HTMLInputElement;

    act(() => {
        fireEvent.change(ipInput, { target: { value: 'not-an-ip' } });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
        fireEvent.keyDown(ipInput, { key: 'Enter' });
    });

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeEnabled();
});

test('The new tag input is focused when the tag button is clicked', () => {
    const { container } = render(
        <BrowserRouter>
            <ManualLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const ipInput = container.querySelector('#new-ip') as HTMLInputElement;
    act(() => {
        fireEvent.keyDown(ipInput, { key: 'Enter' });
    });

    const tagButton = container.querySelector('.tag-icon') as SVGSVGElement;
    act(() => {
        fireEvent.click(tagButton);
    });

    const newTagInput = container.querySelector('.tag-input') as HTMLInputElement;
    expect(newTagInput).toHaveFocus();
});

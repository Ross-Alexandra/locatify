import {
    findByTestId,
    findByText,
    getByText,
    render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import { parseCSV, csvRecordToIpAddressList } from '../../services/csv';

import { BulkLookup } from './bulk-lookup';

jest.mock('../../services/csv', () => ({
    parseCSV: jest.fn(),
    csvRecordToIpAddressList: jest.fn(),
}));
const mockedParseCSV = parseCSV as jest.MockedFunction<typeof parseCSV>;
const mockedCsvRecordToIpAddressList = csvRecordToIpAddressList as jest.MockedFunction<typeof csvRecordToIpAddressList>;

const mockOnLookup = jest.fn();

test('Uploading an empty file should not add new ips', () => {
    mockedParseCSV.mockResolvedValue([]);
    mockedCsvRecordToIpAddressList.mockReturnValue([]);

    const file = new File([''], 'empty.csv', { type: 'text/csv' });

    const { container } = render(
        <BrowserRouter>
            <BulkLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );
    
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).not.toBeNull();

    act(() => {
        userEvent.upload(fileInput, file);
    });

    const ipTable = container.querySelector('.ips') as HTMLDivElement;
    expect(ipTable).toBeNull();
});

test('Uploading a file with one ip should add one ip', async () => {
    const parsedRecords = [{ ip: '1.1.1.1', tag: 'test' }];
    const ipAddresses = [{ id: 'foo', ...parsedRecords[0] }];
    mockedParseCSV.mockResolvedValue(parsedRecords);
    mockedCsvRecordToIpAddressList.mockReturnValue(ipAddresses);

    // File is not actually used due to mocks, so we can pass an empty file.
    // To see the testing around parsing, see the services/csv.test.ts file.
    const file = new File([''], 'empty.csv', { type: 'text/csv' });

    const { container } = render(
        <BrowserRouter>
            <BulkLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).not.toBeNull();

    act(() => {
        userEvent.upload(fileInput, file);
    });

    const ipTable = await findByTestId(container, 'bulk-ip-table');
    expect(ipTable).not.toBeNull();

    const ipRows = ipTable.querySelectorAll('.row');
    // Header row & one ip row
    expect(ipRows.length).toBe(2);

    expect(getByText(container, ipAddresses[0].ip)).toBeInTheDocument();
    expect(getByText(container, ipAddresses[0].tag)).toBeInTheDocument();
});

test('Uploading a file with multiple ips should add multiple ips', async () => {
    const parsedRecords = [
        { ip: '1.1.1.1', tag: 'test-1' },
        { ip: '1.1.1.2', tag: 'test-2' },
        { ip: '1.1.1.3', tag: 'test-3' },
    ];
    const ipAddresses = [
        { id: 'foo', ...parsedRecords[0] },
        { id: 'bar', ...parsedRecords[1] },
        { id: 'baz', ...parsedRecords[2] },
    ];

    mockedParseCSV.mockResolvedValue(parsedRecords);
    mockedCsvRecordToIpAddressList.mockReturnValue(ipAddresses);

    // File is not actually used due to mocks, so we can pass an empty file.
    // To see the testing around parsing, see the services/csv.test.ts file.
    const file = new File([''], 'empty.csv', { type: 'text/csv' });

    const { container } = render(
        <BrowserRouter>
            <BulkLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).not.toBeNull();

    act(() => {
        userEvent.upload(fileInput, file);
    });

    const ipTable = await findByTestId(container, 'bulk-ip-table');
    expect(ipTable).not.toBeNull();

    const ipRows = ipTable.querySelectorAll('.row');
    // Header row & three ip rows
    expect(ipRows.length).toBe(4);

    expect(getByText(container, ipAddresses[0].ip)).toBeInTheDocument();
    expect(getByText(container, ipAddresses[0].tag)).toBeInTheDocument();
    expect(getByText(container, ipAddresses[1].ip)).toBeInTheDocument();
    expect(getByText(container, ipAddresses[1].tag)).toBeInTheDocument();
    expect(getByText(container, ipAddresses[2].ip)).toBeInTheDocument();
    expect(getByText(container, ipAddresses[2].tag)).toBeInTheDocument();
});

test('Search button should be enabled after uploading at least 1 IP', async () => {
    const parsedRecords = [
        { ip: '1.1.1.1', tag: 'test-1' },
    ];

    const ipAddresses = [
        { id: 'foo', ...parsedRecords[0] },
    ];

    mockedParseCSV.mockResolvedValue(parsedRecords);
    mockedCsvRecordToIpAddressList.mockReturnValue(ipAddresses);

    // File is not actually used due to mocks, so we can pass an empty file.
    // To see the testing around parsing, see the services/csv.test.ts file.
    const file = new File([''], 'empty.csv', { type: 'text/csv' });

    const { container } = render(
        <BrowserRouter>
            <BulkLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).not.toBeNull();

    act(() => {
        userEvent.upload(fileInput, file);
    });

    const ipTable = await findByTestId(container, 'bulk-ip-table');
    expect(ipTable).not.toBeNull();

    const searchButton = await findByText(container, 'Search');
    expect(searchButton).not.toBeNull();
    expect(searchButton).toBeEnabled();
});

test('Search button should be disabled if no IPs are uploaded', () => {
    const { container } = render(
        <BrowserRouter>
            <BulkLookup onLookup={mockOnLookup} />
        </BrowserRouter>
    );

    const searchButton = getByText(container, 'Search');
    expect(searchButton).not.toBeNull();
    expect(searchButton).toBeDisabled();
});

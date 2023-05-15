// csv-parse is a third-party library that is used to parse CSV files.
// It does not play well with Jest, so we need to mock it out.
jest.mock('csv-parse/browser/esm/sync', () => ({
    parse: jest.fn(),
}));

// Note, the parseCSV function does not have unit tests, as
// it is a wrapper around a third-party library.
import { csvRecordToIpAddressList } from './csv';

describe('csvRecordToIpAddressList', () => {
    it('should return an empty array when given an empty array', () => {
        expect(csvRecordToIpAddressList([])).toEqual([]);
    });

    it('should return an empty array when given an array of empty objects', () => {
        expect(csvRecordToIpAddressList([{}, {}, {}])).toEqual([]);
    });

    it('should return an empty array when given an array of objects with no ip field', () => {
        expect(csvRecordToIpAddressList([{ tag: 'tag' }, { tag: 'tag' }, { tag: 'tag' }])).toEqual([]);
    });

    it('should return an empty array when given an array of objects with empty ip fields', () => {
        expect(csvRecordToIpAddressList([{ ip: '', tag: 'tag' }, { ip: '', tag: 'tag' }, { ip: '', tag: 'tag' }])).toEqual([]);
    });

    it("should return an empty array when given an array of object which don't match the IpAddress interface", () => {
        expect(csvRecordToIpAddressList([{ foo: 'bar' }, { foo: 'bar' }, { foo: 'bar' }])).toEqual([]);
    });

    it('should return an array of IpAddresses when given an array of objects with ip fields', () => {
        expect(csvRecordToIpAddressList([{ ip: '1.1.1.1' }, { ip: '1.1.1.2' }])).toEqual([{
            id: expect.any(String),
            ip: '1.1.1.1',
        }, {
            id: expect.any(String),
            ip: '1.1.1.2',
        }]);
    });

    it('should return an array of IpAddresses with tags when given an array of objects with ip and tag fields', () => {
        expect(csvRecordToIpAddressList([
            { ip: '1.1.1.1', tag: 'foo' },
            { ip: '1.1.1.2', tag: 'bar' },
        ])).toEqual([{
            id: expect.any(String),
            ip: '1.1.1.1',
            tag: 'foo',
        }, {
            id: expect.any(String),
            ip: '1.1.1.2',
            tag: 'bar',
        }]);
    });

    it('should return an array of IpAddresses, with and without tags depending on the source records', () => {
        expect(csvRecordToIpAddressList([
            { ip: '1.1.1.1', tag: 'foo' },
            { ip: '1.1.1.2', tag: 'bar' },
            { ip: '1.1.1.3' },
        ])).toEqual([{
            id: expect.any(String),
            ip: '1.1.1.1',
            tag: 'foo',
        }, {
            id: expect.any(String),
            ip: '1.1.1.2',
            tag: 'bar',
        }, {
            id: expect.any(String),
            ip: '1.1.1.3',
        }]);
    });

    it('should automatically remove any fields that are not part of an IpAddress', () => {
        expect(csvRecordToIpAddressList([
            { ip: '1.1.1.1', tag: 'foo' },
            { ip: '1.1.1.2', tag: 'bar' },
            { ip: '1.1.1.3', extra: 'stuff' },
        ])).toEqual([{
            id: expect.any(String),
            ip: '1.1.1.1',
            tag: 'foo',
        }, {
            id: expect.any(String),
            ip: '1.1.1.2',
            tag: 'bar',
        }, {
            id: expect.any(String),
            ip: '1.1.1.3',
        }]);
    });
});

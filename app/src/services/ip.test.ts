import { stringIsIP } from './ip';

describe('stringIsIP', () => {
    it('Should return true for valid IPv4', () => {
        expect(stringIsIP('1.1.1.1')).toBe(true);
        expect(stringIsIP('192.168.1.1')).toBe(true);
    });

    it('Should return false if an octet is greater than 255 in IPv4', () => {
        expect(stringIsIP('256.1.1.1')).toBe(false);
        expect(stringIsIP('1.256.1.1')).toBe(false);
        expect(stringIsIP('1.1.256.1')).toBe(false);
        expect(stringIsIP('1.1.1.256')).toBe(false);
    });

    it('Should return false if an octet is less than 0 in IPv4', () => {
        expect(stringIsIP('-1.1.1.1')).toBe(false);
        expect(stringIsIP('1.-1.1.1')).toBe(false);
        expect(stringIsIP('1.1.-1.1')).toBe(false);
        expect(stringIsIP('1.1.1.-1')).toBe(false);
    });

    it('Should return false if an octet is not a number in IPv4', () => {
        expect(stringIsIP('a.1.1.1')).toBe(false);
        expect(stringIsIP('1.a.1.1')).toBe(false);
        expect(stringIsIP('1.1.a.1')).toBe(false);
        expect(stringIsIP('1.1.1.a')).toBe(false);
    });

    it('Should return false if there are more than 4 octets in IPv4', () => {
        expect(stringIsIP('1.1.1.1.1')).toBe(false);
    });

    it('Should return false if there are less than 4 octets in IPv4', () => {
        expect(stringIsIP('1.1.1')).toBe(false);
    });

    it('Should return true for valid IPv6', () => {
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:7777:8888')).toBe(true);
    });

    it('Should return false if there are more than 8 hextets in IPv6', () => {
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:7777:8888:9999')).toBe(false);
    });

    it('Should return false if there are less than 8 hextets in IPv6', () => {
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:7777')).toBe(false);
    });

    it('Should return false if a hextet is greater than ffff in IPv6', () => {
        expect(stringIsIP('ffff1:db8:3333:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:ffff1:3333:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:ffff1:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:ffff1:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:ffff1:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:ffff1:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:ffff1:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:7777:ffff1')).toBe(false);
    });

    it('Should return false if a hextet is less than 0 in IPv6', () => {
        expect(stringIsIP('-1:db8:3333:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:-1:3333:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:-1:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:-1:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:-1:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:-1:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:-1:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:7777:-1')).toBe(false);
    });

    it('Should return false if a hextet is not a hexidecimal number in IPv6', () => {
        expect(stringIsIP('g:db8:3333:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:g:3333:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:g:4444:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:g:5555:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:g:6666:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:g:7777:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:g:8888')).toBe(false);
        expect(stringIsIP('2001:db8:3333:4444:5555:6666:7777:g')).toBe(false);
    });
});

import {describe, it, expect} from "vitest";
import {MathHelpers} from "../src/utils/MathHelpers";

describe('MathHelpers', () => {
    describe('gcd', () => {
        it('should return the gcd of two numbers', () => {
            expect(MathHelpers.gcd(12n, 18n)).toEqual(6n);
            expect(MathHelpers.gcd(17n, 13n)).toEqual(1n);
            expect(MathHelpers.gcd(0n, 5n)).toEqual(5n);
            expect(MathHelpers.gcd(5n, 0n)).toEqual(5n);
            expect(MathHelpers.gcd(0n, 0n)).toEqual(0n);
            expect(MathHelpers.gcd(123456789n, 987654321n)).toEqual(9n);
        });
    });

    describe('lcm', () => {
        it('should return the lcm of two numbers', () => {
            expect(MathHelpers.lcm(4n, 6n)).toEqual(12n);
            expect(MathHelpers.lcm(21n, 6n)).toEqual(42n);
            expect(MathHelpers.lcm(5n, 0n)).toEqual(0n);
            expect(MathHelpers.lcm(0n, 0n)).toEqual(0n);
        });
    });

    describe('modPow', () => {
        it('calculation without modulus test 1', () => {
            expect(MathHelpers.modPow(3n, 4n)).toEqual(81n);
        });

        it('calculation without modulus test 2', () => {
            expect(MathHelpers.modPow(7n, 3n)).toEqual(343n);
        });

        it('1 raised to any power is always 1', () => {
            expect(MathHelpers.modPow(1n, 1000n, 8n)).toEqual(1n);
        });

        it('any power raised to 0 is always 1', () => {
            expect(MathHelpers.modPow(52n, 0n, 8n)).toEqual(1n);
        });

        it('0 raised to 0 is 1 (by convention)', () => {
            expect(MathHelpers.modPow(0n, 0n, 8n)).toEqual(1n);
        });

        it('0 raised to any power greater than 0 is always 0', () => {
            expect(MathHelpers.modPow(0n, 1n, 8n)).toEqual(0n);
        });

        it('modulus is 1, result is 0', () => {
            expect(MathHelpers.modPow(52n, 53n, 1n)).toEqual(0n);
        });

        it('modulus is base divisor, result is 0', () => {
            expect(MathHelpers.modPow(12n, 53n, 6n)).toEqual(0n);
        });

        it('modulus is greater than base ** exponent, the result is base ** exponent', () => {
            expect(MathHelpers.modPow(3n, 3n, 117n)).toEqual(27n);
        });
    });

    describe('isPrime', () => {
        it('should return false for values less than 2', () => {
            expect(MathHelpers.isPrime(0n)).toEqual(false);
            expect(MathHelpers.isPrime(1n)).toEqual(false);
        });

        it('should return true for small primes', () => {
            expect(MathHelpers.isPrime(2n)).toEqual(true);
            expect(MathHelpers.isPrime(3n)).toEqual(true);
            expect(MathHelpers.isPrime(5n)).toEqual(true);
            expect(MathHelpers.isPrime(7n)).toEqual(true);
            expect(MathHelpers.isPrime(541n)).toEqual(true);
        });

        it('should return false for small non-primes', () => {
            expect(MathHelpers.isPrime(4n)).toEqual(false);
            expect(MathHelpers.isPrime(6n)).toEqual(false);
            expect(MathHelpers.isPrime(8n)).toEqual(false);
            expect(MathHelpers.isPrime(9n)).toEqual(false);
            expect(MathHelpers.isPrime(325n)).toEqual(false);
        });

        it('should correctly identify large primes', () => {
            expect(MathHelpers.isPrime(9223372036854775783n)).toEqual(true);
        });

        it('should correctly identify large non-primes', () => {
            expect(MathHelpers.isPrime(9223372036854775785n)).toEqual(false);
        });
    });
});
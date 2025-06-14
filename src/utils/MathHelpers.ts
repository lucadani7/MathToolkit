import {ExtendedGCDResult} from "./ExtendedGCDResult";
import {LinearDiophantineSolution} from "./LinearDiophantineSolution";

export class MathHelpers {
    static gcd(x: bigint, y: bigint): bigint {
        return y === 0n ? x : this.gcd(y, x % y);
    }

    static lcm(x: bigint, y: bigint): bigint {
        return (x === 0n || y === 0n) ? 0n : x * y / this.gcd(x, y);
    }

    static extendedGCD(a: bigint, b: bigint): ExtendedGCDResult {
        if (b === 0n) {
            return { gcd: a, x: 1n, y: 0n };
        }
        const result: ExtendedGCDResult = this.extendedGCD(b, a % b);
        const x: bigint = result.y;
        const y: bigint = result.x - (a / b) * result.y;
        return { gcd: result.gcd, x, y };
    }

    static solveLinearDiophantine(a: bigint, b: bigint, c: bigint): LinearDiophantineSolution {
        const result: ExtendedGCDResult = this.extendedGCD(a, b);
        if (c % result.gcd !== 0n) {
            return { x: 0n, y: 0n, gcd: result.gcd, hasSolution: false };
        }
        const factor: bigint = c / result.gcd;
        return {
            x: result.x * factor,
            y: result.y * factor,
            gcd: result.gcd,
            hasSolution: true,
        };
    }

    static generateCoprimesFor(value: bigint): bigint[] {
        const resultList: bigint[] = [];
        for (let i: bigint = 1n; i < value; i += 1n) {
            const { gcd } = this.extendedGCD(i, value);
            if (gcd !== 1n) {
                continue;
            }
            resultList.push(i);
        }
        return resultList;
    }

    static phi(value: bigint): bigint {
        return this.generateCoprimesFor(value).length;
    }

    static sortArray(array: bigint[]) {
        array.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        return array;
    }

    static generateDivisorsFor(value: bigint): bigint[] {
        const divisorsList: bigint[] = [];
        for (let i: bigint = 1n; i * i <= value; i += 1n) {
            if (value % i !== 0n) {
                continue;
            }
            divisorsList.push(i);
            if (i !== value / i) {
                divisorsList.push(value / i);
            }
        }
        this.sortArray(divisorsList);
        return divisorsList;
    }

    static numberOfDivisors(value: bigint): bigint {
        return this.generateDivisorsFor(value).length;
    }

    static sumOfDivisors(value: bigint): bigint {
        return this.generateDivisorsFor(value).reduce((acc, x) => acc + x, 0n);
    }

    static generatePrimesFor({startValue = 2n, endValue}: { startValue?: bigint; endValue: bigint }): bigint[] {
        if (startValue > endValue) {
            return [];
        }
        const primesList: bigint[] = [];
        for (let i: bigint = startValue; i <= endValue; i += 1n) {
            if (this.isPrime(i)) {
                primesList.push(i);
            }
        }
        return primesList;
    }

    static modPow(base: bigint, exponent: bigint, modulus?: bigint): bigint {
        if (modulus === undefined) {
            return base ** exponent;
        }
        if (modulus === 1n) {
            return 0n;
        }
        if (base === 1n || exponent === 0n) {
            return 1n;
        }
        if (base === 0n) {
            return 0n;
        }
        if ((exponent & 1n) === 1n) {
            return (base % modulus) * this.modPow(base, exponent - 1n, modulus) % modulus;
        }
        let temp: bigint = this.modPow(base, exponent >> 1n, modulus);
        return (temp * temp) % modulus;
    }

    static isPrime(value: bigint): boolean {
        if (value < 4n) {
            return value > 1n;
        }
        const a: bigint[] = [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n, 0n];
        let s: bigint;
        let d: bigint;
        for (s = 0n, d = value - 1n; (d & 1n) === 0n; d >>= 1n, s += 1n);
        for (let k: number = 0; a[k] !== 0n && a[k] < value; ++k) {
            let x: bigint = this.modPow(a[k], d, value);
            if (x === 1n || x === value - 1n) {
                continue;
            }
            let witnessFound: boolean = true; // supposing that the relation a ** (d * (2 ** r)) not modulo -1 (mod value) is true
            for (let r: bigint = 1n; r < s; r += 1n) {
                x = (x * x) % value;
                if (x === 1n) {
                    return false;
                }
                if (x === value - 1n) {
                    witnessFound = false;
                    break;
                }
            }
            if (witnessFound) {
                return false; // if the relation a ** (d * (2 ** r)) not modulo -1 (mod value) is true, then value is not prime
            }
        }
        return true;
    }
}
import React from "react";

describe("examples for jest expect", () => {
    // ... 本节课后续的test就放在这里
    test("基础类型的比较", () => {
        // tobe: 基本类型判断
        expect(1 + 1).toBe(2);
        // not
        expect(1 + 1).not.toBe(3);
        // boolean
        expect(true).toBe(true);
        expect(true).toBeTruthy();
        expect(false).toBeFalsy();
        // undefined
        expect(undefined).toBe(undefined);
        expect(undefined).not.toBeDefined();
        expect(undefined).toBeUndefined();

        // 判断函数返回值undefined
        const test = () => {
            console.log(test);
        };
        expect(test()).toBeUndefined();
    })

    // ./src/__test__/expect.test.ts
    test("基础类型的比较: 浮点数", () => {
        // ...
        // 浮点数
        expect(0.2 + 0.1).toBeCloseTo(0.3);
    })

    test("特殊比较: NAN, +-0", () => {
        // NaN
        expect(NaN).toBe(NaN);
        expect(NaN).toBeNaN();
        // +0 -0
        expect(+0).not.toBe(-0);
    })

    test("引用类型的比较", () => {
        const a = { obj1: { name: "obj1", obj2: { name: "obj2" } } };
        // 指针比较
        const b = Object.assign(a);

        const c = JSON.parse(JSON.stringify(a));
        expect(a).toBe(b);
        expect(a).not.toBe(c);

        expect(a).toEqual(b);
        expect(a).toEqual(c);
    })

    test("toEqual验证基础类型比较", () => {
        // ...虽然基础类型本身并不是对象，但是在对它们的 proto 进行递归比较的时候，
        // 会调用它们对应的包装类型创建实例，实例本身是可以作为对象进行比较的，
        // 所以 toEqual 同样可以用于基础类型的比较，比较的结果预期将是所有递归属性的值相等。
        expect(1 + 1).toEqual(2);
    })

    test("数字符号", () => {
        // >
        expect(3).toBeGreaterThan(2);
        // <
        expect(3).toBeLessThan(4);
        // >=
        expect(3).toBeGreaterThanOrEqual(3);
        expect(3).toBeGreaterThanOrEqual(2);
        // <=
        expect(3).toBeLessThanOrEqual(3);
        expect(3).toBeLessThanOrEqual(4);
    });

    test("正则匹配", () => {
        expect("This is a regexp validation").toMatch(/regexp/);
        const obj = { prop1: "test", prop2: "regexp validation" };
        const childObj = { prop1: "test" };
        expect(obj).toMatchObject(childObj);
    });

    test("表单验证", () => {
        // 数组元素验证
        expect([1, 2, 3]).toContain(1);
        expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 2]));
        expect([{ a: 1, b: 2 }]).toContainEqual({ a: 1, b: 2 });
        // 数组长度
        expect([1, 2, 3]).toHaveLength(3);
        // 对象属性验证
        const testObj = {
            prop1: 1,
            prop2: {
                child1: 2,
                child2: "test",
            },
        };
        expect(testObj).toHaveProperty("prop1");
        expect(testObj).toHaveProperty("prop2.child1");
    });

    // test("错误抛出", () => {
    //     const throwError = () => {
    //         const err = new Error("console err: this is a test error111111!");
    //         throw err;
    //     };
    //     expect(throwError).toThrow();
    //     expect(throwError).toThrowError();

    //     const catchError = () => {
    //         try {
    //             const err = new Error("console err: this is a test error22222!");
    //             throw err;
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     expect(catchError).not.toThrow();
    //     expect(catchError).not.toThrowError();
    // });
    // ./src/__test__/expect.test.ts
    test("同步自定义匹配器", () => {
        const toBeBetweenZeroAndTen = (num: number) => {
            if (num >= 0 && num <= 10) {
                return {
                    message: () => "",
                    pass: true,
                };
            } else {
                return {
                    message: () => "expected num to be a number between zero and ten",
                    pass: false,
                };
            }
        };
        expect.extend({
            toBeBetweenZeroAndTen,
        });
        expect(8).toBeBetweenZeroAndTen();
        expect(11).not.toBeBetweenZeroAndTen();
    });

    // ./src/__test__/expect.test.ts
    test("异步自定义匹配器", async () => {
        const toBeBetweenZeroAndTen = async (num: number) => {
            const res = await new Promise<{ message: () => string; pass: boolean }>(
                (resolve) => {
                    setTimeout(() => {
                        if (num >= 0 && num <= 10) {
                            resolve({
                                message: () => "",
                                pass: true,
                            });
                        } else {
                            resolve({
                                message: () =>
                                    "expected num to be a number between zero and ten",
                                pass: false,
                            });
                        }
                    }, 1000);
                }
            );
            return (
                res || {
                    message: () => "expected num to be a number between zero and ten",
                    pass: false,
                }
            );
        };
        expect.extend({
            toBeBetweenZeroAndTen,
        });
        
        await expect(8).toBeBetweenZeroAndTen();
        await expect(11).not.toBeBetweenZeroAndTen();
    });

    
});
import { describe, test, expect, vi } from "vitest";
import { readFile, rm, cp } from "fs/promises";

import { main as main1 } from "../script_1";
import { main as main2 } from "../script_2";

describe("外部パッケージの問題1(csv-parse)", () => {
  test("問題1の結果が正しい", async () => {
    const spy = vi
      .spyOn(global.console, "log")
      .mockImplementation((args) => args);
    await main1();
    expect(spy).toHaveLastReturnedWith("国語の平均点: 77.5点");
  });
  test("成績表の点数を変えても結果が正しい", async () => {
    await cp("./__test__/seiseki_other.csv", "./seiseki.csv", { force: true });
    const spy = vi
      .spyOn(global.console, "log")
      .mockImplementation((args) => args);
    await main1();
    expect(spy).toHaveLastReturnedWith("国語の平均点: 80.7点");
    await cp("./__test__/seiseki.csv", "./seiseki.csv", { force: true });
  });
});

describe("外部パッケージの問題2(sharp)", () => {
  test("問題2の結果が正しい", async () => {
    await rm("./output.png").catch(() => {});
    await main2();
    const answer = await readFile("./__test__/answer.png", "base64");
    const result = await readFile("./output.png", "base64");
    expect(answer).toEqual(result);
    await rm("./output.png");
  });
});

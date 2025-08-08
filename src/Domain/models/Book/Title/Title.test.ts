import { Title } from "./Title";

describe("Title", () => {
  it('有効なフォーマットの場合', () => {
    expect(new Title('ようこそ実力至上主義の教室へ').value).toBe('ようこそ実力至上主義の教室へ')
  })

  it('不正な文字数の場合にエラーを投げる', () => {
    expect(() => new Title("a".repeat(1001))).toThrow(
      `タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`
    )

    expect(() => new Title("")).toThrow(
      `タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`
    )
  })
});

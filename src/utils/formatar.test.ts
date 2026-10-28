import { describe, expect, it } from "vitest";
import { formatarNome, formatarNumero } from "./formatar";

describe("formatarNome", () => {
  it("deixa a primeira letra maiúscula e troca hífen por espaço", () => {
    expect(formatarNome("pikachu")).toBe("Pikachu");
    expect(formatarNome("mr-mime")).toBe("Mr Mime");
  });
});

describe("formatarNumero", () => {
  it("coloca # e zeros na frente", () => {
    expect(formatarNumero(25)).toBe("#0025");
  });
});

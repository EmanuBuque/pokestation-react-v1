import { describe, expect, it } from "vitest";
import { nomeExibicao, numeroPokedex, rotuloRaridade } from "./display";

describe("nomeExibicao", () => {
  it("deixa a primeira letra maiúscula", () => {
    expect(nomeExibicao("pikachu")).toBe("Pikachu");
  });

  it("troca o hífen por espaço em nomes compostos", () => {
    expect(nomeExibicao("mr-mime")).toBe("Mr Mime");
  });
});

describe("numeroPokedex", () => {
  it("completa com zeros até 4 dígitos", () => {
    expect(numeroPokedex(6)).toBe("#0006");
    expect(numeroPokedex(1025)).toBe("#1025");
  });
});

describe("rotuloRaridade", () => {
  it("mostra as raridades com acento", () => {
    expect(rotuloRaridade("épico")).toBe("Épico");
    expect(rotuloRaridade("Lendario")).toBe("Lendário");
    expect(rotuloRaridade("Mitico")).toBe("Mítico");
  });
});

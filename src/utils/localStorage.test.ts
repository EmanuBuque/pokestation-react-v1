import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { lerJSONLocalStorage, salvarJSONLocalStorage } from "./localStorage";

describe("lerJSONLocalStorage", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("retorna missing quando a chave não tem valor salvo", () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);

    expect(lerJSONLocalStorage("pokemon-favoritos")).toEqual({
      status: "missing",
    });
  });

  it("converte e retorna um valor JSON válido", () => {
    vi.mocked(localStorage.getItem).mockReturnValue('[{"id":25}]');

    expect(lerJSONLocalStorage("pokemon-favoritos")).toEqual({
      status: "success",
      value: [{ id: 25 }],
    });
  });

  it("retorna error quando o valor salvo não é JSON válido", () => {
    vi.mocked(localStorage.getItem).mockReturnValue("{json inválido");

    expect(lerJSONLocalStorage("pokemon-favoritos")).toEqual({
      status: "error",
    });
  });

  it("retorna error quando a leitura do armazenamento falha", () => {
    vi.mocked(localStorage.getItem).mockImplementation(() => {
      throw new Error("Armazenamento indisponível");
    });

    expect(lerJSONLocalStorage("pokemon-favoritos")).toEqual({
      status: "error",
    });
  });
});

describe("salvarJSONLocalStorage", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("converte o valor para JSON e retorna true ao salvar", () => {
    const favoritos = [{ id: 25, name: "pikachu" }];

    expect(salvarJSONLocalStorage("pokemon-favoritos", favoritos)).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "pokemon-favoritos",
      JSON.stringify(favoritos)
    );
  });

  it("retorna false quando o salvamento falha", () => {
    vi.mocked(localStorage.setItem).mockImplementation(() => {
      throw new Error("Armazenamento indisponível");
    });

    expect(
      salvarJSONLocalStorage("pokemon-favoritos", [{ id: 25 }])
    ).toBe(false);
  });
});

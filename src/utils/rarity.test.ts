import { describe, expect, it } from "vitest";
import { descobrirRaridade } from "./rarity";

describe("descobrirRaridade", () => {
  it("retorna Mitico quando o Pokémon é mítico", () => {
    expect(descobrirRaridade({ is_mythical: true, is_legendary: false, capture_rate: 3 })).toBe("Mitico");
  });

  it("retorna Lendario quando o Pokémon é lendário", () => {
    expect(descobrirRaridade({ is_mythical: false, is_legendary: true, capture_rate: 3 })).toBe("Lendario");
  });

  it("usa o capture_rate para os outros Pokémon", () => {
    expect(descobrirRaridade({ is_mythical: false, is_legendary: false, capture_rate: 30 })).toBe("épico");
    expect(descobrirRaridade({ is_mythical: false, is_legendary: false, capture_rate: 90 })).toBe("Raro");
    expect(descobrirRaridade({ is_mythical: false, is_legendary: false, capture_rate: 120 })).toBe("Incomum");
    expect(descobrirRaridade({ is_mythical: false, is_legendary: false, capture_rate: 255 })).toBe("Comum");
  });
});

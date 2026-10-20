import type { ReactNode } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  valor: string;
  carregando: boolean;
  aoMudar: (valor: string) => void;
  aoBuscar: () => void;
  children?: ReactNode;
}

function SearchForm({ valor, carregando, aoMudar, aoBuscar, children }: SearchFormProps) {
  return (
    <form
      className={styles.form}
      role="search"
      aria-busy={carregando}
      onSubmit={(event) => {
        event.preventDefault();
        if (!carregando) {
          aoBuscar();
        }
      }}
    >
      <label className={styles.field}>
        <span className={styles.label}>Nome ou número da Pokédex</span>
        <input
          type="text"
          value={valor}
          onChange={(event) => aoMudar(event.target.value)}
          placeholder="pikachu ou 25"
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={carregando}>
          {carregando ? "Buscando…" : "Buscar"}
        </button>
        {children}
      </div>
    </form>
  );
}

export default SearchForm;

import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  titulo: string;
  // Opcional: use só quando trouxer informação nova, não para repetir o card da home
  descricao?: string;
  children?: ReactNode;
}

function PageHeader({ titulo, descricao, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.copy}>
        <h1>{titulo}</h1>
        {descricao && <p>{descricao}</p>}
      </div>
      {children && <div className={styles.aside}>{children}</div>}
    </header>
  );
}

export default PageHeader;

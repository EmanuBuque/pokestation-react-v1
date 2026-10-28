import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import pokeBall from "../../assets/pokeball.webp";
import styles from "./Layout.module.css";

const links = [
  { to: "/finder", rotulo: "Buscar" },
  { to: "/team-builder", rotulo: "Time" },
  { to: "/collector", rotulo: "Colecionar" },
  { to: "/collection", rotulo: "Coleção" },
];

function Layout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link to="/" className={styles.brand}>
            <img src={pokeBall} alt="" aria-hidden="true" />
            <span>PokéStation</span>
          </Link>

          <nav className={styles.nav} aria-label="Ferramentas">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.ativo}` : styles.link
                }
              >
                {link.rotulo}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {/* O Outlet mostra a página da rota atual (Finder, Collector...) */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

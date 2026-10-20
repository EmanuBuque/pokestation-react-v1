
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import AboutPanel from "../../components/AboutPanel/AboutPanel";
import pokeBall from "../../assets/Nova pasta/Poké_Ball_icon.svg.webp";

import styles from "./MainMenu.module.css";

const BULBASAUR_OFFICIAL_ART_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

function MainMenu() {
    return (
        <main id="top" className={styles["main-menu"]}>
            <section
                className={styles["main-menu-hero"]}
                aria-label="Menu principal"
            >
                <div
                    className={styles["main-menu-sparkles"]}
                    aria-hidden="true"
                >
                    <span className={`${styles.sparkle} ${styles["sparkle--1"]}`} />
                    <span className={`${styles.sparkle} ${styles["sparkle--2"]}`} />
                    <span className={`${styles.sparkle} ${styles["sparkle--3"]}`} />
                    <span className={`${styles.sparkle} ${styles["sparkle--4"]}`} />
                    <span className={`${styles.sparkle} ${styles["sparkle--5"]}`} />

                    <span className={`${styles.burst} ${styles["burst--1"]}`} />
                    <span className={`${styles.burst} ${styles["burst--2"]}`} />
                    <span className={`${styles.burst} ${styles["burst--3"]}`} />
                </div>

                <header className={styles["main-menu-brand"]}>
                    <img
                        className={styles["main-menu-brand-ball"]}
                        src={pokeBall}
                        alt=""
                        aria-hidden="true"
                    />
                    <span className={styles["main-menu-brand-name"]}>
                        PokéStation
                    </span>
                </header>

                <h1 className={styles["main-menu-title"]}>
                    PokéStation
                </h1>

                <img
                    src={BULBASAUR_OFFICIAL_ART_URL}
                    alt="Bulbasaur"
                    className={styles["main-menu-pokemon"]}
                />

                <nav
                    className={styles["main-menu-options"]}
                    aria-label="Navegação principal"
                >
                    <Link
                        to="/finder"
                        className={`${styles["menu-card"]} ${styles["menu-card--red"]}`}
                    >
                        <div className={styles["menu-card-copy"]}>
                            <h2>Buscar Pokémon</h2>
                            <span>Encontre informações</span>
                        </div>
                    </Link>

                    <Link
                        to="/team-builder"
                        className={`${styles["menu-card"]} ${styles["menu-card--blue"]}`}
                    >
                        <div className={styles["menu-card-copy"]}>
                            <h2>Montar time</h2>
                            <span>Crie sua equipe</span>
                        </div>
                    </Link>

                    <Link
                        to="/collector"
                        className={`${styles["menu-card"]} ${styles["menu-card--green"]}`}
                    >
                        <div className={styles["menu-card-copy"]}>
                            <h2>Colecionar</h2>
                            <span>Acompanhe seu progresso</span>
                        </div>
                    </Link>

                    <Link
                        to="/collection"
                        className={`${styles["menu-card"]} ${styles["menu-card--yellow"]}`}
                    >
                        <div className={styles["menu-card-copy"]}>
                            <h2>Minha coleção</h2>
                            <span>Veja seus Pokémon</span>
                        </div>
                    </Link>
                </nav>
            </section>

            <AboutPanel />
            <Footer />
        </main>
    );
}

export default MainMenu;

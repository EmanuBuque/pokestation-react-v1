
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import AboutPanel from "../../components/AboutPanel/AboutPanel";
import pokeBall from "../../assets/poke-ball.png";
import charmander from "../../assets/pokemon-sprites/charmander.png";
import squirtle from "../../assets/pokemon-sprites/squirtle.png";
import bulbasaur from "../../assets/pokemon-sprites/bulbasaur.png";
import pikachu from "../../assets/pokemon-sprites/pikachu.png";

import styles from "./MainMenu.module.css";

const MEW_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png";

function MainMenu() {
    return (
        <main className={styles["main-menu"]}>
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
                    src={MEW_URL}
                    alt="Mew"
                    className={styles["main-menu-pikachu"]}
                />

                <nav
                    className={styles["main-menu-options"]}
                    aria-label="Navegação principal"
                >
                    <Link
                        to="/finder"
                        className={`${styles["menu-card"]} ${styles["menu-card--red"]}`}
                    >
                        <img
                            className={styles["menu-card-icon"]}
                            src={charmander}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2>Finder</h2>
                    </Link>

                    <Link
                        to="/team-builder"
                        className={`${styles["menu-card"]} ${styles["menu-card--blue"]}`}
                    >
                        <img
                            className={styles["menu-card-icon"]}
                            src={squirtle}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2>Team Builder</h2>
                    </Link>

                    <Link
                        to="/collector"
                        className={`${styles["menu-card"]} ${styles["menu-card--green"]}`}
                    >
                        <img
                            className={styles["menu-card-icon"]}
                            src={bulbasaur}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2>Colecionador</h2>
                    </Link>

                    <Link
                        to="/collection"
                        className={`${styles["menu-card"]} ${styles["menu-card--yellow"]}`}
                    >
                        <img
                            className={styles["menu-card-icon"]}
                            src={pikachu}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2>Coleção</h2>
                    </Link>
                </nav>
            </section>

            <AboutPanel />
            <Footer />
        </main>
    );
}

export default MainMenu;

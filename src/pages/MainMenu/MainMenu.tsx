import { Link } from "react-router-dom";
import leftPikachu from "../../assets/leftpikachu.png";
import Footer from "../../components/Footer/Footer";

import "./MainMenu.css";
import AboutPanel from "../../components/AboutPanel/AboutPanel";
const PIKACHU_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";

function MainMenu() {
    return (
        <main className="main-menu">
            <section className="main-menu-hero" aria-label="Menu principal">
                <div className="main-menu-sparkles" aria-hidden="true">
                    <span className="sparkle sparkle--1" />
                    <span className="sparkle sparkle--2" />
                    <span className="sparkle sparkle--3" />
                    <span className="sparkle sparkle--4" />
                    <span className="sparkle sparkle--5" />
                    <span className="burst burst--1" />
                    <span className="burst burst--2" />
                    <span className="burst burst--3" />
                </div>

                <header className="main-menu-brand">
                    <span className="main-menu-brand-ball" aria-hidden="true" />
                    <span className="main-menu-brand-name">PokéStation</span>
                </header>
                <h1 className="main-menu-title">PokéStation</h1>

                <img
                    src={leftPikachu}
                    alt=""
                    aria-hidden="true"
                    className="main-menu-pikachu-small"
                />

                <img
                    src={PIKACHU_URL}
                    alt="Pikachu"
                    className="main-menu-pikachu"
                />

                <nav className="main-menu-options">
                    <Link to="/finder" className="menu-card menu-card--red">
                        <span className="menu-card-icon" aria-hidden="true" />
                        <h2>Finder</h2>
                    </Link>

                    <Link to="/team-builder" className="menu-card menu-card--blue">
                        <span className="menu-card-icon" aria-hidden="true" />
                        <h2>Team Builder</h2>
                    </Link>

                    <Link to="/collector" className="menu-card menu-card--green">
                        <span className="menu-card-icon" aria-hidden="true" />
                        <h2>Colecionador</h2>
                    </Link>

                    <Link to="/collection" className="menu-card menu-card--yellow">
                        <span className="menu-card-icon" aria-hidden="true" />
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
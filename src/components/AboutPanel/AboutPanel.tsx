
import "./AboutPanel.css";

function AboutPanel() {
    return (
        <section
            className="about-panel"
            aria-label="Sobre a PokéStation"
        >
            <div className="about-panel-content">
                <h2 className="about-panel-title">Sobre a PokéStation</h2>

                <p className="about-panel-text">
                    A PokéStation é uma plataforma dedicada à exploração e
                    organização do universo Pokémon. Consulte espécies, monte
                    equipes e acompanhe sua coleção em um só lugar.
                </p>

                <h3 className="about-panel-heading">
                    O que você encontra por aqui
                </h3>

                <ul className="about-panel-list">
                    <li>
                        Finder: pesquise Pokémon pelo nome ou número da Pokédex
                        e consulte suas informações.
                    </li>
                    <li>
                        Team Builder: monte e organize sua equipe Pokémon.
                    </li>
                    <li>
                        Colecionador: descubra novas espécies e adicione
                        Pokémon à sua coleção.
                    </li>
                    <li>
                        Coleção: visualize os Pokémon que você já registrou.
                    </li>
                </ul>

                <p className="about-panel-text">
                    Os dados dos Pokémon vêm da PokéAPI, que permite consultar
                    informações reais da franquia.
                </p>

                <h3 className="about-panel-heading">Desenvolvimento</h3>

                <p className="about-panel-text">
                    Desenvolvida com React, TypeScript e Vite, a PokéStation
                    utiliza dados da PokéAPI para apresentar informações sobre
                    os Pokémon e oferecer uma experiência interativa.
                </p>

                <p className="about-panel-closing">
                    Explore as ferramentas e comece a montar sua jornada
                    Pokémon.
                </p>
            </div>
        </section>
    );
}

export default AboutPanel;

import { useEffect, useMemo, useState } from "react";

import "./App.css";

import livrosBase from "./data/livros.json";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CampoBusca from "./components/CampoBusca";
import FiltroCategoria from "./components/FiltroCategoria";
import FiltroStatus from "./components/FiltroStatus";
import PainelEstatisticas from "./components/PainelEstatisticas";
import ListaLivros from "./components/ListaLivros";

function App() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [statusAtivo, setStatusAtivo] = useState("Todos");

  const [favoritos, setFavoritos] = useState(() => {
    const dados = localStorage.getItem("favoritos");
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  const categorias = useMemo(() => {
    return [
      "Todas",
      ...new Set(
        livrosBase.map((livro) => livro.categoria)
      ),
    ];
  }, []);

  const livrosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return livrosBase.filter((livro) => {
      const texto = `
        ${livro.titulo}
        ${livro.autor}
        ${livro.categoria}
        ${livro.descricao ?? ""}
        ${livro.editora ?? ""}
        ${livro.ano ?? ""}
      `.toLowerCase();

      const buscaOK =
        termo === "" || texto.includes(termo);

      const categoriaOK =
        categoriaAtiva === "Todas" ||
        livro.categoria === categoriaAtiva;

      const statusOK =
        statusAtivo === "Todos" ||
        livro.status === statusAtivo;

      return buscaOK && categoriaOK && statusOK;
    });
  }, [busca, categoriaAtiva, statusAtivo]);

  function alternarFavorito(id) {
    setFavoritos((antigos) =>
      antigos.includes(id)
        ? antigos.filter((f) => f !== id)
        : [...antigos, id]
    );
  }

  return (
    <>
      <Header />

      <main className="pagina">
        <section className="hero">
          <h1>📚 Biblioteca do FD e do SPD</h1>

          <p>
            Explore livros, descubra novos autores,
            organize sua coleção e marque seus
            favoritos.
          </p>
        </section>

        <PainelEstatisticas
          total={livrosBase.length}
          exibidos={livrosFiltrados.length}
          favoritos={favoritos.length}
          categorias={categorias.length - 1}
        />

        <section className="filtros">
          <CampoBusca
            valor={busca}
            aoAlterar={setBusca}
          />

          <FiltroCategoria
            categorias={categorias}
            valor={categoriaAtiva}
            aoAlterar={setCategoriaAtiva}
          />

          <FiltroStatus
            valor={statusAtivo}
            aoAlterar={setStatusAtivo}
          />
        </section>

        <ListaLivros
          livros={livrosFiltrados}
          favoritos={favoritos}
          aoAlternarFavorito={alternarFavorito}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;
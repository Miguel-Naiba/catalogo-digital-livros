import { useEffect, useMemo, useState } from "react";

import "./App.css";

import livrosBase from "./data/livros.json";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CampoBusca from "./components/CampoBusca";
import FiltroCategoria from "./components/FiltroCategoria";
import FiltroStatus from "./components/FiltroStatus";
import FiltroVestibular from "./components/FiltroVestibular";
import PainelEstatisticas from "./components/PainelEstatisticas";
import ListaLivros from "./components/ListaLivros";

function App() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [statusAtivo, setStatusAtivo] = useState("Todos");
  
  const [vestibularAtivo, setVestibularAtivo] = useState("Vestibular");
  
  const [favoritos, setFavoritos] = useState(() => {
    const dados = localStorage.getItem("favoritos");
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const categorias = useMemo(() => {
    return [
      "Todas",
      ...new Set(livrosBase.map((livro) => livro.categoria)),
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

      const buscaOK = termo === "" || texto.includes(termo);

      const categoryOK = categoriaAtiva === "Todas" || livro.categoria === categoriaAtiva;

      const statusOK = statusAtivo === "Todos" || livro.status === statusAtivo;

      let vestibularOK = true;
      if (vestibularAtivo === "Vestibular") {
        vestibularOK = livro.vestibulares && livro.vestibulares.length > 0;
      } else if (vestibularAtivo !== "Nenhum") {
        vestibularOK = livro.vestibulares && livro.vestibulares.includes(vestibularAtivo);
      } 

      return buscaOK && categoryOK && statusOK && vestibularOK;
    });
  }, [busca, categoriaAtiva, statusAtivo, vestibularAtivo]);

 function tratarMudancaVestibular(novoVestibular) {
    if (vestibularAtivo === novoVestibular) {
      setVestibularAtivo("Nenhum"); 
    } else {
      setVestibularAtivo(novoVestibular); 
    }
  }

  function tratarMudancaStatus(novoStatus) {
    if (statusAtivo === novoStatus) {
      setStatusAtivo("Todos");
    } else {
      setStatusAtivo(novoStatus);
    }
  }

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
          <h1>📚 Biblioteca do FD e do UPD</h1>
          <p>Explore livros, descubra novos autores, organize sua coleção e marque seus favoritos.</p>
        </section>

        <PainelEstatisticas
          total={livrosBase.length}
          exibidos={livrosFiltrados.length}
          favoritos={favoritos.length}
          categorias={categorias.length - 1}
        />

        <section className="filtros">
          <CampoBusca valor={busca} aoAlterar={setBusca} />
          <FiltroCategoria categorias={categorias} valor={categoriaAtiva} aoAlterar={setCategoriaAtiva} />
          
          <FiltroStatus valor={statusAtivo} aoAlterar={tratarMudancaStatus} />
          
          <FiltroVestibular valor={vestibularAtivo} aoAlterar={tratarMudancaVestibular} />
        </section>

        <ListaLivros livros={livrosFiltrados} favoritos={favoritos} aoAlternarFavorito={alternarFavorito} />
      </main>

      <Footer />
    </>
  );
}

export default App;
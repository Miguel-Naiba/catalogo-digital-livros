function CardLivro({
  livro,
  favorito,
  aoAlternarFavorito,
}) {
  return (
    <article className="card-livro">
      <div className="capa-container">
        <img
          src={livro.capa}
          alt={livro.titulo}
          className="capa-livro"
        />

        <button
          className={`favorito ${favorito ? "ativo" : ""}`}
          onClick={() => aoAlternarFavorito(livro.id)}
        >
          {favorito ? "★" : "☆"}
        </button>

        <span className={`status ${livro.status.toLowerCase().replace(" ", "-")}`}>
          {livro.status}
        </span>
      </div>

      <div className="info-livro">
        <h2>{livro.titulo}</h2>

        <p className="autor">
          {livro.autor}
        </p>

        <span className="categoria">
          {livro.categoria}
        </span>

        <div className="estrelas">
          {"★".repeat(livro.avaliacao)}
          {"☆".repeat(5 - livro.avaliacao)}
        </div>

        <p className="descricao">
          {livro.descricao}
        </p>

        <div className="rodape-card">

          <span>
            📅 {livro.ano}
          </span>

          <span>
            📖 {livro.editora}
          </span>

        </div>

      </div>
    </article>
  )
}

export default CardLivro
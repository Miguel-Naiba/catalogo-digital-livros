function PainelEstatisticas({ total, exibidos, favoritos, categorias }) {
  return (
    <section className="painel-estatisticas">
      <div className="card-estatistica">
        <h3>{total}</h3>
        <p>Livros cadastrados</p>
      </div>

      <div className="card-estatistica">
        <h3>{exibidos}</h3>
        <p>Resultado atual</p>
      </div>

      <div className="card-estatistica">
        <h3>{favoritos}</h3>
        <p>Favoritos</p>
      </div>

      <div className="card-estatistica">
        <h3>{categorias}</h3>
        <p>Categorias</p>
      </div>
    </section>
  )
}

export default PainelEstatisticas
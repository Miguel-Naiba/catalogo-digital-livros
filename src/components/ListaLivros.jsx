import CardLivro from "./CardLivro"
import EmptyState from "./EmptyState"

function ListaLivros({
  livros,
  favoritos,
  aoAlternarFavorito
}) {

  if (!livros.length) {
    return <EmptyState />
  }

  return (

    <section className="lista-livros">

      {livros.map(livro => (

        <CardLivro

          key={livro.id}

          livro={livro}

          favorito={
            favoritos.includes(livro.id)
          }

          aoAlternarFavorito={
            aoAlternarFavorito
          }

        />

      ))}

    </section>

  )

}

export default ListaLivros
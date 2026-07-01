function FiltroCategoria({ categorias, valor, aoAlterar }) {
    return (
      <select
        value={valor}
        onChange={(e) => aoAlterar(e.target.value)}
      >
        <option>Todas</option>
  
        {categorias.map((categoria) => (
          <option key={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    )
  }
  
  export default FiltroCategoria
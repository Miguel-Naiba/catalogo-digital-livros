function CampoBusca({ valor, aoAlterar }) {
    return (
      <label className="campo-busca">
        <span>Buscar por título, autor, categoria ou tag</span>
  
        <input
          type="search"
          value={valor}
          onChange={(e) => aoAlterar(e.target.value)}
          placeholder="Exemplo: ciência, Machado, tecnologia"
        />
      </label>
    )
  }
  
  export default CampoBusca
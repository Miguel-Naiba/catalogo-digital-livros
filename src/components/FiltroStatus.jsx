const status = ["Todos", "Lido", "Lendo", "Quero ler"]

function FiltroStatus({ valor, aoAlterar }) {
  return (
    <div className="status-container">
      {status.map((item) => (
        <button
          key={item}
          className={valor === item ? "ativo" : ""}
          onClick={() => aoAlterar(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default FiltroStatus
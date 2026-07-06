const listaVestibulares = ["Vestibular", "ENEM", "UFRGS"];

function FiltroVestibular({ valor, aoAlterar }) {
  return (
    <div className="status-container">
      {listaVestibulares.map((item) => (
        <button
          key={item}
          className={valor === item ? "ativo" : ""}
          onClick={() => aoAlterar(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FiltroVestibular;
//*! Pegando dados da api do IBGE
// * Pegando os estados
const select = document.querySelector(".estados");
function pegaEstados() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
      res.json().then((data) => {
        for (i = 0; i < data.length; i++) {
          const option = document.createElement("option");
          option.textContent = data[i].sigla;
          option.setAttribute("value", data[i].id);
          select.appendChild(option);
        }
        console.log(data);
      });
    })
    .catch((erro) => {
      console.log("Fetch Failed", erro);
    });
}

pegaEstados();
const selectMunicipio = document.querySelector(".municipios");

// * Pegando os municipios de acordo com a mudança de evento dos estados
select.addEventListener("change", () => {
  function pegaCidades(estado) {
    selectMunicipio.disabled = "true";
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/distritos`
    ).then((res) => {
      res.json().then((data) => {
        for (i = 0; i < data.length; i++) {
          const options = document.createElement("option");
          options.textContent = data[i].nome;
          selectMunicipio.appendChild(options);
          selectMunicipio.removeAttribute("disabled");
        }
      });
    });
  }
  pegaCidades(select.value);
  selectMunicipio.length = 0;
});

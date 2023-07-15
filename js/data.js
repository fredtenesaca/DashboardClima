(function () {
  let URL = "";
  fetch(
    "https://api.open-meteo.com/v1/gfs?latitude=-2.14&longitude=-79.97&hourly=temperature_2m&daily=sunrise&timezone=auto"
  )
    .then((response) => response.json())
    .then((data) => {
      let timezone = data["timezone"];
      let timezoneHTML = document.getElementById("timezone");
      timezoneHTML.textContent = timezone;

      let timezone_abbreviation = data["timezone_abbreviation"];
      let timezone_abbreviationHTML = document.getElementById(
        "timezone_abbreviation"
      );
      timezone_abbreviationHTML.textContent = timezone_abbreviation;

      let elevation = data["elevation"];
      let elevationHTML = document.getElementById("elevation");
      elevationHTML.textContent = elevation;

      let longitude = data["longitude"];
      let latitude = data["latitude"]; /* TAMBIEN SE PUEDE ASI: data.latitude */
      let locationHTML = document.getElementById("location");
      locationHTML.textContent = latitude + ", " + longitude;

      let generationtime_ms = data["generationtime_ms"];
      let generationtime_msHTML = document.getElementById("generationtime_ms");
      generationtime_msHTML.textContent =
        "Generated in " + generationtime_ms + " ms";
      /*console.log(data);*/
    })
    .catch(console.error);
})();

/*--------------------GRAFICO DE LINEAS------------------------*/
let plot = (data) => {
  /*La referencia al elemento HTML*/
  const ctx = document.getElementById("myChartPlot");
  /*La fuente de datos*/
  const dataset = {
    labels:
      data.hourly.time /* ETIQUETA DE DATOS EN HOURLY. TIME DEL JSON (EJE X)*/,
    datasets: [
      {
        label: "Temperatura semanal" /* ETIQUETA DEL GRÁFICO */,
        data: data.hourly
          .temperature_2m /* ARREGLO DE DATOS EN HOURLY. TEMPERATURE_2M DEL JSON (EJE Y)*/,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  /*La configuración del gráfico de lineas*/
  const config = {
    type: "line",
    data: dataset,
  };
  /*La instanciación del gráfico */
  const chart = new Chart(ctx, config);
};

(function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      plot(data); /*invocando el grafico de puntos */
    })
    .catch(console.error);
})();

/*--------------------GRAFICO DE BARRAS------------------------*/
let bar = (data) => {
  /*La referencia al elemento HTML*/
  const ctx = document.getElementById("myChartBard");
  /*La fuente de datos*/
  const dataset = {
    labels:
      data.daily.time /* ETIQUETA DE DATOS EN DAILY.TIME DEL JSON (EJE X)*/,
    datasets: [
      {
        label: "Temperatura Diaria" /* ETIQUETA DEL GRÁFICO */,
        data: data.daily
          .uv_index_max /* ARREGLO DE DATOS EN DAILY.UV_INDEX_MAX DEL JSON (EJE Y)*/,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  /*La configuración del gráfico de lineas*/
  const config = {
    type: "bar",
    data: dataset,
  };
  /*La instanciación del gráfico */
  const chart = new Chart(ctx, config);
};

(function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      bar(data); /*invocando el grafico de barra */
    })
    .catch(console.error);
})();

/*-----------------------CARGAR PAGINA en cache-------------------- */

let load = (data) => {
  /*CARGAR DATOS DE FUNCIONES PLOT Y BARD EN FUNCIONES SEPARADAS */
};
(function () {
  let meteo = localStorage.getItem("meteo");
  if (meteo == null) {
    let URL =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        load(data);

        /* GUARDAR DATA EN LA MEMORIA */
        localStorage.setItem("meteo", JSON.stringify(data));
      })
      .catch(console.error);
  } else {
    /* CARGAR DATA DESDE LA MEMORIA */
    load(JSON.parse(meteo));
  }
})();

let loadInocar = () => {};
(function () {
  let URL_proxy = "https://cors-anywhere.herokuapp.com/";
  let URL = URL_proxy + "https://www.inocar.mil.ec/mareas/consultan.php";

  fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/html");

      let contenedorMareas = xml.getElementsByTagName("div")[0];
      //let contenedorMareas = xml.getElementsByClassName('container-fluid')[0]; ESTA ES OTRA FORMA

      let contenedorHTML = document.getElementById("table-container");
      contenedorHTML.innerHTML = contenedorMareas.innerHTML;
    })
    .catch(console.error);
  //loadInocar();
})();

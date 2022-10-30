const baseUrl='http://localhost:3306/worldcups';
const countriesUrl='http://localhost:3306/worldcups/countries?countryCode=';
const WorldCupId = document.getElementById("mundial")
var worldCupSelected;
const selectionAPI = document.getElementById("solicitud")
var selectedAPI;

function getWorldCups(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showWorldCups(data);
        worldCupSelected = WorldCupId.options[WorldCupId.selectedIndex].value;
        console.log(worldCupSelected);       
      }
      );
  }

  function getStadiums(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showStadiums(data);
        console.log(worldCupSelected);       
      }
      );
  }
  
  function getCountries(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showCountries(data);
        console.log(data);
        
      }
      );
  }

  function getWorldCupWinners(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showWinners(data);
        console.log(data);
        
      }
      );
  }
  
  function getWorldCupStanding(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showStanding(data);
        console.log(data);
        
      }
      );
  }
  function getWorldCupRanking(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showRanking(data);
        console.log(data);
        
      }
      );
  }

  function getResults(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
        showResults(data);
        console.log(data);
      }
      );
  }
  function showStanding(data) {
    francia.innerHTML='';
    data.forEach(results =>{
        const {tournament_id, team_name, position,played, wins, draws, losses,  goals_for, goals_against,points,} = results;
        const countryElements = document.createElement('section');
        countryElements.classList.add('movie');
        countryElements.innerHTML = `
        <section class="content">
        <h2>Mundial : ${tournament_id}</h2>
        <h2>Equipo : ${team_name}</h2>
        <h2>Posicion: ${position}</h2>
        <h2>Jugados: ${played}</h2>
        <h2>Ganados: ${wins}</h2>
        <h2>Empatados : ${draws}</h2>
        <h2>Perdidos : ${losses}</h2>
        <h2>Goles a favor: ${goals_for}</h2>
        <h2>Goles en contra: ${goals_against}</h2>
        <h2>Total de puntos: ${points}</h2>
        </section>`
        francia.appendChild(countryElements);
      })
  } 
  function showResults(data) {
    francia.innerHTML='';
    data.forEach(results =>{
        const {match_name, group_name,match_date, match_time, stadium_name, result} = results;
        const countryElements = document.createElement('section');
        countryElements.classList.add('movie');
        countryElements.innerHTML = `
        <section class="content">
        <h2>Enfrentamiento : ${match_name}</h2>
        <h2>Grupo : ${group_name}</h2>
        <h2>Fecha: ${match_date}</h2>
        <h2>Hora: ${match_time}</h2>
        <h2>Estadio: ${stadium_name}</h2>
        <h2>Resultado: ${result}</h2>
        </section>`
        francia.appendChild(countryElements);
      })
  } 
  function showRanking(data) {
    francia.innerHTML='';
    data.forEach(ranking =>{
        const {team, score,posicion} = ranking;
        const countryElements = document.createElement('section');
        countryElements.classList.add('movie');
        countryElements.innerHTML = `
        <section class="content">
        <h2>Equipo : ${team}</h2>
        <h2>Punteo : ${score}</h2>
        <h2>Pusto: ${posicion}</h2>
        </section>`
        francia.appendChild(countryElements);
      })
  } 
  function showWinners(data) {
    francia.innerHTML='';
    data.forEach(winners =>{
        const {winner, Cups} = winners;
        const countryElements = document.createElement('section');
        countryElements.classList.add('movie');
        countryElements.innerHTML = `
        <section class="content">
        <h2>Equipo ganador: ${winner}</h2>
        <h2>Copas Ganadas: ${Cups}</h2>
        </section>`
        francia.appendChild(countryElements);
      })
  } 

function showCountries(data) {
      francia.innerHTML='';
      data.forEach(countries =>{
          const {team_name, federation_name, region_name,team_wikipedia_link,federation_wikipedia_link } = countries;
          const countryElements = document.createElement('section');
          countryElements.classList.add('movie');
          countryElements.innerHTML = `
          <section class="content">
          <h2>Equipo: ${team_name}</h2>
          <h2>Federacion: ${federation_name}</h2>
          <h2>Region: ${region_name}</h2>
          <a href="${team_wikipedia_link}" target="_blank">informacion de ${team_name}</a>
          <br>
          <a href="${federation_wikipedia_link}" target="_blank">informacion de Confederacion ${federation_name} </a>
          </section>`
          francia.appendChild(countryElements);
        })
    }

 function showWorldCups(data) {
        data.forEach(countries =>{
          const {tournament_id, tournament_name, host_country} = countries;
          let  worldcupElements = document.createElement('option');
          //worldcupElements.classList.add('mundial');
          worldcupElements.value = `${tournament_id} `
          worldcupElements.innerHTML = `${tournament_name} ${host_country}`
          WorldCupId.appendChild(worldcupElements);
        })
        worldCupSelected = WorldCupId.options[WorldCupId.selectedIndex].value
        getCountries(countriesUrl + worldCupSelected);
    } 

  function showStadiums(data) {
      francia.innerHTML='';
      console.log(data)
      data.forEach(stadium =>{
          const {stadium_name, city_name, country_name, stadium_capacity, stadium_wikipedia_link, city_wikipedia_link} = stadium;
          const stadiumElements = document.createElement('section');
          stadiumElements.classList.add('movie');
          stadiumElements.innerHTML = `
          <section class="content">
          <h2>Nombre de Estadio: ${stadium_name}</h2>
          <h2>Ciudad: ${city_name}</h2>
          <h2>Pais: ${country_name}</h2>
          <h2>Capacidad de Estadio: ${stadium_capacity} espectadores</h2>
          <a href="${stadium_wikipedia_link}" target="_blank">informacion de ${stadium_name}</a>
          <br>
          <a href="${city_wikipedia_link}" target="_blank">informacion de Ciudad </a>
          </section>`
          francia.appendChild(stadiumElements);
        })
    } 
    

  WorldCupId.addEventListener('click', () => {
  worldCupSelected = WorldCupId.options[WorldCupId.selectedIndex].value
  getCountries(countriesUrl + worldCupSelected);
})


selectionAPI.addEventListener('click', () => {
  worldCupSelected = WorldCupId.options[WorldCupId.selectedIndex].value
  selectedAPI = selectionAPI.options[selectionAPI.selectedIndex].value
  console.log(selectedAPI)
  switch(selectedAPI){
    case "Equipos": getCountries(countriesUrl + worldCupSelected);
    break;
    case "Estadios": getStadiums(baseUrl + "/stadiums?countryCode=" +worldCupSelected);
    break;
    case "Ganadores": getWorldCupWinners(baseUrl + "/worldcupwinners?countryCode=" +worldCupSelected);
    break;
    case "Ranking" : getWorldCupRanking(baseUrl + "/Ranking");
    break;
    case "Resultados": getResults(baseUrl + "/matchesresults?countryCode=" +worldCupSelected);
    break;
    case "Posiciones" : getWorldCupStanding(baseUrl + "/standings?countryCode=" +worldCupSelected);
    break;
  }
  
})


getWorldCups(baseUrl) 
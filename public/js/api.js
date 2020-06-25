const BASE_URL = "https://api.football-data.org/v2/";
const API_KEY = "4e23ee05caf54c79a63dbf4eca7ecef4";

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/`;
const ENDPOINT_CLUB = `${BASE_URL}teams/`;

// BOILERPLATE FETCH
const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  });
};

// FETCH SUCCESS
function status(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    console.log("Error : ", response.status);
    return Promise.reject(new Error(response.statusText));
  }
}

// PARSE JSON TO ARRAY
function json(response) {
  return response.json();
}

// HANDLE ERROR ON BLOCK CATCH
function error(error) {
  console.error("Error : ", error);
}

// REQUEST DATA LIST LIGA
function getClasemenLeagues() {
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION).then((response) => {
      if (response) {
        response.json().then((data) => {
          document.getElementById("list-league").innerHTML = leaguesHTML(data);
        });
      }
    });
  }

  fetchApi(ENDPOINT_COMPETITION)
    .then(status)
    .then(json)
    .then((data) => {
      document.getElementById("list-league").innerHTML = leaguesHTML(data);
    })
    .catch(error);
}

// REQUEST DATA CLASEMEN
function getClasemenByID() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(ENDPOINT_COMPETITION + idParam + "/standings")
        .then((response) => {
          if (response) {
            response.json().then((data) => {
              document.querySelector(".st-title").innerHTML = standingTitle(
                data
              );
              document.getElementById(
                "standing-table"
              ).innerHTML = standingTable(data);
              resolve(data);
            });
          }
        });
    }

    fetchApi(ENDPOINT_COMPETITION + idParam + "/standings")
      .then(status)
      .then(json)
      .then((data) => {
        document.querySelector(".st-title").innerHTML = standingTitle(data);
        document.getElementById("standing-table").innerHTML = standingTable(
          data
        );
        resolve(data);
      });
  });
}

function getDetailClub() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(ENDPOINT_CLUB + idParam).then((response) => {
        if (response) {
          response.json().then((data) => {
            document.getElementById("club-detail").innerHTML = datailClub(data);
          });
        }
      });
    }

    fetchApi(ENDPOINT_CLUB + idParam)
      .then(status)
      .then(json)
      .then((data) => {
        data.activeCompetitions.forEach((item) => {
          console.log(item.name);
        });

        document.getElementById("club-detail").innerHTML = detailClub(data);
      });
  });
}

function getSavedClasemenLeagues() {
  getAll().then((clasemens) => {
    let leaguesHTML = "";
    clasemens.forEach((clasemen, index) => {
      competitions.forEach((competition) => {
        if (clasemen.competition.id === competition.id) {
          leaguesHTML += `
                      <div class="col s12 m4 l4">
                        <div class="card">
                          <a href="./pages/clasemen.html?id=${clasemen.competition.id}&saved=true">
                            <div class="card-image">
                              <img src="${competition.img}" />
                              <a class="btn-floating halfway-fab waves-effect waves-light red"
                                ><i class="material-icons delete" data-id="${clasemen.competition.id}"
                                 >delete</i></a
                              >
                            </div>
                          </a>
                          <div class="card-content">
                            <span class="card-title">${clasemen.competition.name}</span>
                          </div>
                        </div>
                      </div>
                      `;
        }
      });
    });

    document.getElementById("list-league").innerHTML = leaguesHTML;
  });
}

function getSavedClasemenByID() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = parseInt(urlParams.get("id"));

  getById(idParam).then(function (clasemen) {
    console.log(clasemen);
    document.querySelector(".st-title").innerHTML = standingTitle(clasemen);
    document.getElementById("standing-table").innerHTML = standingTable(
      clasemen
    );
  });
}

function leaguesHTML(data) {
  let leaguesHTML = "";
  data.competitions.forEach((item) => {
    competitions.forEach((competition) => {
      if (item.id === competition.id) {
        leaguesHTML += `
            <div class="col s12 m4 l4">
              <div class="card">
                <a href="./pages/clasemen.html?id=${item.id}">
                  <div class="card-image">
                    <img src="${competition.img}" />
                    
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title">${item.name}</span>
                </div>
              </div>
            </div>
            `;
      }
    });
  });
  return leaguesHTML;
}

function standingTitle(data) {
  const standingTitle = `
  <div class="row">
    <div class="col s12">
      <h4>
        ${data.competition.name}
      </h4>
    </div>
  </div>
  <div class="row">
    <div class="col m4 s4">
      Start : ${data.season.startDate}
    </div>
    <div class="col m4 s4">
      End : ${data.season.endDate}
    </div>
    <div class="col m4 s4">
      Matchday : ${data.season.currentMatchday}
    </div>
  </div>
  `;
  return standingTitle;
}

function standingTable(data) {
  let standingsTable = "";
  data.standings[0].table.forEach((item) => {
    let clubImg = item.team.crestUrl
      ? item.team.crestUrl.replace(/^http:\/\//i, "https://")
      : "/img/club/default-team-logo.png";
    standingsTable += `
          <tr>
            <td>${item.position}</td>
            <td class="st-team">
            <a href="./club.html?id=${item.team.id}">
              <img
                src=${clubImg}
                class="img-thumbnail"
              />${item.team.name}
              </a>
            </td>
            <td>${item.playedGames}</td>
            <td>${item.won}</td>
            <td>${item.draw}</td>
            <td>${item.lost}</td> 
            <td>${item.goalsFor}</td>
            <td>${item.goalsAgainst}</td>
            <td>${item.goalDifference}</td>
            <td>${item.points}</td>
          </tr>
          `;
  });

  return standingsTable;
}

function detailClub(data) {
  return `
  <div class="club-img"><img src=${data.crestUrl} /></div>
  <div class="club-shortname">${data.shortName}</div>
  <div class="club-fullname">${data.name}</div>
  <hr />
  <div class="club-venue">
    <div class="key">Venue</div>
    <div class="value">${data.venue}</div>
  </div>
  <hr />
  <div class="club-website">
    <div class="key">Website</div>
    <div class="value">${data.website}</div>
  </div>
  <hr />
  <div class="club-email">
    <div class="key">Email</div>
    <div class="value">${data.email}</div>
  </div>
  <hr />
  <div class="club-founded">
    <div class="key">Founded</div>
    <div class="value">${data.founded}</div>
  </div>
  <hr />
  <div class="club-active-competition">
    <div class="key">Active Competition</div>
    
    ${data.activeCompetitions
      .map((item) => {
        return `<div class="value">${item.name}</div>`;
      })
      .join("")}
  </div>
  <hr />
  <div class="club-couch">
    <div class="key">Couch</div>
    <div class="value">${data.squad
      .map((item) => {
        if (item.role === "COACH") {
          return `${item.name}`;
        }
      })
      .join("")}</div>
  </div>
  <hr />
  <div class="club-squad">
    <div class="key">Squad</div>
    ${data.squad
      .map((item) => {
        if (!item.position) {
          return;
        }
        return `<div class="value value-squad">
                <div class="position">${item.position}-</div>
                <div class="player-name">${item.name}</div>
              </div>`;
      })
      .join("")}
  </div>
  <hr />
  `;
}

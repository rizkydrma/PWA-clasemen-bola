document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  async function loadNav() {
    try {
      const response = await fetch("./pages/nav.html", {
        method: "GET",
        mode: "no-cors",
      });
      const responseText = await response.text();

      document.querySelectorAll(".topnav, .sidenav").forEach((element) => {
        element.innerHTML = responseText;
      });

      document.querySelectorAll(".topnav a, .sidenav a").forEach((element) => {
        element.addEventListener("click", (event) => {
          const sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    } catch {
      console.log(error);
    }
  }

  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);

  async function loadPage(page) {
    const bodyContent = document.getElementById("body-content");
    try {
      const response = await fetch(`pages/${page}.html`);
      const responseText = await response.text();

      if (page === "daftar-liga") {
        getClasemenLeagues();
      } else if (page === "saved") {
        getSavedClasemenLeagues();
      }

      if (response.status === 200) {
        bodyContent.innerHTML = responseText;
        let myScript = document.getElementsByTagName("script");
        if (myScript.length > 0) {
          eval(myScript[0].innerHTML);
        }
      } else if (response.status === 404) {
        bodyContent.innerHTML = `
                <div style='text-align:center'>
                  <h4>Error ${response.status}</h4>
                  <h5>Halaman tidak ditemukan! </h5>
                </div>
              `;
      } else {
        bodyContent.innerHTML = `
                  <div style='text-align:center'>
                    <h4>Error ${response.status}</h4>
                    <h5>Halaman tidak dapat diakses! </h5>
                  </div>
                `;
      }
    } catch {
      console.log(error);
    }
  }
});

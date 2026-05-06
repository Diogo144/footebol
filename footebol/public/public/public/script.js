async function loadGames() {
    const sport = document.getElementById("sportSelect").value;

    const res = await fetch(
        `https://us-central1-SEU-PROJETO-ID.cloudfunctions.net/getGames?sport=${sport}`
    );

    const data = await res.json();
    displayGames(data);
}

function displayGames(games) {
    const container = document.getElementById("games");
    container.innerHTML = "";

    games.forEach(g => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <h3>${g.teams.home.name} vs ${g.teams.away.name}</h3>
            <p><strong>Placar:</strong> ${g.goals.home} x ${g.goals.away}</p>
            <p><strong>País:</strong> ${g.league.country}</p>
            <p><strong>Competição:</strong> ${g.league.name}</p>
            <p><strong>Status:</strong> ${g.fixture.status.long}</p>
        `;

        container.appendChild(card);
    });
}

function filterResults() {
    const term = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll(".game-card");

    cards.forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(term)
            ? "block"
            : "none";
    });
}
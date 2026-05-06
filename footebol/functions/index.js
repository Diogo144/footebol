const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// coloque sua chave aqui
const API_KEY = "v3.football.api-sports.io";
const API_KEY = "v1.basketball.api-sports.io";
const API_KEY = "v1.volleyball.api-sports.io";

// mapear esportes
const API_ENDPOINTS = {
  futebol: "football",
  basquete: "basketball",
  volei: "volleyball"
};

exports.getGames = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {

    try {
      const sport = req.query.sport;

      if (!sport || !API_ENDPOINTS[sport]) {
        return res.status(400).json({
          error: "Use: futebol, basquete ou volei"
        });
      }

      const endpoint = API_ENDPOINTS[sport];

      const response = await axios.get(
        `https://v3.${endpoint}.api-sports.io/fixtures?live=all`,
        {
          headers: { "x-apisports-key": API_KEY }
        }
      );

      res.json(response.data.response);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }

  });
});
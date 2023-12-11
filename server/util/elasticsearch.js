const elasticsearch = require("@elastic/elasticsearch");

const cloudID = process.env.ELASTIC_CLOUD_ID;
const apiKey = process.env.ELASTIC_API_KEY;
const index = "vector-search-christmas-songs";

const client = new elasticsearch.Client({
  cloud: { id: cloudID },
  auth: { apiKey: apiKey },
});

async function getTopDocumentsForSongTitle(title) {
  if (!client) {
    throw new Error("Unable to connect to Elasticsearch")
  }
  
  return client.search({
        index: index,
        query: {
          multi_match: {
            query: title,
            fields: ["song-title", "lyrics"]
          }
        },
        knn: [
          {
            field: "song_title_embedding.predicted_value",
            k: 1,
            num_candidates: 100,
            query_vector_builder: {
              text_embedding: {
                model_id: "sentence-transformers__msmarco-minilm-l-12-v3",
                model_text: `A Christmas song with a title that is similar to ${title}`
              }
            }
          },
          {
            field: "lyrics_embedding.predicted_value",
            k: 1,
            num_candidates: 100,
            query_vector_builder: {
              text_embedding: {
                model_id: "sentence-transformers__msmarco-minilm-l-12-v3",
                model_text: `A Christmas song with similar lyrics to ${title}`
              }
            }
          }
        ],
        rank: {
          rrf: {}
        }
        
    });
}

module.exports = { getTopDocumentsForSongTitle }
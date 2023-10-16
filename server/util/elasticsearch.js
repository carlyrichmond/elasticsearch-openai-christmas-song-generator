const elasticsearch = require("@elastic/elasticsearch");

const cloudID = process.env.ELASTIC_CLOUD_ID;
const apiKey = process.env.ELASTIC_API_KEY;
const index = "bytes-discuss-dense-search";

const client = new elasticsearch.Client({
  cloud: { id: cloudID },
  auth: { apiKey: apiKey },
});

async function getTopDocumentForQuestion(question) {
  if (!client) {
    throw new Error("Unable to connect to Elasticsearch")
  }
    return client.search({
        index: index,
        fields: ["solution.text"],
        knn: {
            field: "title_vector.predicted_value",
            k: 5,
            num_candidates: 100,
            query_vector_builder: {
              text_embedding: { 
                model_id: "sentence-transformers__all-mpnet-base-v2", 
                model_text: question
              }
            }
          }
        
    });
}

module.exports = { getTopDocumentForQuestion }
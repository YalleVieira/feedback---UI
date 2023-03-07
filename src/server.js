import { createServer } from "miragejs";

const feedbacks = [
  {
    id: 1,
    rating: 10,
    text: "This is feedback item 1 coming from the backend",
  },
  {
    id: 2,
    rating: 6,
    text: "This is feedback item 1 coming from the backend",
  },
  {
    id: 3,
    rating: 9,
    text: "This is feedback item 1 coming from the backend",
  },
];

createServer({
  routes() {
    this.namespace = "api";

    this.post("/feedbacks", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      attrs.id = 4;

      console.log(attrs.text);
      return { attrs };
    });

    this.get("/feedbacks", () => ({
      feedbacks,
    }));

    this.passthrough();
  },
});

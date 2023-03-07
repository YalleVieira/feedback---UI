import { Model, createServer } from "miragejs";

const feedbacks = [];

createServer({
  models: {
    feedback: Model,
  },

  seeds(server) {
    server.create("feedback", {
      id: 1,
      rating: 10,
      text: "This is feedback item 1 coming from the backend",
    });
    server.create("feedback", {
      id: 2,
      rating: 6,
      text: "This is feedback item 1 coming from the backend",
    });
    server.create("feedback", {
      id: 3,
      rating: 9,
      text: "This is feedback item 1 coming from the backend",
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/feedbacks", (schema) => {
      return schema.feedbacks.all();
    });

    this.post("/feedbacks", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      attrs.id = 4;

      console.log(attrs.text);
      return { attrs };
    });

    this.patch("/feedbacks/:id", function (schema, request) {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let feedbacks = schema.feedbacks.find(id);

      return feedbacks.update(newAttrs);
    });

    this.delete("/feedbacks/:id", (schema, request) => {
      let id = request.params.id;

      return schema.feedbacks.find(id).destroy();
    });

    this.passthrough();
  },
});

const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "My API",
        description: "Temple API",
    },
    host: "localhost:8080",
    schemes: ["http"],
    definitions: {
        newTemple: {
            temple_id: 555,
            name: "any",
            location: "any",
            dedicated: "2024-01-12",
          },
        updateTemple: {
            name: "new",
            location: "new",
            dedicated: "2024-12-22",
          },
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//    await import("./index.js");
// });
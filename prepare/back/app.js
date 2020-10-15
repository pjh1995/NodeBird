var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// var schemas = require("./graphql/sceme.graphql");
// var resolvers = require("./graphql/resolvers");
var schema = buildSchema(`
  type Query {
    id: String
  }
`); // hello라는 메소드 있는데 문자열임

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `); // hello라는 메소드 있는데 문자열임

// var root = {
//   hello: () => {
//     return "Hello world!";
//   },
// }; //hello라는 메소드

var root = {
  id: () => {
    return peoples[0].id;
  },
};

// test
// query{
//   hello
// }
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));

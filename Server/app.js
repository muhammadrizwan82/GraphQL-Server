const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
//https: //www.youtube.com/watch?v=jflhB57loAU&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&index=14

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4500, () => {
    console.log('Server is listen at 4500')
});
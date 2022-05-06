const experss=require('express');
const {graphqlHTTP} = require('express-graphql')
const app = experss();
const myGraphQlSchema=require('./shema');
app.use('/graphql',graphqlHTTP({
    schema: myGraphQlSchema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log('server 4000. portta çalişiıyor');
})
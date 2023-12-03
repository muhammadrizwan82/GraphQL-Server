
const graphql = require('graphql');
const _ = require('lodash');
// Define your GraphQL schema
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
} = graphql;


const dataLoader = require('./dataLoader');

// Load authors and books data
const authors = dataLoader.loadAuthors();
const books = dataLoader.loadBooks();


//Book Object
const BookType = new GraphQLObjectType({

    name: 'Book',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLInt },
        publishedDate: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
})

const BooksType = new GraphQLObjectType({

    name: 'Books',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLInt },
        publishedDate: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
})


//Author Object
const AuthorType = new GraphQLObjectType({

    name: 'author',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        nationality: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent)
                return _.filter(books, { authorId: parent.id })
            }

        }
    })
})

const AuthorsType = new GraphQLObjectType({

    name: 'authors',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        nationality: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent)
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

// Define a resolver function
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                console.log('bookId->', args.id);
                return _.find(books, { id: args.id });
            }
        },
        bookByName: {
            type: new GraphQLList(BooksType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                console.log('bookId->', args.name);
                return _.filter(books, { name: args.name });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                console.log('authorId->', args.id);
                return _.find(authors, { id: args.id });
            }
        },
        authorByName: {
            type: new GraphQLList(AuthorsType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                console.log('name->', args.name);
                return _.filter(authors.filter((a) => a.name.includes(args.name)));
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})

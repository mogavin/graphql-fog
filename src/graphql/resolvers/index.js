const { mergeResolvers } = require('merge-graphql-schemas'),
Pagamento = require('./Pagamento');

const resolvers = [Pagamento];

module.exports = mergeResolvers(resolvers);

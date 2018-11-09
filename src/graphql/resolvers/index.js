const { mergeResolvers } = require('merge-graphql-schemas'),
User = require('./User');

const resolvers = [User];

module.exports = mergeResolvers(resolvers);

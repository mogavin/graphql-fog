module.exports = {
	Query: {
    user: (root, args, context, info) => {
      return {name: 'Teste'};
    }
	},
}
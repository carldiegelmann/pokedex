const pokemonMiddleware = () => (next) => (action) => {
  return next(action);
};

export {pokemonMiddleware};

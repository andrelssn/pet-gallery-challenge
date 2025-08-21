module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // ✨ Linha chave: Garante que o Babel entenda JSX e o `runtime: 'automatic'`
    // evita que você precise importar 'React' em cada arquivo JSX/TSX.
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};

module.exports = {
  printWidth: 100,
  singleQuote: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

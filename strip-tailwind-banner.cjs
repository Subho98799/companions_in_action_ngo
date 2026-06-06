const plugin = () => {
  return (root) => {
    root.walkComments((comment) => {
      if (/tailwindcss v\d/.test(comment.text)) {
        comment.remove();
      }
    });
  };
};
plugin.postcss = true;

module.exports = plugin;

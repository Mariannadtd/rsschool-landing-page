export default {
  base: '/rsschool-landing-page/',
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        menu: 'menu.html',
      },
    },
    sourcemap: true,
  },
};


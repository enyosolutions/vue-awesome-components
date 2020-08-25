<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/">Home</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/awesomelist">Awesomelist</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/awesometable">AwesomeTable</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/awesomecrud">Crud component</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/awesomecrud-advanced">Crud component advanced</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div id="app">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

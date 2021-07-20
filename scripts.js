const BASE_URL = "https://swapi.dev/api/planets";

window.dataTable = () => ({
  rows: [],
  loading: true,
  searchInput: "",
  total: null,
  perPage: 0,
  currentPage: 1,
  initData() {
    this.fetchData();
  },
  fetchData() {
    this.loading = true;
    fetch(`${BASE_URL}?page=${this.currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        this.rows = data.results;
        this.total = data.count;
        this.perPage = data.results.length;
        this.loading = false;
      });
  },
  goToPage(n) {
    this.currentPage = n;
    this.fetchData();
  },
});

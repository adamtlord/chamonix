const BASE_URL = "https://swapi.dev/api/planets";

window.dataTable = () => ({
  // properties
  rows: [],
  loading: true,
  searchInput: "",
  prevSearch: "",
  totalRecords: null,
  pageSize: 10,
  spreadSize: 3,
  currentPage: 1,
  // methods
  initData() {
    this.fetchData();
  },
  fetchData() {
    this.loading = true;
    if (this.prevSearch !== this.searchInput) {
      this.currentPage = 1;
    }
    fetch(`${BASE_URL}?page=${this.currentPage}&search=${this.searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        this.rows = data.results;
        this.totalRecords = data.count;
        this.pageSize = data.results.length;
        this.loading = false;
        this.prevSearch = this.searchInput;
      });
  },
  goToPage(n) {
    this.currentPage = n;
    this.fetchData();
  },
  search() {
    this.fetchData();
  },
  // filters
  intComma(val) {
    if (Number.isNaN(parseInt(val, 10))) {
      return val;
    }
    return parseInt(val, 10).toLocaleString();
  },
  // getters
  pageSpread() {
    const range = [];
    const start = Math.max(this.currentPage - (this.spreadSize - 1), 1);
    const end = Math.min(
      this.currentPage + (this.spreadSize - 1),
      Math.ceil(this.totalRecords / this.pageSize)
    );
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    return range;
  },
  // computed
  get totalPages() {
    return Math.ceil(this.totalRecords / this.pageSize);
  },
});

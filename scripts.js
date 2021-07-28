const BASE_URL = "https://swapi.dev/api/planets";

const filters = {
  intComma: (val) => {
    if (Number.isNaN(parseInt(val, 10))) {
      return val;
    }
    return parseInt(val, 10).toLocaleString();
  },
};

window.dataTable = () => ({
  // properties
  columns: [
    {
      name: "Name",
      attribute: "name",
      sortable: "name",
      classNames: "font-medium",
    },
    {
      name: "Size",
      attribute: "diameter",
      sortable: "diameter",
      format: filters.intComma,
    },
    {
      name: "Terrain",
      attribute: "terrain",
    },
    {
      name: "Climate",
      attribute: "climate",
    },
    {
      name: "Pop.",
      attribute: "population",
      sortable: "population",
      format: filters.intComma,
    },
  ],
  rows: [],
  loading: true,
  fetchUrl: "",
  searchInput: "",
  prevSearch: "",
  totalRecords: null,
  pageSize: "10",
  spreadSize: 3,
  currentPage: 1,
  sortAttribute: "",
  sortDirection: "asc",
  prevSort: "",
  // methods
  initData() {
    this.fetchData();
  },
  fetchData() {
    this.loading = true;
    const sortParam = `${this.sortDirection === "desc" ? "-" : ""}${
      this.sortAttribute
    }`;
    if (this.prevSearch !== this.searchInput || this.prevSort !== sortParam) {
      this.currentPage = 1;
    }
    this.fetchUrl = `${BASE_URL}?page=${this.currentPage}${
      this.searchInput ? `&search=${this.searchInput}` : ""
    }${sortParam ? `&ordering=${sortParam}` : ""}&page_size=${this.pageSize}`;
    fetch(this.fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        this.rows = data.results;
        this.totalRecords = data.count;
        this.loading = false;
        this.prevSearch = this.searchInput;
        this.prevSort = sortParam;
      });
  },
  goToPage(n) {
    this.currentPage = n;
    this.fetchData();
  },
  search() {
    this.fetchData();
  },
  sortBy(sortAttribute) {
    if (this.sortAttribute !== sortAttribute) {
      this.sortAttribute = sortAttribute;
      this.sortDirection = "asc";
    } else if (this.sortDirection === "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortAttribute = "";
      this.sortDirection = "asc";
    }
    this.fetchData();
  },
  // getters
  pageSpread() {
    const range = [];
    const start = Math.max(this.currentPage - (this.spreadSize - 1), 1);
    const end = Math.min(
      this.currentPage + (this.spreadSize - 1),
      Math.ceil(this.totalRecords / parseInt(this.pageSize, 10))
    );
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    return range;
  },
  // computed
  get totalPages() {
    return Math.ceil(this.totalRecords / parseInt(this.pageSize, 10));
  },
});

const BASE_URL = "https://swapi-json-server.onrender.com/planets";

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
    if (
      this.prevSearch !== this.searchInput ||
      this.prevSort !== this.sortAttribute + this.sortDirection
    ) {
      this.currentPage = 1;
    }
    this.fetchUrl = `${BASE_URL}?_page=${this.currentPage}${
      this.searchInput ? `&q=${this.searchInput}` : ""
    }${
      this.sortAttribute
        ? `&_sort=${this.sortAttribute}&_order=${this.sortDirection}`
        : ""
    }&_limit=${this.pageSize}`;
    fetch(this.fetchUrl)
      .then((response) => {
        this.totalRecords = response.headers.get("x-total-count");
        return response.json();
      })
      .then((data) => {
        this.rows = data;
        this.loading = false;
        this.prevSearch = this.searchInput;
        this.prevSort = this.sortAttribute + this.sortDirection;
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

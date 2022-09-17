// This is important! This is where the data comes from.
const BASE_URL = "https://swapi-json-server.onrender.com/planets";

// filters -- any functions you might want to apply to cell data can go here
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
  // define your columns
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
  prevPageSize: "",
  // methods
  initData() {
    this.fetchData();
  },
  fetchData() {
    this.loading = true;
    // if search, sort, or page size changes, reset to page 1
    if (
      this.prevSearch !== this.searchInput ||
      this.prevSort !== this.sortAttribute + this.sortDirection ||
      this.prevPageSize !== this.pageSize
    ) {
      this.currentPage = 1;
    }
    // construct url
    const params = new URLSearchParams();
    params.append("_page", this.currentPage);
    params.append("_limit", this.pageSize);

    if (this.searchInput) {
      params.append("q", this.searchInput);
    }

    if (this.sortAttribute) {
      params.append("_sort", this.sortAttribute);
      params.append("_order", this.sortDirection);
    }

    this.fetchUrl = `${BASE_URL}?${params.toString()}`;

    fetch(this.fetchUrl)
      .then((response) => {
        // json-server returns total records in a header ¯\_(ツ)_/¯
        this.totalRecords = response.headers.get("x-total-count");
        return response.json();
      })
      .then((data) => {
        this.rows = data;
        this.loading = false;
        // store the previously used params to compare against.
        // I think this is easier than setting up a watch method.
        this.prevSearch = this.searchInput;
        this.prevSort = this.sortAttribute + this.sortDirection;
        this.prevPageSize = this.pageSize;
      });
  },
  goToPage(n) {
    this.currentPage = n;
    this.fetchData();
  },
  sortBy(sortAttribute) {
    // toggle up, toggle down, toggle off
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

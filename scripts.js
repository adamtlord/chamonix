const BASE_URL = "https://swapi.dev/api/planets";

window.dataTable = () => ({
  rows: [],
  loading: true,
  searchInput: "",
  total: null,
  perPage: 10,
  currentPage: 1,
  sorted: {
    field: "name",
    desc: false,
  },
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
  // compareOnKey(key, rule) {
  //   return (a, b) => {
  //     if (
  //       key === "name" ||
  //       key === "job" ||
  //       key === "email" ||
  //       key === "country"
  //     ) {
  //       let comparison = 0;
  //       const fieldA = a[key].toUpperCase();
  //       const fieldB = b[key].toUpperCase();
  //       if (rule === "asc") {
  //         if (fieldA > fieldB) {
  //           comparison = 1;
  //         } else if (fieldA < fieldB) {
  //           comparison = -1;
  //         }
  //       } else if (fieldA < fieldB) {
  //         comparison = 1;
  //       } else if (fieldA > fieldB) {
  //         comparison = -1;
  //       }
  //       return comparison;
  //     }
  //     if (rule === "asc") {
  //       return a.year - b.year;
  //     }
  //     return b.year - a.year;
  //   };
  // },
  // search(value) {
  //   if (value.length > 1) {
  //     const options = {
  //       shouldSort: true,
  //       keys: ["name", "job"],
  //       threshold: 0,
  //     };
  //     const fuse = new Fuse(data, options);
  //     this.items = fuse.search(value).map((elem) => elem.item);
  //   } else {
  //     this.items = data;
  //   }
  //   // console.log(this.items.length)

  //   this.changePage(1);
  //   this.showPages();
  // },
  // sort(field, rule) {
  //   this.items = this.items.sort(this.compareOnKey(field, rule));
  //   this.sorted.field = field;
  //   this.sorted.rule = rule;
  // },
});

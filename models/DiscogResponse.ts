import DiscogRecord from "./DiscogRecord";

interface DiscogResponse {
  pagination: Pagination;
  releases: DiscogRecord[];
}

interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: any;
}
export default DiscogResponse;

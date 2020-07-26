import http from "../http-common";

class RosterService {
  create(data: any) {
    return http.post("/rosters", data);
  }
}

export default new RosterService();

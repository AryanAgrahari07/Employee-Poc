// re-export helpers used by Apollo client
export function getAuthToken() {
    return localStorage.getItem("token");
  }
  
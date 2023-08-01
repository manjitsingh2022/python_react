
export function authHeader() {
  // return authorization header with jwt token
  let token = localStorage.getItem("token");
  if (token) {
    return {
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
export function getOptions() {
  let options = {};
  let token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      Authorization: "Token " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    options.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }

  return options;
}

export default getOptions;
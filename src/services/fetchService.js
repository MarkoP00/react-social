export default {
  baseLink: "https://api.apiforge.net/v1/api",

  get: async function (endPoint) {
    const response = await fetch(this.baseLink + endPoint, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(response.message || "Problem while fetching");
    }
  },
  post: async function (endPoint, body) {
    const response = await fetch(this.baseLink + endPoint, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(response.message || "Problem while fetching");
    }
  },
  patch: async function (endPoint, body) {
    const response = await fetch(this.baseLink + endPoint, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(response.message || "Problem while fetching");
    }
  },
  delete: async function (endPoint) {
    const response = await fetch(this.baseLink + endPoint, {
      method: "DELETE",
      headers: headers(),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(response.message || "Problem while fetching");
    }
  },
};

function headers() {
  const api_key = "66d0bbdc53f6449f515f5023";
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    api_key: api_key,
    authorization: `Bearer ${token}`,
  };
}

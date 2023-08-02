const API_URL = "http://localhost:5001/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
    }
    throw error;
  }
);

export async function registration(registrationData) {
  try {
    let response = await $api.post("/registration", registrationData);
    if (response.status == 200 || response.statusText == "OK") {
      localStorage.setItem("token", response.data.accessToken);
    }
    return await response;
  } catch (error) {
    console.log(error.response?.data?.message);
    return await error;
  }
}

export async function login(loginData) {
  try {
    let response = await $api.post("/login", loginData);
    if (response.status == 200 || response.statusText == "OK") {
      localStorage.setItem("token", response.data.accessToken);
    }
    return await response;
  } catch (error) {
    return await error;
  }
}

export async function updateAuth() {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });

    localStorage.setItem("token", response.data.accessToken);
    return await response;
  } catch (e) {
    console.log(e.response?.data?.message);
  } finally {
  }
}

export async function checkAuth() {
  try {
    let response = await $api.get("/checkAuth");
    return await response;
  } catch (error) {
    return await error;
  }
}

export async function logout() {
  try {
    const response = await $api.post("/logout");
    localStorage.removeItem("token");
    return await response;
  } catch (e) {
    console.log(e.response?.data?.message);
  }
}

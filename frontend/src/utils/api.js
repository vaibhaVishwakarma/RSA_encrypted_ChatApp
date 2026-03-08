const AUTH_KEY = "chat-auth";

const safeGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key, value) => {
  try {
    if (value != null) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {}
};

const safeRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};

export const getToken = () => {
  const raw = safeGet(AUTH_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return data?.token || null;
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  const raw = safeGet(AUTH_KEY);
  let data = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {}
  data.token = token || undefined;
  if (!token) delete data.token;
  safeSet(AUTH_KEY, Object.keys(data).length ? JSON.stringify(data) : null);
};

export const getAuth = () => {
  const raw = safeGet(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setAuth = (user, token) => {
  const data = { user: user || undefined, token: token || undefined };
  if (!user && !token) {
    safeRemove(AUTH_KEY);
  } else {
    safeSet(AUTH_KEY, JSON.stringify(data));
  }
};

export const clearAuth = () => {
  safeRemove(AUTH_KEY);
  safeRemove("chat-user");
};

export const getAuthHeaders = () => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers["X-Auth-Token"] = token;
  }
  return headers;
};

export const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers["X-Auth-Token"] = token;
  }

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });

  if (res.status === 401) {
    clearAuth();
    window.dispatchEvent(new CustomEvent("auth-expired"));
  }
  return res;
};

// The live gateway is deliberately opt-in. Leave the flag off for the visual demo.
const baseUrl = import.meta.env.VITE_PIPELINE_API_URL || "/api";
export const pipelineLiveEnabled =
  import.meta.env.VITE_PIPELINE_LIVE === "true";
let csrfToken = sessionStorage.getItem("lexis_csrf") || "";

async function request(path, options = {}) {
  const response = await fetch(baseUrl + path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-LEXIS-CSRF": csrfToken } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.error || "Pipeline API request failed");
    error.issues = body.issues || [];
    error.status = response.status;
    throw error;
  }
  return body;
}

export const pipelineApi = {
  listRequests: (params = {}) =>
    request("/requests?" + new URLSearchParams(params)),
  getRequest: (id) => request("/requests/" + encodeURIComponent(id)),
  getArtifacts: (id) =>
    request("/requests/" + encodeURIComponent(id) + "/artifacts"),
  getAudit: (id) => request("/requests/" + encodeURIComponent(id) + "/audit"),
  login: async (email, password) => {
    const body = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    csrfToken = body.csrfToken || "";
    sessionStorage.setItem("lexis_csrf", csrfToken);
    return body;
  },
  logout: async () => {
    const body = await request("/auth/logout", { method: "POST" });
    csrfToken = "";
    sessionStorage.removeItem("lexis_csrf");
    return body;
  },
  me: () => request("/auth/me"),
  changePassword: (currentPassword, nextPassword) =>
    request("/auth/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, nextPassword }),
    }),
  revokeOtherSessions: () => request("/auth/sessions", { method: "DELETE" }),
  listTeam: () => request("/team"),
  inviteTeamMember: (email, role) =>
    request("/team/invitations", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    }),
  updateTeamMember: (id, payload) =>
    request("/team/" + encodeURIComponent(id), {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  acceptInvitation: (token, name, password) =>
    request("/auth/accept-invitation", {
      method: "POST",
      body: JSON.stringify({ token, name, password }),
    }),
  createRequest: (brief) =>
    request("/requests", { method: "POST", body: JSON.stringify({ brief }) }),
  createRequestFromTopic: (slug) =>
    request("/content-plan/" + encodeURIComponent(slug) + "/request", {
      method: "POST",
    }),
  updateBrief: (id, brief) =>
    request("/requests/" + encodeURIComponent(id) + "/brief", {
      method: "PATCH",
      body: JSON.stringify({ brief }),
    }),
  runNext: (id) =>
    request("/requests/" + encodeURIComponent(id) + "/run-next", {
      method: "POST",
      body: JSON.stringify({ confirmation: "RUN NEXT STAGE" }),
    }),
  runUntilIdle: (id, maxSteps = 20) =>
    request("/requests/" + encodeURIComponent(id) + "/run-until-idle", {
      method: "POST",
      body: JSON.stringify({ confirmation: "RUN UNTIL IDLE", maxSteps }),
    }),
  routeRevision: (id, payload) =>
    request("/requests/" + encodeURIComponent(id) + "/revisions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  publish: (id) =>
    request("/requests/" + encodeURIComponent(id) + "/publish", {
      method: "POST",
      body: JSON.stringify({ confirmation: "PUBLISH ARTICLE" }),
    }),
  getPublicationPreview: (id) =>
    request("/requests/" + encodeURIComponent(id) + "/preview"),
  listTopics: (params = {}) =>
    request("/content-plan?" + new URLSearchParams(params)),
  listQueue: () => request("/queue"),
  addToQueue: (requestIds) =>
    request("/queue", { method: "POST", body: JSON.stringify({ requestIds }) }),
  updateQueue: (requestId, payload) =>
    request("/queue/" + encodeURIComponent(requestId), {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  removeFromQueue: (requestId) =>
    request("/queue/" + encodeURIComponent(requestId), { method: "DELETE" }),
  runQueue: (limit = 1) =>
    request("/queue/run", {
      method: "POST",
      body: JSON.stringify({ confirmation: "RUN QUEUE", limit }),
    }),
  getReportSummary: () => request("/reports/summary"),
  subscribe: (handlers = {}) => {
    const stream = new EventSource(baseUrl + "/events", {
      withCredentials: true,
    });
    const forward = (type) => (event) => {
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch {}
      handlers.onEvent?.({ type, ...data });
    };
    stream.addEventListener("ready", forward("ready"));
    stream.addEventListener("requests.changed", forward("requests.changed"));
    stream.addEventListener("queue.changed", forward("queue.changed"));
    stream.addEventListener("heartbeat", forward("heartbeat"));
    stream.onerror = () => handlers.onError?.();
    stream.onopen = () => handlers.onOpen?.();
    return () => stream.close();
  },
};

# LEXIS Web and Content Pipeline API

## Purpose

The LEXIS web interface must not read pipeline JSON files or receive Telegram,
Neuromedia, or Content API keys. A server API gateway sits between the browser
and the existing TypeScript content pipeline.

    Browser (React) -> authenticated Web API -> ArtifactStore / ContentPipeline -> agents / publisher

The gateway can run beside the bot on the same server and reuse the existing
ArtifactStore, ContentPipeline, and TopicQueueStore modules.

## Request endpoints

## Live events

- GET /api/events — authenticated Server-Sent Events stream. It emits `ready`, `requests.changed`, `queue.changed`, and periodic `heartbeat` events.
- Clients may reconnect with `Last-Event-ID`; the service keeps a short replay buffer. The browser still refreshes authoritative REST resources after each change event, rather than trusting event payloads as data.
- If the stream disconnects, the workspace uses a 15-second REST polling fallback until the browser reconnects.

- GET /api/requests — list requests, optionally filtered by status, inputType, or q; supports `sort`, `page`, and `pageSize`.
- POST /api/requests — create a topic or news brief.
- GET /api/requests/:id — request and its current status.
- GET /api/requests/:id/artifacts — facts, structure, draft, validation, review,
  publication report, and provenance.
- POST /api/requests/:id/run-next — run one pipeline stage.
- POST /api/requests/:id/run-until-idle — run until waiting, blocked, or approval; requires `{ confirmation: "RUN UNTIL IDLE", maxSteps? }`. It never publishes automatically.
- PATCH /api/requests/:id/brief — edit a brief before the next stage.
- POST /api/requests/:id/revisions — route an issue to facts, structure, writer, or system.
- POST /api/requests/:id/publish — publish only after approval; requires publisher/admin role and `{ confirmation: "PUBLISH ARTICLE" }`.
- GET /api/requests/:id/preview — return the exact CMS document generated from the current assembled material, its publishability and status; this endpoint never publishes.

## Plan and queue endpoints

- GET /api/content-plan — topics filtered by wave, kind, q, and status.
- POST /api/content-plan/:slug/request — create a request from a topic.
- GET /api/queue — active production queue.
- POST /api/queue — add existing requests by `{ requestIds: [] }`.
- PATCH /api/queue/:requestId — update queue entry status/note, or send `{ order: [requestId, ...] }` to replace the full order.
- DELETE /api/queue/:requestId — remove an entry that has not been run.
- POST /api/queue/run — sequentially run pending entries through approval; requires `{ confirmation: "RUN QUEUE", limit? }`. Publication always remains a separate confirmed operation.

## Error contract

The gateway returns a code, readable message, and issue list with an owner.
The interface must show the issue in the validation screen and route it to the
responsible owner instead of hiding it.

## CMS publication contract

The publisher sends `POST CONTENT_API_URL` with `{ doc, mode: "publish", requestId, idempotencyKey }`. The `doc` contains SEO meta, author, section, allowed internal links, renderable blocks, and provenance. It additionally sends an `Idempotency-Key` header derived from request id and slug. The CMS must return JSON `{ ok, id?, slug?, url?, updated?, error?, detail?, problems? }`; `updated: true` represents an idempotent update rather than a second article. Validation failures (`422`) are routed to the owning facts/structure/writer stage.

## Security

Never return TELEGRAM_BOT_TOKEN, NEUROMEDIA_API_KEY, CONTENT_API_TOKEN, server
paths, server logs, or environment files to the browser. The server checks all
permissions; hiding a client button is not permission control.

## Required web roles

- viewer — view requests and published reports;
- editor — create and edit briefs and run allowed stages;
- publisher — approve publishing;
- admin — manage team, integrations, and limits.

## Authentication and workspace members

- The first administrator is bootstrapped from `WEB_API_USERNAME` and `WEB_API_PASSWORD` on the first service start. The password is stored as a salted `scrypt` hash in the protected data directory, never in browser data or API responses.
- `GET /api/auth/me` returns the authenticated profile and role. `PATCH /api/auth/password` changes a password after verifying the current one; it invalidates existing sessions. `DELETE /api/auth/sessions` revokes all other sessions for the current account.
- Admin-only team endpoints: `GET /api/team`, `POST /api/team/invitations`, and `PATCH /api/team/:id`. Invitations are single-use and expire after seven days. `POST /api/auth/accept-invitation` creates the invited account.
- Server-side role enforcement: viewers may read; editors can create, edit and run allowed stages; publishers can also confirm publication; only admins manage members and roles.

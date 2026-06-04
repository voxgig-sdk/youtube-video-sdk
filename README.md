# YoutubeVideo SDK

Search YouTube videos by text and get metadata like views, upload date, duration, and descriptions

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About YouTube Video API

The YouTube Video API is a small endpoint hosted on [abhi-api.vercel.app](https://abhi-api.vercel.app), a free public-API hub maintained by Abhishek Suresh. It exposes a single text-search endpoint that returns YouTube video metadata for the supplied query.

What you get from the API:

- Video search results for a free-text query
- Per-video metadata including views, upload date, duration, and description

Operational notes: the upstream service is community-run and has no published authentication, rate-limit, or licence terms. CORS is reported as disabled on the [freepublicapis.com listing](https://freepublicapis.com/youtube-video-api), so browser callers may need a proxy. Treat the endpoint as best-effort and avoid depending on it for production traffic.

## Try it

**TypeScript**
```bash
npm install youtube-video
```

**Python**
```bash
pip install youtube-video-sdk
```

**PHP**
```bash
composer require voxgig/youtube-video-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/youtube-video-sdk/go
```

**Ruby**
```bash
gem install youtube-video-sdk
```

**Lua**
```bash
luarocks install youtube-video-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { YoutubeVideoSDK } from 'youtube-video'

const client = new YoutubeVideoSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o youtube-video-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "youtube-video": {
      "command": "/abs/path/to/youtube-video-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Yts** | YouTube video search results — query with a `text` parameter against `GET /api/search/yts` to receive video metadata such as views, upload date, duration, and description. | `/api/search/yts` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from youtubevideo_sdk import YoutubeVideoSDK

client = YoutubeVideoSDK({})


# Load a specific yts
yts, err = client.Yts(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'youtubevideo_sdk.php';

$client = new YoutubeVideoSDK([]);


// Load a specific yts
[$yts, $err] = $client->Yts(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/youtube-video-sdk/go"

client := sdk.NewYoutubeVideoSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "YoutubeVideo_sdk"

client = YoutubeVideoSDK.new({})


# Load a specific yts
yts, err = client.Yts(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("youtube-video_sdk")

local client = sdk.new({})


-- Load a specific yts
local yts, err = client:Yts(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = YoutubeVideoSDK.test()
const result = await client.Yts().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = YoutubeVideoSDK.test(None, None)
result, err = client.Yts(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = YoutubeVideoSDK::test(null, null);
[$result, $err] = $client->Yts(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Yts(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = YoutubeVideoSDK.test(nil, nil)
result, err = client.Yts(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Yts(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the YouTube Video API

- Upstream: [https://abhi-api.vercel.app](https://abhi-api.vercel.app)

---

Generated from the YouTube Video API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

---
description: engram knowledge graph context
---

## engram

This project has an engram knowledge graph at .engram/.

Rules:
- For codebase or architecture questions, when `.engram/graph.json` exists, first run `engram query "<question>"` (or `engram path "<A>" "<B>"` / `engram explain "<concept>"`); these return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output
- If .engram/wiki/index.md exists, navigate it instead of reading raw files
- If .engram/graph.json is missing but graphify-out/graph.json exists, run `engram migrate-state --dry-run` before relying on legacy state
- If .engram/needs_update exists or .engram/branch.json has stale=true, warn before relying on semantic results and run /engram . --update when appropriate
- If the engram MCP server is active, prefer graph tools like `query_graph`, `get_node`, and `shortest_path` for architecture navigation
- Read `.engram/GRAPH_REPORT.md` only for broad architecture review or when `query` / `path` / `explain` do not surface enough context
- After modifying code files in this session, run `npx engram hook-rebuild` to keep the graph current

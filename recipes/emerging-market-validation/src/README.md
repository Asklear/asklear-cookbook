# Implementation

`check-package.mjs` 校验查询、事实、派生计算、判断、跨平台可比性和独立复核之间的引用关系。

```bash
node src/check-package.mjs example/data.json example/review.json example/run.json
```

它不复制 MCP 的工具或字段契约；查询能力以当前 Agent Docs 和运行响应为准。

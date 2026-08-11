# Implementation

`check-run.mjs` 校验证据台账的最小完整性：研究范围、实体对齐、证据 ID、判断引用、限制和交付物。

```bash
node src/check-run.mjs example/run.json
```

它不封装 MCP 字段或查询参数；这些事实只由当前 Agent Docs 和 MCP 响应定义。

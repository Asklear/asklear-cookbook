# Asklear Cookbook

Production-ready recipes for commercial research with AI Agents.

Asklear Cookbook 收录可运行的商业研究方案。每个 Recipe 从一个真实业务问题出发，最终交付可以用于汇报或持续跟踪的 PPT、PDF 或 Dashboard。

## Recipes

| Recipe | Output | Status |
| --- | --- | --- |
| [Category Market Analysis](recipes/category-market-analysis/) | PPT | Draft |

更多计划中的场景见 [`recipes/README.md`](recipes/README.md)。

## How to use a Recipe

1. 打开 Recipe，先看结果预览和交付物。
2. 复制页面中的“Use with your Agent”指令。
3. 告诉 Agent 研究对象、时间范围和重点问题。
4. Agent 按 `SKILL.md` 完成研究并交付 PPT、PDF 或 Dashboard。

普通用户只需要阅读 Recipe 页面；其他文件用于 Agent 执行和开发维护。

## Repository structure

```text
.
├── README.md
├── AGENTS.md
└── recipes/
    ├── README.md
    ├── _template/
    └── category-market-analysis/
```

一个 Recipe，一个目录，一套代码，一个真实交付物。

每个 Recipe 只维护：

- `README.md`：结果预览和可以直接复制给 Agent 的使用指令；
- `SKILL.md`：Agent 的研究流程；
- `recipe.yaml`：状态、数据依赖和产出类型；
- `src/`：查询、计算和生成代码；
- `example/`：真实输入、研究结果和交付物。

## Agent Docs

接入方式、工具参数、数据字段、指标口径、计费和错误恢复以 [中国站 Agent Docs](https://dashboard.asklear.cn/docs/agent) 或 [国际站 Agent Docs](https://dashboard.asklearai.com/docs/agent) 为准，本仓库不复制维护。

开发和维护规则见 [`AGENTS.md`](AGENTS.md)。

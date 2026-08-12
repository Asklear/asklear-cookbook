# Asklear Cookbook

Production-ready recipes for commercial research with AI Agents.

Asklear Cookbook 收录可运行的商业研究方案。每个 Recipe 从一个真实业务问题出发，最终交付可以用于决策的 HTML、PDF、PPT 或 Dashboard。

## Recipes

| Recipe | Output | Status |
| --- | --- | --- |
| [Category Market Analysis](recipes/category-market-analysis/) | PPT | Draft |
| [Brand Competitive Analysis](recipes/brand-competitive-analysis/) | HTML / PDF | Verified |
| [Emerging Market Validation](recipes/emerging-market-validation/) | HTML / PDF | Verified |

更多计划中的场景见 [`recipes/README.md`](recipes/README.md)。

## How to use a Recipe

1. 打开 Recipe，先看结果预览和交付物。
2. 复制页面中的“Use with your Agent”指令。
3. 如果尚未连接，Agent 会先通过 Asklear 官方 Setup 页面完成连接；你只需处理登录、内测准入和授权，不需要复制 API Key。
4. 告诉 Agent 研究对象；平台、时间和重点问题可以选填。
5. Agent 自动确定默认范围，先完成核心分析，需要额外下钻时再请求确认。
6. 最终获得 HTML、PDF、PPT 或 Dashboard，以及数据口径和限制。

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
- `workflow.md`：Agent 的研究流程；
- `recipe.yaml`：状态、数据依赖和产出类型；
- `src/`：查询、计算和生成代码；
- `example/`：真实输入、研究结果和交付物。

## Repository scope

本仓库只有一个目标：维护可以从头运行、能够复现并产出完整商业研究交付物的 Recipe。它不维护 Asklear 的接入步骤、工具与字段契约、计费和错误规则，不充当生产 API 示例仓库，也不承载官网文章。能力事实链接 Agent Docs；生产服务与 Dashboard 行为由服务仓库维护；编辑型 Research 内容由 Mainpage 维护。

## Agent Docs

接入方式、工具参数、数据字段、指标口径、计费和错误恢复以当前区域唯一的 Agent Docs 入口为准：[中国站](https://dashboard.asklear.cn/docs/agent) / [国际站](https://dashboard.asklearai.com/docs/agent)。同一个 URL 对人类显示网页、对 Agent 返回机器可读 Markdown；本仓库只维护完整研究流程和交付物，不复制这些能力事实。

开发和维护规则见 [`AGENTS.md`](AGENTS.md)。

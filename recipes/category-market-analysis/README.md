# Category Market Analysis

分析一个电商类目的市场规模、趋势和竞争结构，生成可直接用于汇报的市场分析 PPT。

> Status: Draft. 当前目录只建立 Recipe 边界，真实结果和运行代码尚未完成。

## Result preview

完成第一次真实运行后，在这里展示 PPT 预览和下载入口。

## Use with your Agent

使用前先按 [Asklear Agent Docs](https://dashboard.asklear.cn/docs/agent) 完成接入，然后把下面的指令发给 Agent：

```text
请读取下面的 Skill，并使用 Asklear 完成类目市场分析：
https://raw.githubusercontent.com/Asklear/asklear-cookbook/main/recipes/category-market-analysis/SKILL.md

- 平台：京东
- 类目：<填写类目>
- 时间范围：<填写时间范围>
- 重点问题：<填写关注问题>

最终生成一份市场分析 PPT，并说明数据来源、指标口径和限制。
```

当前 Recipe 仍是 Draft，可以用于试跑研究流程；正式 PPT 模板和真实示例尚未完成。

## What you provide

- 平台或数据集；
- 类目名称；
- 研究时间范围；
- 可选的重点品牌、价格带或其他关注问题。

## How it works

1. 对齐类目和时间范围。
2. 计算市场规模、销量和月度趋势。
3. 分析品牌份额、集中度和主要变化。
4. 根据需要补充价格带与重点商品分析。
5. 生成带数据口径、证据和限制说明的 PPT。

## What you get

第一版输出一份市场分析 PPT，至少覆盖：

- 研究范围与核心结论；
- 市场规模和趋势；
- 品牌竞争格局；
- 重点机会与风险；
- 数据来源、口径和限制。

## Limitations

- 当前只声明京东数据集；
- PPT 模板和真实示例尚未完成；
- 查询能力、字段和口径以当前 Agent Docs 与 MCP instructions 为准。

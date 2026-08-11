# Brand Competitive Analysis

判断一个品牌在哪里竞争、相对谁增长，以及变化由什么驱动。

> Status: Verified example. 「睡洞 EVERYTHINK」示例来自真实研究，数据范围为 2026-01 至 2026-06，不代表当前市场。

## Example

- [HTML 报告](example/report.html)
- [PDF 报告](example/report.pdf)
- [证据台账](example/run.json)

示例发现：睡洞在京东 U 型枕品类的份额从 7.9% 升至 24.2%，天猫同期维持在 14%–16%；商品级对比显示，京东增长同时来自旗舰款降价和新增低价款。

## Use with your Agent

连接 Asklear MCP，把下面的指令发给 Agent。通常只需填写品牌和问题。

```text
请使用 Asklear 的 Brand Competitive Analysis Recipe 完成研究：
https://raw.githubusercontent.com/Asklear/asklear-cookbook/main/recipes/brand-competitive-analysis/workflow.md

- 品牌：<必填>
- 想解决的问题：<可选；默认回答品牌在哪里竞争、相对谁增长、变化由什么驱动>
- 指定范围：<可选；平台、时间、品类或竞品>

未指定范围时，请自动选择当前可访问的平台和最近 6 个完整月，完成品牌别名与核心品类对齐。先完成核心分析；只有关键判断需要商品级验证时才继续下钻。最终交付一份可查看的 HTML 或 PDF 报告。
```

Agent 只会在品牌身份存在实质歧义、数据范围不足或查询需要费用确认时询问你。

## What you get

- 一句话结论与研究范围；
- 品牌趋势、核心品类和市场份额；
- 主要竞品与价格结构；
- 关键变化的商品级验证；
- 商业建议、未知项和数据限制。

## Limitations

- 品牌多写法无法确认时不能强行归并；
- Top N 商品不能代表完整价格分布；
- 均价变化不能单独证明同款涨跌价；
- 相关性和商品结构变化不能直接证明商业因果；
- 查询能力与指标定义以当前 [Agent Docs](https://dashboard.asklear.cn/docs/agent) 和运行响应为准。

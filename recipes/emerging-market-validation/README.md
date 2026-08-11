# Emerging Market Validation

判断一个热门赛道是否已经形成真实零售需求，以及增长是否广泛、持续。

> Status: Verified example. AI 眼镜示例来自真实研究，数据范围为 2026-01 至 2026-06，不代表当前市场。

## Example

- [HTML 报告](example/report.html)
- [PDF 报告](example/report.pdf)
- [核心证据包](example/data.json)
- [商品下钻记录](example/drilldown.md)
- [事实复核结果](example/review.json)

示例结论只达到“早期成交”：京东与天猫都出现了可观察的零售增长，但增量集中于少数品牌和商品；激活、留存和持续佩戴仍未得到证明。

## Use with your Agent

连接 Asklear MCP，把下面的指令发给 Agent。通常只需填写赛道。

```text
请使用 Asklear 的 Emerging Market Validation Recipe 完成研究：
https://raw.githubusercontent.com/Asklear/asklear-cookbook/main/recipes/emerging-market-validation/workflow.md

- 赛道：<必填，例如 AI 眼镜>
- 想解决的问题：<可选；默认判断它处于概念热度、早期成交、结构扩散还是持续采用>
- 指定范围：<可选；平台、时间或对照市场>

未指定范围时，请自动对齐可观测的零售代理，使用当前可访问的平台和最近 6 个完整月。先完成零售成交验证；只有结论需要时才做商品下钻和公开资料研究。最终交付一份可查看的 HTML 或 PDF 报告，并明确当前能证明什么、不能证明什么。
```

Agent 只会在代理范围存在实质歧义、数据不足或查询需要费用确认时询问你。

## What you get

- 市场阶段判断；
- 量、额、价和月度趋势；
- 品牌集中度与商品增量来源；
- 平台差异和相邻市场对照；
- 替代解释、反证条件和下一步指标；
- 数据口径、证据与限制。

## Limitations

- 平台类目通常只是市场概念的代理，不等于完整行业；
- 下单不等于退货后成交、激活、留存或持续使用；
- 跨平台绝对规模通常不可直接合并；
- 新品、促销、缺货和商品链接迁移都可能改变短期结果；
- 没有外部证据能力时，结论最多覆盖零售成交，不能升级为市场采用；
- 查询能力与指标定义以当前 [Agent Docs](https://dashboard.asklear.cn/docs/agent) 和运行响应为准。

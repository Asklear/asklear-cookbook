# Brand Competitive Analysis

识别一个品牌的核心品类、竞争位置和增长机制，生成可用于品牌复盘或策略讨论的竞争分析 PPT。

> Status: Draft. 本 Recipe 来自一次真实端到端分析的脱敏抽象；公开示例和 PPT 模板仍待补齐。

## Result preview

完成首个可公开的脱敏运行后，在这里展示 PPT 预览和结果文件。

## Use with your Agent

使用前先连接 Asklear MCP，然后把下面的指令发给 Agent：

```text
请读取下面的 workflow，并使用 Asklear 完成品牌竞争分析：
https://raw.githubusercontent.com/Asklear/asklear-cookbook/main/recipes/brand-competitive-analysis/workflow.md

- 品牌：<填写品牌>
- 平台：<填写平台>
- 时间范围：<填写时间范围>
- 重点问题：<填写关注问题>

最终生成一份品牌竞争分析 PPT，并说明数据来源、实际查询口径、关键歧义和限制。
```

## What you provide

- 品牌名称及已知别名；
- 目标平台和时间范围；
- 可选的重点品类、竞品或策略问题。

## How it works

1. 对齐品牌身份和各平台原始写法。
2. 从品牌结构中识别核心品类。
3. 分析品类规模、品牌份额、竞品和价格结构。
4. 用商品或 SKU 证据验证重要、反直觉的判断。
5. 形成结论、证据、建议和限制完整的 PPT。

## What you get

- 执行摘要与关键判断；
- 品牌趋势和核心品类；
- 品类份额、主要竞品和价格结构；
- 重要变化的商品级验证；
- 策略启示、数据口径和限制。

## Limitations

- 原始品牌值可能存在多写法，无法确认时必须保留歧义；
- 价格带和商品验证受当前数据字段、返回范围与权限影响；
- 相关性不能直接证明因果；
- 查询能力和指标定义以当前 Agent Docs 与 MCP 响应为准。

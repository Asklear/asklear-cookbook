# Recipes

一个 Recipe 对应一项完整商业研究任务，最终交付 PPT、PDF 或 Dashboard，而不是一次工具调用。

打开一个 Recipe，查看结果预览，然后复制其中的“Use with your Agent”指令即可开始。Recipe 的 `workflow.md` 负责完整研究流程；Asklear Docs 中的 Query Pattern 只负责原子查询组合。

## Current

| Recipe | Business question | Output | Status |
| --- | --- | --- | --- |
| [Category Market Analysis](category-market-analysis/) | 一个类目的规模、趋势和竞争结构如何？ | PPT | Draft |
| [Brand Competitive Analysis](brand-competitive-analysis/) | 一个品牌在哪些品类竞争，份额与增长由什么驱动？ | PPT | Draft |

## Planned

| Recipe | Business question | Output |
| --- | --- | --- |
| Product Opportunity | 哪些价格带、卖点或细分需求存在机会？ | PPT |
| Product Growth Analysis | 一个商品为什么增长或下滑？ | PPT |
| Competitor Monitoring | 竞品最近发生了哪些值得关注的变化？ | Dashboard |

## Add a recipe

复制 [`_template/`](_template/)，使用小写连字符命名目录，并保持 `status: draft`。只有真实运行结果和交付物齐备后才能改为 `verified`。

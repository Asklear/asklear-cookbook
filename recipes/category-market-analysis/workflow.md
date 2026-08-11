# Category Market Analysis

Asklear capability and query rules: https://dashboard.asklear.cn/docs/agent

## Outcome

交付一份说明类目规模、趋势、竞争格局、机会和限制的市场分析 PPT。

## Workflow

1. 确认数据集、类目、时间范围和重点问题。
2. 对齐用户提供的类目名称，保存服务端实际解析范围。
3. 查询市场规模、销量和月度趋势。
4. 查询品牌排名、份额和主要变化，必要时补充价格带或商品分析。
5. 区分 Asklear 返回指标、代码计算结果和 Agent 判断。
6. 生成 PPT，并附数据来源、时间、口径和限制。

## Failure behavior

- 类目无法可靠对齐时，先让用户确认，不猜测。
- 数据缺失或查询部分失败时，在 PPT 中明确标记。
- 不使用模型常识补造市场数据或来源。

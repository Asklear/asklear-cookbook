# Recipe title

Asklear capability and query rules: https://dashboard.asklear.cn/docs/agent/llms.txt

## Outcome

说明最终需要交付的商业研究结果。

## Workflow

1. 明确研究对象、时间范围和缺失输入。
2. 按当前 Agent Docs 和 MCP instructions 获取数据。
3. 完成必要计算，区分服务指标、计算结果和分析判断。
4. 保存来源、时间、范围和限制。
5. 生成约定的 PPT、PDF 或 Dashboard。

## Failure behavior

- 数据缺失时保留缺失状态，不用模型常识补造。
- 部分步骤失败时报告已完成范围和失败原因。
- 权限、费用或合规条件不满足时停止相关步骤。

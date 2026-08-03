# Asklear Cookbook 维护规则

本仓库用于交付可运行的商业研究 Recipe。目标不是展示 API 或搭建 Demo App，而是生成可以用于决策的 PPT、PDF 或 Dashboard。

## 原则

1. **一个 Recipe 解决一个业务问题。** 按用户要完成的判断命名，不按 API、工具或数据源命名。
2. **保持最小完整。** Recipe 只包含输入、研究流程、实现和真实交付物；不要提前增加公共框架。
3. **Agent Docs 是能力事实来源。** 工具、字段、口径、计费和错误恢复只链接 Agent Docs，不在这里复制。
4. **结果必须可复现、可追溯。** 写清输入和运行方式；区分服务指标、代码计算和 Agent 判断，并保留来源、时间、范围和限制。
5. **诚实处理失败。** 缺失数据不得用模型常识补造，部分失败不得报告为完整成功。
6. **先重复，再抽象。** 相同代码被至少两个 Recipe 实际使用后，才考虑提取公共目录。

## Recipe 结构

```text
recipes/<recipe-id>/
├── README.md
├── SKILL.md
├── recipe.yaml
├── src/
└── example/
```

- `README.md`：业务问题、结果预览、可复制给 Agent 的使用指令和限制；
- `SKILL.md`：Agent 的高层研究步骤；
- `recipe.yaml`：名称、状态、数据依赖和产出类型；
- `src/`：最小可运行实现；
- `example/`：真实或明确脱敏的输入、结果和交付物。

## 完成标准

Recipe 只有满足以下条件才能从 `draft` 改为 `verified`：

- 可以按 README 从头运行；
- 用户可以替换研究对象；
- README 中的 Agent 指令可以直接使用；
- 示例来自一次真实运行；
- 关键结论具有证据；
- PPT、PDF 或 Dashboard 可以直接查看；
- 仓库中没有密钥、用户数据或无权公开的数据。

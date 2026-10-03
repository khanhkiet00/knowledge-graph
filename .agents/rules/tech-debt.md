# Technical Debt Management Rules

Before implementing any new feature or architectural modification:

1. **Inspect Technical Debt Directory:** Inspect `docs/technical-debt/`.
2. **Identify Relevant Debt:** Check if any technical debt items apply to the target component or feature.
3. **Read Details:** Review `Status`, `Activation Conditions`, `Required Work`, and `Success Criteria`.
4. **Preserve Deferred Status:** NEVER automatically activate or implement technical debt items currently marked as `deferred`.
5. **Request Approval for Activation:** If a `deferred` technical debt item must be activated to fulfill a user request, ask the user for explicit approval first.
6. **No Paid/Billable Services:** NEVER introduce paid APIs/services, change AI providers, or add potentially billable infrastructure without explicit user confirmation.
7. **Execution Compliance:** When a technical debt item is explicitly activated by the user, strictly follow the `Required Work` outlined in its documentation.
8. **Resolution Criteria:** Do NOT mark a technical debt item as `resolved` until ALL `Success Criteria` are verified and tested.

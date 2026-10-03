# Code Style, Language & Scope Control

## Naming & Language Conventions
- **Code Artifacts (English):** Variable names, function names, class names, file names, module names, and comments MUST be written in standard English (e.g., `fetch_trending`, `neo4j_sync`).
- **User-Facing & Logs (Vietnamese):** Console logs, system print outputs, user-facing error messages, and UI text MUST be written in Vietnamese for clear operation monitoring (e.g., `"Đang đồng bộ dữ liệu vào Neo4j..."`).

## Scope Control & Minimization
- **No Unrelated Modifications:** Do not edit files unrelated to the explicit task.
- **No Unrelated Refactoring:** Avoid opportunistic refactoring of working code outside the task scope.
- **No File Renaming/Moving:** Do not rename or move files unless explicitly required by the task or plan.
- **Minimal Dependencies:** Avoid adding new third-party dependencies or complex architecture layers unless necessary.

## Definition of Done (DoD)
A task is considered COMPLETE only when:
1. Requested functionality or behavior is fully implemented.
2. Appropriate automated tests are written or updated.
3. Tests and validation checks are executed and pass.
4. Security, naming, and technical debt rules are satisfied.
5. No collateral changes were introduced.
6. Final git diff is reviewed.

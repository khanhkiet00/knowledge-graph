# Testing Standards & Regulations

## Automated Tests Required
Any code change that alters executable behavior must be accompanied by appropriate automated tests.
Documentation-only changes do not require tests unless executable behavior is affected.

## Framework & Naming
- For Python components (Backend / Data Pipeline in `get-data/`), use the built-in `unittest` framework.
- Test filenames MUST start with `test_` (e.g., `test_github_trending.py`).

## Test Execution & Reporting
- Tests must be executed and validated, not merely written.
- Final completion reports must include the exact test execution commands and their output results.

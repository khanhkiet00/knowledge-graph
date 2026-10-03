# Security & Environment Configuration

## Environment Variables
All environment configurations (Database URIs, ports, credentials, API keys) MUST be managed via `.env` files.

## Secrets Protection
- Real credentials, passwords, or secrets MUST NEVER be hardcoded into source code, test files, or documentation.
- Real `.env` files MUST NEVER be committed to Git.
- When adding or updating environment variables, always update `.env.example` with safe placeholder values.
- Never expose passwords, tokens, or private credentials in output logs, error messages, or documentation.

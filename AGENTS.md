# AI Agent Instructions

## Project Overview

`knowledge-graph` automatically scrapes GitHub Trending repositories, transforms metadata into a Knowledge Graph stored in Neo4j, and visualizes pipeline workflows on a Web Dashboard.

- **Data Pipeline:** `get-data/` (Python, BeautifulSoup4, Neo4j Bolt driver)
- **Database:** Neo4j Graph DB (`docker-compose.yml`, ports 7474, 7687)
- **Dashboard:** `dashboard/` (React + Vite + TypeScript)
- **Agent System:** `.agents/` (Architecture, rules, registry, skills)

## Non-Negotiable Core Rules

1. **Testing:** Logic changes require Python `unittest` (`test_*.py`). Tests must be executed and reported. Details: [`.agents/rules/testing.md`](.agents/rules/testing.md).
2. **Security:** Use `.env` for secrets. Never hardcode credentials or commit `.env`. Details: [`.agents/rules/security.md`](.agents/rules/security.md).
3. **Language:** English for variable/function/class names; Vietnamese for console logs, user errors, and UI text. Details: [`.agents/rules/code-style.md`](.agents/rules/code-style.md).
4. **Architecture & Tech Debt:** Read [`.agents/ARCHITECTURE.md`](.agents/ARCHITECTURE.md) before changing graph schema. Inspect [`docs/technical-debt/`](docs/technical-debt/) before architecture changes. Details: [`.agents/rules/tech-debt.md`](.agents/rules/tech-debt.md).

## Workflow

- **Small Tasks (typo, simple UI edit):** `Implement → Test → Report`
- **Standard / Complex Tasks:** `Plan → Implement → Test → Report`

## Key References

- **Rules Directory:** [`.agents/rules/`](.agents/rules/)
- **System Architecture:** [`.agents/ARCHITECTURE.md`](.agents/ARCHITECTURE.md)
- **Agent Registry:** [`.agents/registry/README.md`](.agents/registry/README.md)
- **Skills Directory:** [`.agents/skills/`](.agents/skills/)
- **Technical Debt Registry:** [`docs/technical-debt/`](docs/technical-debt/)

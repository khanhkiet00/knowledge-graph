# Agent Registry & Catalog

This registry catalogs all registered agents operating within the `knowledge-graph` workspace, specifying their roles, responsibilities, locations, inputs, outputs, capabilities, and associated skills.

## Distinction Between Agents and Skills

- **Agent:** Responsible for performing a specific class of work in a dedicated scope of the system (e.g., Data Ingestion, UI Management).
- **Skill:** Modular, reusable set of instructions, guidelines, or domain specifications used by an Agent to execute specialized tasks.

## Registered Agents

### 1. Data Pipeline Agent

- **Location:** [`get-data/`](../../get-data/)
- **Primary Role:** Backend Data Acquisition & Neo4j Graph Synchronization
- **Responsibilities:**
  - Scraping repository metadata and trending lists from GitHub HTML pages (`github_trending.py`).
  - Parsing, cleaning, and transforming raw HTML/metadata into structured entities.
  - Cypher query execution and Neo4j database synchronization (`neo4j_sync.py`).
  - Maintaining automated test coverage for backend data logic (`test_github_trending.py`).
- **Inputs:**
  - Target trending period parameter (`daily`, `weekly`, `monthly`).
  - External GitHub pages & HTML structure.
- **Outputs:**
  - Structured repository dictionary lists.
  - Graph Nodes (`Repository`, `Language`, `TrendingPeriod`) and Relationships (`WRITTEN_IN`, `TRENDING_IN`) in Neo4j.
- **Capabilities:**
  - Web scraping with `BeautifulSoup4` and `requests`.
  - Transactional graph database updates via official `neo4j` Python driver (Bolt protocol).
  - Test validation with Python `unittest`.
- **Associated Skills:**
  - [`repo_analyzer`](../skills/repo_analyzer/SKILL.md) (used when extracting deep structured knowledge from repository READMEs).

### 2. Dashboard UI Agent

- **Location:** [`dashboard/`](../../dashboard/)
- **Primary Role:** Frontend Web Application & Graph Interaction Interface
- **Responsibilities:**
  - Providing an interactive web interface for visualizing data pipeline workflows and Neo4j graph nodes (`App.jsx`).
  - Interactive canvas rendering (`Workflow Canvas`).
  - Inspecting node attributes, parameters, and Cypher queries (`Node Inspector`).
  - Providing responsive, accessible UI layouts and styling (`index.css`).
- **Inputs:**
  - User interactions (node selection, parameter inputs, workflow triggers).
  - Graph state and node metadata from Neo4j / backend APIs.
- **Outputs:**
  - Rendered React UI components and interactive canvas.
  - User configuration updates and query triggers.
- **Capabilities:**
  - React + Vite SPA development.
  - Visual canvas manipulation and state management.
  - Modern component styling and micro-animations.
- **Associated Skills:**
  - [`frontend_design`](../skills/frontend_design/SKILL.md) (mandatory UI design system and guidelines).

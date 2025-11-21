# Python Guide
- **Stack defaults:** Python 3.11+, venv/uv/poetry; type hints required; prefer FastAPI for services.

## Setup
- Use `python -m venv .venv` (or `uv venv`) and activate; pin deps in `pyproject.toml` + lockfile (`poetry.lock` or `uv.lock`).
- Run `pip install -e .` for editable local packages; avoid `pip install -r` without hashes.

## Style & Lint
- Enforce `ruff` + `black` + `isort`; command: `ruff check . && black . && isort .`.
- Require type checking: `pyright` or `mypy --strict`; no `type: ignore` without justification.

## Testing
- Use `pytest`; structure tests mirroring src; command: `pytest -q`.
- Prefer pure functions; mock IO; cover edge/error paths; use `freezegun` for time.

## Security
- Input validation with `pydantic`; never string-concat SQL; use parameterized queries/ORM.
- Secrets via env/secret manager; forbid hardcoded creds; sanitize logs; use `bandit -r .`.
- Keep dependencies patched: `pip-audit` or `uv pip audit`.

## Performance
- Avoid N+1 DB calls; use batching/prefetch; prefer generators over lists for streams.
- Set timeouts/retries with jitter on network calls; cap concurrency with semaphores.

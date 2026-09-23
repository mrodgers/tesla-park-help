# Publish / Pages checklist (Matt)

**Status (2026-09-23 PT):** Repo `mrodgers/tesla-park-help` is public; GitHub Pages is enabled from `main` / root.

**Live URL:** https://mrodgers.github.io/tesla-park-help/

If Pages ever needs re-enable:

```bash
cd /workspace/tesla-park-help
gh api repos/mrodgers/tesla-park-help/pages -X POST \
  -f "build_type=legacy" \
  -f "source[branch]=main" \
  -f "source[path]=/"
```

Or: GitHub → Settings → Pages → Deploy from branch → `main` / `/ (root)`.

Do not add secrets to this repo.

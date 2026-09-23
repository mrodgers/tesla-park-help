# Publish / Pages checklist (Matt)

If `gh repo create` or Pages setup failed during agent onboarding, run from this directory:

```bash
cd /workspace/tesla-park-help   # or your clone
git init -b main
git add index.html README.md PUBLISH.md
git commit -m "Add public Tesla Park helper FAQ one-pager"
gh repo create mrodgers/tesla-park-help --public --source=. --remote=origin --push
gh api repos/mrodgers/tesla-park-help/pages -X POST \
  -f "build_type=legacy" \
  -f "source[branch]=main" \
  -f "source[path]=/"
```

Alternate Pages UI: GitHub → repo Settings → Pages → Deploy from branch → `main` / `/ (root)`.

Expected URL: **https://mrodgers.github.io/tesla-park-help/**

Verify with a private browser window. Do not add secrets to this repo.


Deno.copyFileSync(
  '.github/hooks/pre-commit',
  '.git/hooks/pre-commit',
)

Deno.chmodSync('.git/hooks/pre-commit', 0o755)

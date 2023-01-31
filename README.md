# fresh project

### Usage

Start the project:

```bash
deno task dev
```

This will watch the project directory and restart as necessary.

### Testing

```bash
PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@16.2.0/install.ts
deno task test
```

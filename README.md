# cfx-resolve

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

### Usage Example

```typescript
import { resolveCfxReIp } from "./src/index";

const url = "cfx.re/join/mockServer";
resolveCfxReIp(url)
  .then((ip) => {
    console.log(ip); // Output: "127.0.0.1:30120"
  })
  .catch((error) => {
    console.error(error);
  });
```

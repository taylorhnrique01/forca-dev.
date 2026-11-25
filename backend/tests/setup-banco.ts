
import { execSync } from 'node:child_process';

export default function setup() {
  execSync('.\\node_modules\\.bin\\prisma.cmd db push --skip-generate', {
    env: {
      ...process.env,
      DATABASE_URL: 'file:./test.db'
    },
    stdio: 'inherit'
  });
}

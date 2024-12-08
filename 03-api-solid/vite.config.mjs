import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import prismaTestEnvironment from './prisma/vitest-environment-prisma/prisma-test-environment'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: prismaTestEnvironment,
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})

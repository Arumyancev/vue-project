import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),

      // Красивый вывод в терминале
      reporter: 'verbose',

      // Покрытие кода (запуск: npm run test:unit -- --coverage)
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.ts', 'src/**/*.vue'],
        exclude: ['src/main.ts', 'src/**/*.d.ts'],
      },
    },
  }),
)

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
        reporters: ['json'],
        outputFile: '.agent/scratchpad/test-results.json',
        watch: false,
    },
});

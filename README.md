# AI Native Practice

Frontend-focused React and TypeScript study project for learning AI-native product patterns without a backend.

## First Experiment

AI Task Planner:

1. User writes a natural-language planning request.
2. Mock AI returns structured task suggestions.
3. The UI renders suggestions as editable cards.
4. User approves selected cards.
5. Approved cards become app state.
6. User can undo or regenerate.

## Why No Backend First?

The first goal is to practice AI-native frontend UX:

- intent input
- streaming-like progress
- structured output
- preview before apply
- human approval
- undo and regeneration

Real LLM API calls can be added later with a serverless function so API keys are not exposed in the browser.

## Run

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Then open the local URL printed by Vite.

## Verify

```bash
npm run build
```

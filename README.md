# String Calculator

A React-based string calculator application that implements the String Calculator kata. This project demonstrates TDD (Test-Driven Development) practices with comprehensive test coverage.

## Features

- Add numbers from a string input
- Support for custom delimiters
- Handle negative numbers with proper error messages
- Support for newline delimiters
- Modern React with TypeScript
- Comprehensive test suite

## Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pixelftw/string-calculator.git
cd string-calculator
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

## Running the Project

### Development Mode

```bash
pnpm dev
# or
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## Testing

### Run All Tests

```bash
pnpm test
# or
npm test
```

## Test Cases by File

### 1. `src/utils/string-calculator.test.ts`

Tests the core string calculator logic:

- **Empty string input**: Should return 0
- **Single number**: Should return the number itself
- **Two numbers with comma delimiter**: Should return their sum
- **Multiple numbers with comma delimiter**: Should return the sum of all numbers
- **Numbers with newline delimiter**: Should handle newlines as delimiters
- **Custom delimiter**: Should support custom delimiters starting with "//"
- **Negative numbers**: Should throw error with list of negative numbers
- **Mixed delimiters**: Should handle both custom and default delimiters

### 2. `src/hooks/useStringCalculator.test.ts`

Tests the React hook functionality:

- **Initialization**: Should initialize with empty input and null result/error
- **Successful calculation**: Should calculate result and clear any previous errors
- **Error handling**: Should capture and display error messages for negative numbers
- **Input changes**: Should clear previous results and errors when input changes

## Project Structure

```
src/
├── utils/
│   ├── string-calculator.ts          # Core calculator logic
│   └── string-calculator.test.ts     # Calculator unit tests
├── hooks/
│   ├── useStringCalculator.ts        # React hook for calculator
│   └── useStringCalculator.test.ts   # Hook unit tests
├── components/
│   ├── StringCalculator.tsx          # String Calculator Component
    └── StringCalculator.test.tsx     # StringCalculator unit teset
├── App.tsx                           # Main application component
└── main.tsx                         # Application entry point
```

## Core Functions

### `add(stringValue: string): number`

The main calculator function that:

- Returns 0 for empty strings
- Handles single numbers
- Supports custom delimiters (format: `//delimiter\nnumbers`)
- Throws errors for negative numbers
- Uses comma and newline as default delimiters

### `useStringCalculator(initialValue: string)`

A React hook that provides:

- Input state management
- Result calculation
- Error handling
- Input change handlers

## Error Handling

The calculator throws descriptive errors for:

- Negative numbers: "negative numbers not allowed -1,-2"
- Invalid input formats

## Development

### Linting

```bash
pnpm lint
# or
npm run lint
```

### Type Checking

```bash
pnpm build
# or
npm run build
```

## Technologies Used

- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing utilities
- **Tailwind CSS** - Utility-first CSS framework

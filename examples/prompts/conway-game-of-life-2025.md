# Orchestrator Prompt: Conway's Game of Life (2025 Edition)

## Prompt for @orchestrator

```
@orchestrator Build a modern, futuristic Conway's Game of Life implementation in JavaScript following 2025 game development standards.

## Requirements

### Core Functionality
- Classic Conway's Game of Life rules (birth, survival, death)
- Interactive grid with click-to-toggle cells
- Play/pause/step controls
- Speed control (generation rate)
- Clear/reset functionality
- Grid size configuration (minimum 20x20, scalable)

### 2025 Game Development Standards
- **Web Components / Custom Elements** - Use modern component architecture
- **Canvas API with OffscreenCanvas** - For high-performance rendering
- **Web Workers** - Offload game logic computation to prevent UI blocking
- **WebAssembly (optional)** - For extreme performance if needed
- **Progressive Web App (PWA)** - Installable, offline-capable
- **WebGL/WebGPU** - For advanced visual effects (particle systems, shaders)
- **Modern JavaScript (ES2024+)** - Async/await, optional chaining, nullish coalescing
- **TypeScript** - Type safety and better DX
- **Vite/Bun** - Modern build tooling
- **Vitest** - Modern testing framework
- **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Responsive Design** - Mobile-first, touch-friendly controls
- **Performance** - 60 FPS rendering, efficient algorithms (sparse grid representation)

### Visual Design (Futuristic)
- **Neon/cyberpunk aesthetic** - Glowing cells, dark theme
- **Particle effects** - Cells emit particles on birth/death
- **Smooth animations** - Interpolated transitions between states
- **Color gradients** - Age-based cell coloring (newer cells brighter)
- **Grid visualization** - Optional grid lines with glow effect
- **Pattern library** - Pre-built famous patterns (glider, pulsar, etc.)
- **Pattern editor** - Draw/create custom patterns
- **Statistics overlay** - Generation count, population, growth rate

### Architecture Requirements
- **Clean Architecture** - Separate domain (game logic), application (use cases), infrastructure (rendering), interface (UI)
- **Hexagonal Architecture** - Ports/adapters for rendering, storage, input
- **DDD** - Bounded contexts: GameEngine, Rendering, UI, Patterns
- **SOLID principles** - Single responsibility, dependency injection
- **Testable** - Pure game logic, mockable rendering/input

### TypeScript Import Rules (MANDATORY - NON-NEGOTIABLE)
- **PATH ALIASES REQUIRED** - Deep relative imports (`../../` or deeper) are **FORBIDDEN**
- **MANDATORY:** Configure `tsconfig.json` with path aliases:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@gameoflife/domain/*": ["GameOfLifeContext/Domain/*"],
        "@gameoflife/app/*": ["GameOfLifeContext/Application/*"],
        "@gameoflife/infra/*": ["GameOfLifeContext/Infrastructure/*"],
        "@gameoflife/interface/*": ["GameOfLifeContext/Interface/*"]
      }
    }
  }
  ```
- **MANDATORY:** ESLint must enforce path aliases and forbid deep relative imports:
  ```json
  {
    "rules": {
      "no-restricted-imports": ["error", {
        "patterns": [{
          "group": ["../../*", "../../../*"],
          "message": "Deep relative imports FORBIDDEN. Use path aliases (@gameoflife/layer/*)."
        }]
      }]
    }
  }
  ```
- **FORBIDDEN:** 
  - ❌ `import { Pattern } from '../../Domain/Entities/Pattern.js'`
  - ❌ `import { Pattern } from '../../../Domain/Entities/Pattern.js'`
- **REQUIRED:**
  - ✅ `import { Pattern } from '@gameoflife/domain/Entities/Pattern.js'`
  - ✅ `import type { PatternRepositoryPort } from '@gameoflife/app/Ports/PatternRepositoryPort.js'`
- **REJECTION CRITERIA:** Any code using deep relative imports (`../../` or deeper) must be **REJECTED** and fixed before acceptance
- **Domain/Application MUST be framework-free:**
  - Domain layer MUST NOT import from Infrastructure or Interface aliases (e.g., `@gameoflife/infra/*`, `@gameoflife/interface/*`)
  - Application layer MUST NOT import from Infrastructure or Interface aliases
  - Use ports/adapters pattern: define interfaces in Domain/Application, implement in Infrastructure/Interface

### Technical Stack
- **Language**: TypeScript (compiled to ES2024+)
- **Build Tool**: Vite or Bun
- **Testing**: Vitest with coverage ≥80%
- **Linting**: ESLint with TypeScript rules + path alias enforcement
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions with automated tests

### TypeScript Configuration (MANDATORY)
- **tsconfig.json MUST include:**
  - `baseUrl: "."`
  - `paths` configuration for all bounded contexts
  - `strict: true`, `noImplicitAny: true`, `noUncheckedIndexedAccess: true`
- **ESLint configuration MUST include:**
  - `no-restricted-imports` rule to forbid deep relative imports
  - Path alias validation
- **Build tools MUST resolve path aliases:**
  - Vite: Configure `resolve.alias` in `vite.config.ts`
  - Vitest: Configure `resolve.alias` in `vitest.config.ts`
  - TypeScript compiler: Uses `tsconfig.json` paths automatically

### Deliverables
1. **Architecture Design** - Component diagram, bounded contexts, trust tiers
2. **API Design** - If exposing game engine as API (optional)
3. **Security Review** - Input validation, XSS prevention, CSP headers
4. **Test Suite** - Unit tests for game logic, integration tests for rendering
5. **Performance Optimization** - Profile and optimize hot paths
6. **Code Review** - Ensure compliance with standards
7. **CI/CD Pipeline** - Automated testing and deployment

### Success Criteria
- Game runs at 60 FPS with 100x100 grid
- All game logic is pure and testable
- Accessibility score ≥90 (Lighthouse)
- Performance score ≥90 (Lighthouse)
- Test coverage ≥80% for game logic
- Zero security vulnerabilities
- Clean, maintainable code following architecture rules
- **ZERO deep relative imports** (`../../` or deeper) - all imports use path aliases
- **tsconfig.json** properly configured with path aliases
- **ESLint** enforces path alias usage and rejects deep relative imports
- **Domain/Application layers** are framework-free (no Infrastructure/Interface imports)

### Optional Enhancements
- **3D Visualization** - WebGL/Three.js 3D grid
- **Multiplayer** - WebSocket-based collaborative editing
- **Pattern Sharing** - Export/import patterns as JSON
- **History/Undo** - Step back through generations
- **Rule Variations** - Custom birth/survival rules (Life-like cellular automata)
- **GPU Acceleration** - WebGPU compute shaders for massive grids

### Code Review Checklist (MANDATORY)
Before accepting any code, verify:
- [ ] **NO deep relative imports** (`../../` or deeper) - all imports use path aliases
- [ ] **tsconfig.json** has `baseUrl` and `paths` configured
- [ ] **ESLint** has `no-restricted-imports` rule to forbid deep relative imports
- [ ] **Domain layer** does NOT import from `@gameoflife/infra/*` or `@gameoflife/interface/*`
- [ ] **Application layer** does NOT import from `@gameoflife/infra/*` or `@gameoflife/interface/*`
- [ ] All imports follow pattern: `@gameoflife/layer/Path/To/File.js`
- [ ] Build tools (Vite/Vitest) resolve path aliases correctly

**If any of these checks fail, the code MUST be REJECTED and fixed before acceptance.**

Execute the full workflow: @architect → @api-designer → @security-auditor → @test-engineer → @perf-optimizer → @code-reviewer → @supervisor
```

## Expected Workflow

1. **@architect** - Design Clean Architecture with GameEngine, Rendering, UI contexts
2. **@api-designer** - Design game engine API (if exposing as library)
3. **@security-auditor** - Review for XSS, input validation, CSP
4. **@test-engineer** - Create comprehensive test suite
5. **@perf-optimizer** - Optimize rendering and computation
6. **@code-reviewer** - Final quality check
7. **@supervisor** - Validate all outputs meet requirements

## Usage

Copy the prompt above and use it with the orchestrator agent in your AI coding assistant (Cursor, Aider, etc.).

Example:
```
@orchestrator [paste the prompt above]
```


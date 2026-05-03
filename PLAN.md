# OPH Interactive Learning App -- Implementation Plan

## Overview

An interactive learning platform for **Observer Patch Holography (OPH)**, modeled after the STARK Lab architecture. The app guides users from accessible philosophical concepts through two clear derivation chains:

1. **Axioms → General Relativity** (classical physics, gravity, spacetime)
2. **Axioms → Quantum Field Theory** (quantum mechanics, gauge symmetry, Standard Model)

Every step in each chain has an interactive demo, so the user can see the full path from 4 axioms to all of known physics.

**URL:** `floatingpragma.io/oph/`
**Repo:** `oph-lab` (new repo, independent like other sub-projects)
**Stack:** React 19 + Vite 7 + TypeScript (matching STARK Lab)

---

## 1. The Two Derivation Chains

The app is structured around two chains that branch from a shared foundation. This is the conceptual backbone -- every page and demo maps to a node in one of these chains.

### Chain 1: Axioms → General Relativity (Classical Physics)

```
A1 (Screen on S²)
  + A3 (Area Bound / Generalized Entropy)
    → Bekenstein-Hawking entropy: S = A/(4l_P²)          [DEMO: Area-Entropy Explorer]
    → Holographic principle: info on boundary, not volume
      + A4 (Local Markov / Recovery)
        → Entanglement creates geometry (RT formula)      [DEMO: Entanglement → Geometry]
        → Modular flow on caps = geometric time            [DEMO: Modular Flow Animator]
          + B (MaxEnt state selection)
            → Entanglement equilibrium: δS_gen = 0
              → Jacobson mechanism: δQ = TdS              [DEMO: Gravity from Entropy]
                → Einstein equations: G_ab + Λg_ab = 8πG T_ab
                  → Newton's gravity, orbits, geodesics
  + Conf⁺(S²) = PSL(2,ℂ) = SO⁺(3,1)
    → Lorentz invariance (special relativity)              [DEMO: Möbius/Lorentz]
    → 3+1 dimensional spacetime from 2D screen

  + Screen capacity: log(dim H) ~ 10¹²²
    → Λ = 3π/(G·log dim H)                               [DEMO: Cosmological Constant]
    → de Sitter horizon, accelerating expansion
    → Dark matter from Markov defect                      [DEMO: Galaxy Rotation Curves]
```

### Chain 2: Axioms → Quantum Field Theory (Particles & Forces)

```
A1 (Screen on S²)
  + A2 (Overlap Consistency)
    → No God's-eye view; reality = intersubjective agreement
    → Quantum mechanics as consistency constraint           [DEMO: Wigner's Friend]
      → Born rule from uniqueness of consistent probabilities
      → "Collapse" = belief updating, not physical event
      → Bell inequality violation as MAXIMAL consistency    [DEMO: Bell Experiment]
    → Gauge symmetry = overlap gluing redundancy            [DEMO: Gauge-as-Gluing]
      + D (Gauge-as-gluing) + Tannaka-Krein reconstruction
        → Compact gauge groups from edge-sector fusion
        → Massless gauge bosons (symmetry-protected zeros)
          + E (Central defect) + S1-S3 (Selectors)
            → SU(3)×SU(2)×U(1)/Z₆                         [DEMO: Heat-Kernel Edge Sectors]
            → Anomaly cancellation fixes hypercharges
            → N_c = 3, N_g = 3 from minimality + CP
              → matter continuations / deferred public demo
              → Higgs mass from criticality: 125.08 GeV
              → MSSM-like β-shifts without superpartners    [DEMO: Running Couplings]

  + Testable predictions
    → GW horizon spectroscopy comb                         [DEMO: Hawking Spectrum]
    → Discrete area eigenvalues
    → Precision numerics (v, m_H, α_s, sin²θ_W, ...)
```

---

## 2. Architecture (Mirroring STARK Lab)

```
oph-lab/
  src/
    main.tsx                        # React 19 createRoot
    App.tsx                         # BrowserRouter + Routes + OPHProvider
    index.css                       # Global CSS (shared design tokens)

    routes/
      walkthrough.ts                # Linear step definitions (single source of truth)

    contexts/
      OPHContext.tsx                 # Global state: active demo params, user progress

    core/                           # Pure TypeScript -- no React deps
      entropy.ts                    # Shannon/von Neumann entropy, Bekenstein bound
      information.ts                # Mutual information, CMI, Markov chains, Bell correlations
      holographic.ts                # RT formula, area-entropy, tensor network toy model
      modular-flow.ts               # Modular automorphisms, BW theorem, KMS, Unruh
      gravity.ts                    # Jacobson derivation numerics, entanglement equilibrium
      gauge.ts                      # Edge-sector probabilities, heat kernel, RGE
      matterContinuations.ts        # placeholder surface for deferred public matter branches
      cosmology.ts                  # Lambda, MOND scale, rotation curves, GW comb

    components/
      Layout.tsx + Layout.css       # Sidebar + Outlet (same pattern as STARK Lab)
      WalkthroughNav.tsx            # Prev/Next navigation
      Explainer.tsx                 # Collapsible "learn more" cards
      MathBlock.tsx                 # Equation display (KaTeX or custom)
      InteractiveCanvas.tsx         # Reusable SVG wrapper for demos
      PatchSphere.tsx               # S² with draggable patches (reused across pages)
      DerivationChain.tsx           # Interactive chain diagram (reused on multiple pages)
      ComparisonTable.tsx           # Old vs New paradigm flipper

    pages/
      # (see Section 3 for full breakdown)
```

### Key Architectural Decisions

1. **Single OPHContext** for shared state (demo parameters, selected detail level)
2. **Pure TS core logic** in `core/` -- all math separated from UI
3. **Linear walkthrough array** as single source of truth for navigation
4. **Explainer pattern** for progressive disclosure (main content visible, math behind click)
5. **Inline styles + CSS variables** (matching STARK Lab approach)
6. **No external state management** -- React context + useState + useMemo
7. **Vite `base: '/oph/'`** for GitHub Pages sub-path
8. **DerivationChain component** reused on multiple pages, highlighting "you are here"

---

## 3. Learning Path (24 Steps)

### Part I: Foundation (5 pages) -- No Math Required

| # | Route | Title | Interactive Element |
|---|-------|-------|-------------------|
| 0 | `/` | Introduction | Animated derivation chain showing both paths |
| 1 | `/hints` | Five Hints That Broke Physics | Card-flip reveal: intuition vs experimental reality |
| 2 | `/no-objective-reality` | No Objective Reality | Hidden Assumption Revealer: 10 physics problems, flip cards |
| 3 | `/the-screen` | The Holographic Screen | **DEMO: Patch Sphere** -- draw patches on S², see overlaps |
| 4 | `/axioms` | Core Axioms + MAR | Axiom cards with 3 detail levels (plain / physics / formal) |

### Part II: Chain 1 -- Road to General Relativity (8 pages)

| # | Route | Title | Interactive Element | Chain Node |
|---|-------|-------|-------------------|------------|
| 5 | `/entropy` | Entropy & the Area Bound | **DEMO: Entropy Calculator** -- drag probability bars, see H. Then: **Area-Entropy Explorer** -- adjust region size, see S = A/(4l_P²), compare area vs volume scaling | A3 → Bekenstein-Hawking |
| 6 | `/entanglement-geometry` | Entanglement Creates Geometry | **DEMO: RT Toy Model** -- adjust entanglement between boundary regions, watch "depth" of bulk change. Cut bonds → geodesic moves | A4 → RT formula → 3D from 2D |
| 7 | `/lorentz` | Lorentz from the Screen | **DEMO: Möbius/Lorentz** -- drag on sphere to apply conformal transforms, see corresponding Lorentz boost in spacetime diagram | Conf⁺(S²) = SO⁺(3,1) |
| 8 | `/modular-flow` | Time from Modular Flow | **DEMO: Modular Flow Animator** -- animated flow on a cap, slider for acceleration → Unruh temperature. Shows time = modular automorphism | BW theorem → thermal time |
| 9 | `/gravity` | Gravity from Entanglement | **DEMO: Jacobson Mechanism** -- perturb entanglement on null surface, compute δS, see Einstein equations emerge as equilibrium condition. Adjustable perturbation → watch G_ab respond | MaxEnt → δS=0 → Einstein |
| 10 | `/de-sitter` | The de Sitter Universe | **DEMO: Lambda Calculator** -- screen capacity slider → Λ → horizon size. Shows why vacuum energy is null-invisible | Screen capacity → Λ |
| 11 | `/dark-matter` | Dark Matter Without Particles | **DEMO: Galaxy Rotation Curves** -- sliders for mass and a₀, toggle Newtonian / CDM / OPH-MOND. Flat curves from Markov defect | Markov defect → MOND |
| 12 | `/classical-physics` | Classical Physics Emerges | **DEMO: Derivation Chain Explorer** -- click any node in Chain 1 to review its derivation. Shows Newton's laws, geodesics, thermodynamics all falling out | Synthesis for Chain 1 |

### Part III: Chain 2 -- Road to Quantum Field Theory (8 pages)

| # | Route | Title | Interactive Element | Chain Node |
|---|-------|-------|-------------------|------------|
| 13 | `/quantum-mechanics` | QM from Overlap Consistency | **DEMO: Wigner's Friend** -- two observer patches with a qubit in the overlap. Each patch has consistent description; no God's-eye view needed. Shows "collapse" = belief updating | A2 → Born rule |
| 14 | `/entanglement` | Bell's Theorem & Entanglement | **DEMO: Bell Experiment** -- set detector angles, accumulate statistics, watch S exceed 2. Shows quantum correlations as MAXIMAL consistent correlations | A2 → Bell / Tsirelson |
| 15 | `/error-correction` | Quantum Error Correction | **DEMO: QEC Visualizer** -- 3-bit repetition code: flip bits, see syndrome extraction and correction. Then: spacetime-as-code analogy | A4 → recovery → QEC |
| 16 | `/gauge-symmetry` | Gauge Symmetry from Gluing | **DEMO: Gauge-as-Gluing** -- drag overlapping patches, see frame rotations on overlaps forming gauge transformations. Loop holonomy as obstruction | D → gauge groups |
| 17 | `/standard-model` | The Standard Model | **DEMO: Heat-Kernel Edge Sectors** -- slider for diffusion parameter t, dropdown for group (Z₃, Z₅, SU(2), SU(3)). Watch p_R = d_R·exp(-t·C₂(R))/Z change | Edge fusion → SU(3)×SU(2)×U(1)/Z₆ |
| 18 | `/masses` | Matter Continuations | Public placeholder noting the withdrawn numerical mass pipeline | Deferred matter branches |
| 19 | `/unification` | Coupling Unification | **DEMO: Running Couplings** -- 1/α vs log E plot, toggle SM (don't meet) / MSSM (meet with sparticles) / OPH (meet with edge modes, no new particles) | Peter-Weyl → β-shifts |
| 20 | `/qft-emerges` | QFT Emerges | **DEMO: Derivation Chain Explorer** -- click any node in Chain 2. Shows how fields, Feynman diagrams, renormalization all emerge from the axioms | Synthesis for Chain 2 |

### Part IV: Predictions & Synthesis (2 pages)

| # | Route | Title | Interactive Element |
|---|-------|-------|-------------------|
| 21 | `/predictions` | Testable Predictions | **DEMO: GW Horizon Spectroscopy** -- BH mass slider → frequency comb. Ratio E₃/E₂ = ln(3)/ln(2) always. Plus precision numerics table |
| 22 | `/synthesis` | Two Parameters, All of Physics | **DEMO: Full Prediction Chain** -- interactive diagram of BOTH chains. Click any node for derivation + status (proven / conditional / open). Two input sliders: pixel area + screen capacity |

### Reference (2 pages)

| # | Route | Title |
|---|-------|-------|
| 23 | `/glossary` | Glossary (~50 searchable terms) |
| 24 | `/resources` | Further Reading & Links |

---

## 4. Interactive Demo Specifications (15 Demos)

### Tier 1: Critical Chain Demos (Build First -- These Close the Chains)

#### Demo 1: Patch Sphere (page `/the-screen`)
- **What:** SVG sphere (S²) with latitude/longitude grid
- **Interaction:** User draws/drags circular patches. Overlapping regions highlight.
- **Shows:** A1 (screen), A2 (overlap consistency). Panel shows "shared observables must agree."
- **Math:** `core/holographic.ts` -- patch area → information capacity A/(4l_P²)
- **Reused on:** `/gauge-symmetry` (with gauge transform overlays)

#### Demo 2: Area-Entropy Explorer (page `/entropy`)
- **What:** Adjustable region on a surface + entropy readout
- **Interaction:** Resize a region; entropy tracks boundary area, NOT volume. Side-by-side: area scaling vs volume scaling.
- **Shows:** A3 (Bekenstein-Hawking bound). Why holographic principle is surprising.
- **Math:** `core/entropy.ts` -- S = A/(4l_P²), compare to S_volume = V

#### Demo 3: RT Toy Model / Entanglement → Geometry (page `/entanglement-geometry`)
- **What:** 1D boundary (circle) with connected "bulk" interior. Boundary regions connected by entanglement bonds.
- **Interaction:** User adjusts entanglement strength between boundary pairs. Bulk "depth" (geodesic distance) changes accordingly. Cut bonds → see minimal surface move.
- **Shows:** RT formula. 3D emerges from 2D entanglement patterns. More entanglement = more space.
- **Math:** `core/holographic.ts` -- toy tensor network: entanglement entropy = minimal cut through network
- **Implementation:** SVG circle boundary + interior graph. Bond thickness = entanglement. Geodesic highlighted.

#### Demo 4: Jacobson Mechanism / Gravity from Entropy (page `/gravity`)
- **What:** A null surface (light sheet) with entanglement across it
- **Interaction:** User perturbs the matter/energy distribution near the surface. App computes: (1) entropy change δS, (2) heat flow δQ = T·δS, (3) resulting Einstein equation component. Slider: perturbation strength.
- **Shows:** Gravity = equation of state. Not a fundamental force but entanglement equilibrium.
- **Math:** `core/gravity.ts` -- Jacobson: δQ = (ℏa/2π)·δS → Raychaudhuri → G_ab + Λg_ab = 8πGT_ab
- **Implementation:** Animated null surface, matter flowing through it, real-time equation readout

#### Demo 5: Wigner's Friend / QM Emergence (page `/quantum-mechanics`)
- **What:** Two overlapping observer patches. A qubit (spin-½) sits in the overlap.
- **Interaction:** Observer A "measures" → gets a definite result. Observer B sees A+qubit as entangled. Toggle between A's view and B's view. Both are internally consistent.
- **Shows:** No collapse needed. "Measurement" = correlation between observer's records and system. Born rule as unique consistent probability assignment.
- **Math:** `core/information.ts` -- density matrices for each observer's reduced state
- **Key insight:** The "paradox" dissolves when you stop assuming a God's-eye view exists

#### Demo 6: Gauge-as-Gluing (page `/gauge-symmetry`)
- **What:** Reuse PatchSphere. Now patches have internal "frames" (colored arrows/vectors).
- **Interaction:** Drag patches to overlap. On overlaps, frames don't align → rotation needed. This rotation IS the gauge transformation. Make a loop of 3 patches → holonomy (net rotation) = curvature.
- **Shows:** Gauge symmetry is not a mystery input but geometric redundancy from patch gluing.
- **Math:** `core/gauge.ts` -- rotation matrices on overlaps, holonomy computation
- **Implementation:** SVG sphere with colored frame arrows on each patch

### Tier 2: Supporting Chain Demos (Build Second)

#### Demo 7: Bell Experiment Simulator (page `/entanglement`)
- **What:** Two detectors at adjustable angles measuring entangled pairs
- **Interaction:** Set angles, click "measure" to accumulate statistics. Watch S exceed classical bound.
- **Shows:** Quantum correlations = maximal consistent correlations (Tsirelson bound)
- **Math:** `core/information.ts` -- E(a,b) = -cos(a-b), CHSH S = 2√2

#### Demo 8: Möbius/Lorentz Visualizer (page `/lorentz`)
- **What:** Split view: left = Riemann sphere, right = spacetime diagram
- **Interaction:** Apply Möbius transformations on sphere → see corresponding Lorentz boost
- **Shows:** Conf⁺(S²) = PSL(2,ℂ) = SO⁺(3,1). Special relativity is a screen symmetry.
- **Math:** `core/modular-flow.ts` -- PSL(2,C) matrices, stereographic projection

#### Demo 9: Modular Flow Animator (page `/modular-flow`)
- **What:** Cap on S² with flow lines showing modular evolution
- **Interaction:** Slider for acceleration parameter → Unruh temperature readout. Animate flow cycling with period 2π.
- **Shows:** Time = modular automorphism. Temperature from acceleration.
- **Math:** `core/modular-flow.ts` -- T_U = ℏa/(2πck_B), BW: K_C = 2π·B_C

#### Demo 10: Galaxy Rotation Curves (page `/dark-matter`)
- **What:** Rotation velocity vs radius plot + galaxy visualization
- **Interaction:** Sliders for galaxy mass & a₀. Toggle Newtonian / CDM / OPH.
- **Shows:** Flat curves from Markov defect, not dark particles
- **Math:** `core/cosmology.ts` -- v⁴ = G·M·a₀, a₀ = (15/8π²)c²√(Λ/3)

#### Demo 11: Heat-Kernel Edge Sectors (page `/standard-model`)
- **What:** Bar chart of irrep probabilities p_R for a chosen gauge group
- **Interaction:** Slider for diffusion parameter t; dropdown for group (Z₃, Z₅, S₃, SU(2), SU(3))
- **Shows:** How the SM gauge group emerges from edge-sector fusion rules
- **Math:** `core/gauge.ts` -- p_R = d_R·exp(-t·C₂(R))/Z

#### Demo 12: Matter Continuations Placeholder (page `/masses`)
- **What:** Log-scale bar chart of SM fermion masses
- **Interaction:** Toggle "SM view" (arbitrary) vs "OPH view" (y_f = 6^{-n_f} pattern)
- **Shows:** Mass hierarchy from Z₆ topology, not fine-tuning
- **Math:** public numerical mass demo withdrawn pending rebuilt derivation chain

### Tier 3: Polish Demos (Build Last)

#### Demo 13: Running Couplings (page `/unification`)
- **What:** 1/α vs log E plot with three coupling lines
- **Interaction:** Toggle SM / MSSM / OPH. Lines converge only for MSSM and OPH.
- **Shows:** Unification without superpartners
- **Math:** `core/gauge.ts` -- 1-loop RGE, Δb values

#### Demo 14: GW Horizon Spectroscopy (page `/predictions`)
- **What:** Black hole emission frequency spectrum
- **Interaction:** BH mass slider. Toggle continuous thermal vs discrete comb.
- **Shows:** Testable prediction: frequency ratios x_k = ln(k)/(8π)
- **Math:** `core/cosmology.ts` -- Hawking temperature, comb frequencies

#### Demo 15: Full Prediction Chain (page `/synthesis`)
- **What:** Interactive diagram of BOTH derivation chains
- **Interaction:** Click any node → expansion showing derivation, key equation, status (proven/conditional/open). Two master sliders: pixel area (a_cell) and screen capacity.
- **Shows:** All of physics from 4 axioms + 2 parameters

---

## 5. Content Strategy

### Per-Page Structure (Following the Book's Pedagogy)

Each page follows the book's three-act structure:

1. **The Intuitive Picture** -- What seems obvious (the conventional assumption)
2. **The Surprising Hint** -- What experiments/theory actually showed
3. **The OPH Reframing** -- How the axioms explain it
4. **Interactive Demo** -- Hands-on exploration
5. **Where We Are** -- Mini derivation chain showing current position (DerivationChain component)
6. **Key Equations** (in Explainer) -- For those who want the math
7. **Summary Table** -- Intuitive | Hint | Reframing

### "Where We Are" Sidebar

Every page in Parts II and III shows a mini version of the relevant derivation chain with the current node highlighted. This gives users constant orientation: "I'm HERE on the path from axioms to GR" or "I'm HERE on the path to QFT."

### Content Sources
- Book chapters (prologue through ch-19 + epilogue): primary narrative source
- PAPER.md: precision numerics and formal theorem statements
- TECHNICAL_SUPPLEMENT.md: "10 hardest questions" framing
- OPEN_PROBLEMS.md: clearly mark what is proven vs open

---

## 6. Data Model

### Walkthrough Step (routes/walkthrough.ts)
```typescript
export type WalkthroughStep = {
    to: string;
    label: string;
    icon: LucideIcon;
    part: 'foundation' | 'chain1-gr' | 'chain2-qft' | 'predictions' | 'reference';
    chainNode?: string;  // ID of the node in the derivation chain
};
```

### Derivation Chain Node
```typescript
export type ChainNode = {
    id: string;
    label: string;
    equation?: string;          // Key equation (LaTeX string)
    status: 'proven' | 'conditional' | 'open';
    axioms: string[];           // Which axioms feed in (A1, A2, A3, A4, B, D, ...)
    children: string[];         // Downstream node IDs
    pageRoute: string;          // Which walkthrough page covers this
};

export const CHAIN_1_GR: ChainNode[] = [ /* ... */ ];
export const CHAIN_2_QFT: ChainNode[] = [ /* ... */ ];
```

### OPH Context (contexts/OPHContext.tsx)
```typescript
type OPHState = {
    // The two fundamental parameters (adjustable on synthesis page)
    pixelArea: number;           // a_cell ~ 1.63 l_P²
    screenCapacity: number;      // log(dim H) ~ 10^122

    // Demo parameters (shared across pages)
    bellAngleA: number;
    bellAngleB: number;
    galaxyMass: number;
    mondScale: number;
    diffusionT: number;          // Heat-kernel parameter
    bhMass: number;              // For GW spectrum

    // UI state
    detailLevel: 'plain' | 'physics' | 'formal';
    activeChain: 'gr' | 'qft' | 'both';
};
```

---

## 7. SEO Strategy

### Meta Tags
```html
<title>Observer Patch Holography -- Interactive Learning | Floating Pragma</title>
<meta name="description" content="Learn Observer Patch Holography interactively.
From the OPH quantum-algebraic observer-consistency basis on a holographic screen, recover
general relativity, the Standard Model, and effective quantum descriptions. By Bernhard Mueller." />
<meta name="keywords" content="observer patch holography, theory of everything,
emergent spacetime, quantum gravity, holographic principle, emergent gravity,
standard model derivation, dark matter MOND, Bernhard Mueller, OPH" />
```

### JSON-LD Structured Data
- `WebApplication` schema for the interactive app
- `Course` schema with `hasCourseInstance` for each part
- `ScholarlyArticle` linking to the Zenodo paper (DOI: 10.5281/zenodo.18288114)
- `Book` linking to oth-book.lovable.app

---

## 8. Deployment

- **GitHub Actions:** `peaceiris/actions-gh-pages@v3` with `permissions: contents: write`
- **Vite config:** `base: '/oph/'`
- **No CNAME file** (sub-repo rule)
- **Google Analytics:** G-HLGH209WMG
- **Back-link:** Header links to floatingpragma.io
- **Landing page update:** Add "OPH Lab" link to muellerberndt.github.io/index.html

---

## 9. Design Tokens (Shared with Other Properties)

```css
:root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --bg-tertiary: #1a1a1a;
    --accent-green: #00ff41;
    --accent-purple: #ff79c6;
    --accent-cyan: #4ee7ff;
    --accent-amber: #ffb300;
    --accent-gold: #c9a96e;      /* Axiom/chain highlights */
    --accent-rose: #c97070;      /* Chain 1 (GR) accent */
    --accent-blue: #7ab8d4;      /* Chain 2 (QFT) accent */
    --font-mono: 'JetBrains Mono', 'Courier New', monospace;
    --border-radius: 0px;
}
```

Chain 1 (GR) pages use `--accent-rose` as their primary accent.
Chain 2 (QFT) pages use `--accent-blue` as their primary accent.
Foundation and synthesis pages use `--accent-gold`.

---

## 10. Implementation Order

### Phase 1: Scaffold + Foundation (Part I)
1. Create repo, Vite + React 19 + TypeScript setup
2. Layout component (sidebar with chain grouping, nav, responsive)
3. Walkthrough data + routing for all 25 pages
4. DerivationChain component (reusable, highlight "you are here")
5. Pages 0-4 (Introduction through Axioms) with content
6. **Demo 1: Patch Sphere** (SVG, reused later for gauge page)
7. Hidden Assumption Revealer (CSS flip cards)

### Phase 2: Chain 1 -- Axioms → General Relativity (Part II)
8. `core/entropy.ts` + `core/holographic.ts` + `core/gravity.ts`
9. Pages 5-12 with content (all 8 GR chain pages)
10. **Demo 2: Area-Entropy Explorer**
11. **Demo 3: RT Toy Model** (entanglement → geometry)
12. **Demo 8: Möbius/Lorentz**
13. **Demo 9: Modular Flow Animator**
14. **Demo 4: Jacobson Mechanism** (gravity from entropy)
15. **Demo 10: Galaxy Rotation Curves**
16. Page 12: Chain 1 synthesis with DerivationChain Explorer

### Phase 3: Chain 2 -- Axioms → QFT (Part III)
17. `core/information.ts` + `core/gauge.ts` + `core/particles.ts`
18. Pages 13-20 with content (all 8 QFT chain pages)
19. **Demo 5: Wigner's Friend** (QM emergence)
20. **Demo 7: Bell Experiment**
21. **Demo 6: Gauge-as-Gluing** (reuses PatchSphere with gauge overlays)
22. **Demo 11: Heat-Kernel Edge Sectors**
23. **Demo 12: Matter Continuations Placeholder**
24. **Demo 13: Running Couplings**
25. Page 20: Chain 2 synthesis with DerivationChain Explorer

### Phase 4: Predictions + Polish
26. `core/cosmology.ts` (GW comb)
27. Pages 21-22 (Predictions, Synthesis)
28. **Demo 14: GW Horizon Spectroscopy**
29. **Demo 15: Full Prediction Chain** (both chains unified)
30. Glossary + Resources pages
31. SEO (meta tags, JSON-LD, sitemap)
32. Landing page update (add OPH Lab link)
33. Deploy

---

## 11. Summary

| Metric | Count |
|--------|-------|
| Total pages | 25 (5 foundation + 8 GR chain + 8 QFT chain + 2 predictions + 2 reference) |
| Interactive demos | 15 (6 critical chain + 6 supporting + 3 polish) |
| Core modules | 8 pure TypeScript math/physics modules |
| Reusable components | ~10 (Layout, Nav, Explainer, MathBlock, PatchSphere, DerivationChain, ComparisonTable, InteractiveCanvas, etc.) |
| Derivation chain nodes | ~25 per chain, fully clickable |

**The key guarantee:** Every node in both derivation chains has an interactive demo. A user can click through from "4 axioms on a sphere" to "Einstein's equations" and from "4 axioms on a sphere" to "SU(3)×SU(2)×U(1)/Z₆" with no gaps.

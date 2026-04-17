export type ClaimTier =
    | 'structural'
    | 'branch-conditional'
    | 'calibration'
    | 'continuation-only'
    | 'compare-only'
    | 'open';

export type PaperSummary = {
    slug: string;
    title: string;
    href: string;
    surface: string;
    summary: string;
};

export type PublicRow = {
    label: string;
    value: string;
    tier: ClaimTier;
    note: string;
};

export const RESEARCH_REPO_URL = 'https://github.com/FloatingPragma/observer-patch-holography';
export const RESEARCH_PAPER_DIR_URL = `${RESEARCH_REPO_URL}/tree/main/paper`;
export const LAB_REPO_URL = 'https://github.com/muellerberndt/oph-lab';
export const OVERVIEW_URL = 'https://floatingpragma.io/oph/';
export const THEORY_URL = 'https://floatingpragma.io/oph/theory-of-everything/';
export const SIMULATION_URL = 'https://floatingpragma.io/oph/simulation-theory/';
export const BOOK_URL = 'https://oph-book.floatingpragma.io/';
export const TEXTBOOKS_URL = 'https://learn.floatingpragma.io/';
export const CHALLENGE_URL = 'https://challenge.floatingpragma.io/';

const GITHUB_PDF_BASE = `${RESEARCH_REPO_URL}/blob/main/paper`;

export const OPH_PAPERS: PaperSummary[] = [
    {
        slug: 'observers',
        title: 'Observers Are All You Need',
        href: `${GITHUB_PDF_BASE}/observers_are_all_you_need.pdf`,
        surface: 'Synthesis',
        summary: 'The five-paper overview. It ties the recovered core, particles, consensus, and observer machinery into one public stack.',
    },
    {
        slug: 'compact',
        title: 'Recovering Relativity and the Standard Model from the OPH Package Rooted in Observer Consistency',
        href: `${GITHUB_PDF_BASE}/recovering_relativity_and_standard_model_structure_from_observer_overlap_consistency_compact.pdf`,
        surface: 'Recovered Core',
        summary: 'The compact SM/GR derivation paper. It carries the conditional gravity branch, the Standard Model quotient chain, and the visible claim ledger.',
    },
    {
        slug: 'particles',
        title: 'Deriving the Particle Zoo from Observer Consistency',
        href: `${GITHUB_PDF_BASE}/deriving_the_particle_zoo_from_observer_consistency.pdf`,
        surface: 'Particles',
        summary: 'The particle-status paper. It separates structural outputs, public calibration rows, exact sidecars, continuation lanes, and open fronts.',
    },
    {
        slug: 'consensus',
        title: 'Reality as a Consensus Protocol',
        href: `${GITHUB_PDF_BASE}/reality_as_consensus_protocol.pdf`,
        surface: 'Consensus',
        summary: 'The fixed-point and repair paper. It formalizes overlap reconciliation, schedule-independent normal form, gauge-quotient uniqueness, and stable records.',
    },
    {
        slug: 'microphysics',
        title: 'Screen Microphysics and Observer Synchronization',
        href: `${GITHUB_PDF_BASE}/screen_microphysics_and_observer_synchronization.pdf`,
        surface: 'Observer Machinery',
        summary: 'The concrete finite-screen architecture. It turns patches, overlaps, records, checkpoint/restoration, and observer synchronization into one simulator-facing model.',
    },
];

export const CLAIM_TIER_LEGEND: Array<{ tier: ClaimTier; label: string; description: string }> = [
    {
        tier: 'structural',
        label: 'Structural',
        description: 'Recovered theorem-grade output that does not depend on a compare-only sidecar.',
    },
    {
        tier: 'branch-conditional',
        label: 'Branch-Conditional',
        description: 'Recovered only on a stated theorem-local premise stack such as the BW or null-stress branch.',
    },
    {
        tier: 'calibration',
        label: 'Calibration',
        description: 'Closed public numeric output on the declared calibration surface.',
    },
    {
        tier: 'continuation-only',
        label: 'Continuation-Only',
        description: 'A downstream lane that sharpens an open object without closing the theorem frontier.',
    },
    {
        tier: 'compare-only',
        label: 'Compare-Only',
        description: 'A validation sidecar or exact-fit slice that does not replace the public theorem object.',
    },
    {
        tier: 'open',
        label: 'Open',
        description: 'A theorem object, bridge, or simulator burden is open on the declared corpus.',
    },
];

export const CORE_PARAMETERS = [
    {
        label: 'Pixel area',
        value: 'a_cell ~ 1.63 l_P^2',
        note: 'Sets the local gravity and calibration scale. The public particle and gravity numerics are descendants of this branch.',
    },
    {
        label: 'Screen capacity',
        value: 'log(dim H_tot) ~ 10^122',
        note: 'Closes the cosmological-capacity branch and supplies the de Sitter benchmark scale.',
    },
];

export const BOSON_PUBLIC_ROWS: PublicRow[] = [
    {
        label: 'W',
        value: '80.377 GeV',
        tier: 'calibration',
        note: 'Closed on the public electroweak repair surface. The frozen exact pair is a validation sidecar.',
    },
    {
        label: 'Z',
        value: '91.1879781 GeV',
        tier: 'calibration',
        note: 'Closed on the same public electroweak repair surface. The frozen exact pair stays on the validation side.',
    },
    {
        label: 'H',
        value: '125.199530 GeV',
        tier: 'calibration',
        note: 'Public row carried by the source-only Higgs/top split surface. The exact inverse adapter is a check.',
    },
    {
        label: 't',
        value: '172.352355 GeV',
        tier: 'calibration',
        note: 'Public row carried by the same source-only Higgs/top split surface, not by the inverse check surface.',
    },
];

export const PARTICLE_LANE_STATUS = [
    {
        label: 'Structural carriers',
        summary: 'Photon, gluons, and graviton stay on exact structural zero on the public surface.',
    },
    {
        label: 'Quarks',
        summary: 'OPH closes one exact public quark sextet on one physical frame fixed by P. A full classification of all quark frames sits outside that result.',
    },
    {
        label: 'Charged leptons',
        summary: 'The exact same-family readback is explicit. The open step is the source landing that turns the shared geometric data into full physical charged masses.',
    },
    {
        label: 'Neutrinos',
        summary: 'The weighted-cycle branch emits one absolute family, the central splittings, and one physical Majorana pair. The fitting adapters stay on the diagnostic side.',
    },
    {
        label: 'Hadrons',
        summary: 'Hadron masses depend on a production backend and large compute budgets instead of a short symbolic surface.',
    },
];

export const GRAVITY_SURFACE = [
    'Lorentz kinematics is recovered on the explicit BW scaling branch from the screen identity Conf+(S^2) = SO+(3,1).',
    'The Jacobson-type Einstein relation is local and branch-conditional. It uses the null-modular bridge, the separate bounded-interval projective branch, and fixed-cap generalized-entropy stationarity.',
    'Null data fix the tensor only up to the null-invisible metric term. The global screen-capacity branch closes Lambda separately.',
    'The UV/BW scaffold is the realized cap-pair extraction plus ordered cut-pair rigidity on the extracted prime geometric subnet.',
];

export const STANDARD_MODEL_SURFACE = [
    'The recovered gauge quotient is [SU(3) x SU(2) x U(1)] / Z6 with exact hypercharges, Ng = 3, and Nc = 3.',
    'No gauge-mediated proton decay is the sharp product-group corollary on the recovered core.',
    'Coupling unification is geometric on the published edge-running surface. The published surface uses no simple-group GUT embedding or superpartners.',
];

export const CONSENSUS_HIGHLIGHTS = [
    'Accepted local repairs strictly lower the inconsistency potential Phi on the overlaps they touch.',
    'On the finite patch net, that local-fit contract makes Phi a Lyapunov functional for the repair dynamics.',
    'The fixed-cutoff union-collar gluing package makes overlapping accepted repairs quotient-locally compatible.',
    'Under repair completeness, the patch net has a unique schedule-independent normal form.',
    'Global inconsistency is a holonomy problem. Pairwise agreement can leave a nontrivial cycle obstruction.',
    'Stable records live on the fixed-cutoff record algebra, with exact central projectors or explicitly controlled approximately commuting surrogates.',
    'Law-space selection is presented as a meta-model over reconciliation laws. The stated claim is narrower than a literal cosmological evolution story.',
];

export const MICROPHYSICS_HIGHLIGHTS = [
    'A finite screen cellulation carries local gauge registers on links and optional record qubits on vertices or coarse cells.',
    'Patch algebras, overlap observables, edge-sector measurements, and repair instruments are explicit finite-cutoff objects instead of metaphors.',
    'Measurement, stable records, checkpoint/restoration, and observer synchronization live inside one shared microscopic model.',
    'The paper gives a simulator-facing reference architecture. A uniquely identified final UV completion is outside the stated surface.',
    'The architecture is designed so small digital or tensor-network simulations can probe gauge-invariant patch observables, low collar CMI, and synchronization stability.',
];

export const PREDICTION_SURFACE = {
    distinctiveTemplates: [
        {
            title: 'GW horizon spectroscopy comb',
            tier: 'continuation-only' as ClaimTier,
            summary: 'A distinctive horizon-area template with line positions x_k = ln(k)/(8pi). The paper places it on a continuation-level signal surface outside the recovered core.',
        },
        {
            title: 'Discrete Hawking spectrum',
            tier: 'continuation-only' as ClaimTier,
            summary: 'The discrete-line Hawking picture is carried only if the extra integer-transition selection rule is realized. The paper labels it a continuation-level template.',
        },
        {
            title: 'Deep-IR MOND/RAR response',
            tier: 'open' as ClaimTier,
            summary: 'The benchmark a0 scale is numerically suggestive. The paper does not derive a galaxy-dynamics law or promote a MOND/RAR response functional.',
        },
    ],
    nullExpectations: [
        {
            title: 'No gauge-mediated proton decay',
            summary: 'This is the sharp recovered-core exclusion. Product-group gauge structure blocks the classic GUT leptoquark route.',
        },
        {
            title: 'No simple-group GUT is needed for the published unification surface',
            summary: 'The coupling story is geometric on the published edge-running lane. The lab should not imply a hidden SU(5)-style embedding.',
        },
        {
            title: 'No supersymmetry is required by the public edge-shift derivation',
            summary: 'The published beta-shift surface reproduces MSSM-like running behavior without introducing a superpartner sector.',
        },
        {
            title: 'No extra spatial dimensions on the recovered Lorentz branch',
            summary: 'The route is screen-based 3+1 dimensional kinematics from Conf+(S^2).',
        },
    ],
    falsificationPressure: [
        'Data that require gauge-mediated proton decay or a different realized gauge quotient would directly hit the recovered core.',
        'A failure of the public W/Z/H/t rows after the declared calibration setup would pressure the quantitative bosonic surface.',
        'A fully derived dark-sector particle explanation would conflict with the gravity-side interpretation, and the galaxy-response story is an open lane.',
        'Ringdown data can test the horizon-comb template and pressure a continuation lane on that surface.',
    ],
};

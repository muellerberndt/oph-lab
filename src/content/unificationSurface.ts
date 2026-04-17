export type ExactBundleRow = {
    label: string;
    value: string;
    note: string;
};

export type ExactBundleSection = {
    id: string;
    title: string;
    scope: string;
    note: string;
    rows: ExactBundleRow[];
};

export const LANDING_AUDIT_NOTES = [
    'The landing page exposes the live P / screen-capacity descendant surface.',
    'The particle surface includes an exact selected-class quark sextet, an exact same-family charged witness, weighted-cycle neutrino masses and splittings, and the D11 source-only Higgs/top split theorem.',
    'The gravity-side local unification bundle uses the inverse G(P) law and its downstream Lambda, de Sitter, and a0 descendants.',
];

export const LANDING_SCOPE_NOTES = [
    'The live sliders are limited to rows with a published forward descendant law on the declared public surface.',
    'The exact quark, charged-lepton, and neutrino bundles are shown separately because the papers do not publish one off-canonical slider family for every lane.',
];

export const EXACT_BUNDLE_SECTIONS: ExactBundleSection[] = [
    {
        id: 'structural-bosonic',
        title: 'Structural Zeros And Exact Bosonic Surface',
        scope: 'Structural exactness + calibration / compare-only sidecars',
        note: 'These are the exact non-hadron rows on the declared paper surface: structural zeros, the exact frozen W/Z sidecar, and the exact source-only D11 split pair.',
        rows: [
            { label: 'Photon', value: '0 GeV', note: 'Structural zero.' },
            { label: 'Gluon', value: '0 GeV', note: 'Structural zero.' },
            { label: 'Graviton', value: '0 GeV', note: 'Structural zero.' },
            { label: 'W boson', value: '80.377 GeV', note: 'Exact frozen authoritative repair surface.' },
            { label: 'Z boson', value: '91.18797809193725 GeV', note: 'Exact frozen authoritative repair surface.' },
            { label: 'Higgs boson', value: '125.1995304097179 GeV', note: 'Exact D11 source-only split theorem.' },
            { label: 'Top quark', value: '172.35235532883115 GeV', note: 'Exact D11 split companion; also carried by the selected-class quark theorem.' },
        ],
    },
    {
        id: 'charged',
        title: 'Charged Same-Family Exact Witness',
        scope: 'Exact witness on current_family_only',
        note: 'The charged theorem lane is open from P, and the exact same-family witness is public and explicit.',
        rows: [
            { label: 'Electron', value: '0.00051099895 GeV', note: 'Exact same-family witness.' },
            { label: 'Muon', value: '0.1056583755 GeV', note: 'Exact same-family witness.' },
            { label: 'Tau', value: '1.7769324651340912 GeV', note: 'Exact same-family witness.' },
        ],
    },
    {
        id: 'quarks',
        title: 'Selected-Class Exact Quark Theorem',
        scope: 'Exact on the selected public physical quark frame class f_P',
        note: 'The public quark theorem closes the exact PDG 2025 running-quark sextet on the selected class chosen by P and emits explicit exact forward Yukawas on that class.',
        rows: [
            { label: 'Up quark', value: '0.00216 GeV', note: 'Selected-class exact theorem.' },
            { label: 'Charm quark', value: '1.273 GeV', note: 'Selected-class exact theorem.' },
            { label: 'Top quark', value: '172.35235532883115 GeV', note: 'Selected-class exact theorem.' },
            { label: 'Down quark', value: '0.00470 GeV', note: 'Selected-class exact theorem.' },
            { label: 'Strange quark', value: '0.0935 GeV', note: 'Selected-class exact theorem.' },
            { label: 'Bottom quark', value: '4.183 GeV', note: 'Selected-class exact theorem.' },
        ],
    },
    {
        id: 'neutrinos',
        title: 'Weighted-Cycle Neutrino Theorem Branch',
        scope: 'Theorem-grade emitted absolute family on the weighted-cycle branch',
        note: 'The weighted-cycle theorem branch closes the absolute family, central splittings, and the physical Majorana pair on the declared branch.',
        rows: [
            { label: 'nu_e', value: '0.017454720257976796 eV', note: 'Absolute attachment theorem.' },
            { label: 'nu_mu', value: '0.019481987935919015 eV', note: 'Absolute attachment theorem.' },
            { label: 'nu_tau', value: '0.05307522145074924 eV', note: 'Absolute attachment theorem.' },
            { label: 'Delta m21^2', value: '7.488059465106851e-05 eV^2', note: 'Theorem-grade weighted-cycle splitting.' },
            { label: 'Delta m32^2', value: '0.0024374312781107786 eV^2', note: 'Theorem-grade weighted-cycle splitting.' },
            { label: 'alpha21^(Maj)', value: '153.618518 deg', note: 'Physical Majorana phase.' },
            { label: 'alpha31^(Maj)', value: '257.003241 deg', note: 'Physical Majorana phase.' },
        ],
    },
];

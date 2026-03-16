import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
    BETA_COEFFICIENTS_MSSM_LIKE,
    BETA_COEFFICIENTS_SM_1LOOP,
    PIXEL_REFERENCE,
    SCREEN_CAPACITY_REFERENCE_LOG10,
    deSitterRadiusFromLambda,
    estimateHadronMassesFromQcdScale,
    estimateQcdScaleGeV,
    hubbleFromLambda,
    lambdaFromScreen,
    neutrinoMassesFromScreen,
    solveGaugeClosure,
    textureMassesFromVev,
} from '../core/ophMath';

export type RunningModel = 'edge-mssm-like' | 'sm-1loop';
export type UnificationPreset = 'sm-only' | 'edge-canonical' | 'edge-custom';
type AxiomDetailLevel = 'plain' | 'physics' | 'formal';

type ActiveChecks = {
    loopCoherent: boolean;
    anomalyFree: boolean;
    chiralStable: boolean;
    singleHiggs: boolean;
    cpCapable: boolean;
    weakUvComplete: boolean;
};

type EntanglementBond = {
    from: number;
    to: number;
    strength: number;
};

type ScreenPatch = {
    cx: number;
    cy: number;
    r: number;
    color: string;
    label: string;
};

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

const STORAGE_KEY = 'oph-lab.settings.v1';

const DEFAULT_ACTIVE_CHECKS: ActiveChecks = {
    loopCoherent: true,
    anomalyFree: true,
    chiralStable: true,
    singleHiggs: true,
    cpCapable: true,
    weakUvComplete: true,
};

const DEFAULT_BONDS: EntanglementBond[] = [
    { from: 0, to: 4, strength: 1.0 },
    { from: 1, to: 5, strength: 1.0 },
    { from: 2, to: 6, strength: 1.0 },
    { from: 3, to: 7, strength: 1.0 },
];

const DEFAULT_SCREEN_PATCHES: ScreenPatch[] = [
    { cx: 140, cy: 130, r: 60, color: 'rgba(201, 112, 112, 0.3)', label: 'Observer A' },
    { cx: 200, cy: 170, r: 55, color: 'rgba(122, 184, 212, 0.3)', label: 'Observer B' },
];

export type LabSettingMap = {
    'glossary.search': string;
    'glossary.filterCategory': string | null;
    'axioms.level': AxiomDetailLevel;
    'hints.flippedIndices': number[];
    'noObjective.flippedIndices': number[];
    'theScreen.patches': ScreenPatch[];

    'entropy.probs': number[];
    'entanglement.numTrials': number;
    'entanglementGeometry.bonds': EntanglementBond[];

    'deSitter.logDimH': number;
    'darkMatter.logMass': number;
    'darkMatter.a0Multiplier': number;

    'gravity.pixelConstant': number;
    'gravity.logCapacity': number;
    'gravity.nullEnergy': number;
    'gravity.curvatureResponse': number;
    'gravity.stripWeight': number;
    'gravity.nullGenerators': number;

    'standardModel.stage': number;
    'standardModel.activeChecks': ActiveChecks;
    'standardModel.ncTrial': number;
    'standardModel.ngTrial': number;

    'masses.pixelConstant': number;
    'masses.logCapacity': number;
    'masses.runningModel': RunningModel;
    'masses.su2MaxJ': number;
    'masses.su3MaxIndex': number;
    'masses.alphaStep': number;
    'masses.qcdFlavors': number;
    'masses.coefficientScale': number;
    'masses.upExponentShift': number;
    'masses.downExponentShift': number;
    'masses.leptonExponentShift': number;

    'unification.preset': UnificationPreset;
    'unification.edgeShiftScale': number;
    'unification.pixelConstant': number;
    'unification.su2MaxJ': number;
    'unification.su3MaxIndex': number;
    'unification.alphaStep': number;
    'unification.probeLogMu': number;
};

export const LAB_DEFAULT_SETTINGS: LabSettingMap = {
    'glossary.search': '',
    'glossary.filterCategory': null,
    'axioms.level': 'plain',
    'hints.flippedIndices': [],
    'noObjective.flippedIndices': [],
    'theScreen.patches': DEFAULT_SCREEN_PATCHES.map(patch => ({ ...patch })),

    'entropy.probs': [0.25, 0.25, 0.25, 0.25],
    'entanglement.numTrials': 100,
    'entanglementGeometry.bonds': DEFAULT_BONDS.map(bond => ({ ...bond })),

    'deSitter.logDimH': 122,
    'darkMatter.logMass': 11,
    'darkMatter.a0Multiplier': 1.0,

    'gravity.pixelConstant': PIXEL_REFERENCE,
    'gravity.logCapacity': SCREEN_CAPACITY_REFERENCE_LOG10,
    'gravity.nullEnergy': 1,
    'gravity.curvatureResponse': 1,
    'gravity.stripWeight': 0.08,
    'gravity.nullGenerators': 8,

    'standardModel.stage': 5,
    'standardModel.activeChecks': { ...DEFAULT_ACTIVE_CHECKS },
    'standardModel.ncTrial': 3,
    'standardModel.ngTrial': 3,

    'masses.pixelConstant': PIXEL_REFERENCE,
    'masses.logCapacity': SCREEN_CAPACITY_REFERENCE_LOG10,
    'masses.runningModel': 'edge-mssm-like',
    'masses.su2MaxJ': 30,
    'masses.su3MaxIndex': 14,
    'masses.alphaStep': 0.0005,
    'masses.qcdFlavors': 5,
    'masses.coefficientScale': 1,
    'masses.upExponentShift': 0,
    'masses.downExponentShift': 0,
    'masses.leptonExponentShift': 0,

    'unification.preset': 'edge-canonical',
    'unification.edgeShiftScale': 1,
    'unification.pixelConstant': PIXEL_REFERENCE,
    'unification.su2MaxJ': 30,
    'unification.su3MaxIndex': 14,
    'unification.alphaStep': 0.0005,
    'unification.probeLogMu': 2,
};

export type LabSettingKey = keyof LabSettingMap;

type LabExportPayload = {
    schemaVersion: 'oph-lab-export-v1';
    exportedAt: string;
    settings: LabSettingMap;
    effects: Record<string, JsonValue>;
};

type LabStateContextValue = {
    settings: LabSettingMap;
    setSetting: <K extends LabSettingKey>(key: K, value: LabSettingMap[K]) => void;
    resetAll: () => void;
    resetKeys: (keys: LabSettingKey[]) => void;
    exportState: () => LabExportPayload;
};

const LabStateContext = createContext<LabStateContextValue | null>(null);

function deepClone<T>(value: T): T {
    if (typeof structuredClone === 'function') {
        return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value)) as T;
}

function safeParseStoredSettings(raw: string | null): Partial<LabSettingMap> {
    if (!raw) {
        return {};
    }
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') {
            return {};
        }
        return parsed as Partial<LabSettingMap>;
    } catch {
        return {};
    }
}

function mergeWithDefaults(partial: Partial<LabSettingMap>): LabSettingMap {
    return {
        ...deepClone(LAB_DEFAULT_SETTINGS),
        ...partial,
    };
}

function getUnificationBeta(preset: UnificationPreset, edgeShiftScale: number): [number, number, number] {
    const scale = preset === 'sm-only' ? 0 : preset === 'edge-canonical' ? 1 : edgeShiftScale;
    return [0, 1, 2].map(index => {
        const sm = BETA_COEFFICIENTS_SM_1LOOP[index];
        const delta = BETA_COEFFICIENTS_MSSM_LIKE[index] - sm;
        return sm + scale * delta;
    }) as [number, number, number];
}

function toLabExport(settings: LabSettingMap): LabExportPayload {
    const gravityPixel = settings['gravity.pixelConstant'];
    const gravityLogCapacity = settings['gravity.logCapacity'];
    const gravityLambda = lambdaFromScreen(gravityPixel, gravityLogCapacity);
    const gravityDeSitterRadius = deSitterRadiusFromLambda(gravityLambda);
    const gravityHubble = hubbleFromLambda(gravityLambda);

    const massesBeta =
        settings['masses.runningModel'] === 'edge-mssm-like' ? BETA_COEFFICIENTS_MSSM_LIKE : BETA_COEFFICIENTS_SM_1LOOP;
    const massesClosure = solveGaugeClosure(settings['masses.pixelConstant'], {
        betaCoefficients: massesBeta,
        su2MaxJ: settings['masses.su2MaxJ'],
        su3MaxIndex: settings['masses.su3MaxIndex'],
        alphaRange: { min: 0.015, max: 0.09, step: settings['masses.alphaStep'] },
    });
    const massesTexture = textureMassesFromVev(massesClosure.vGeV, {
        coefficientScale: settings['masses.coefficientScale'],
        upExponentShift: settings['masses.upExponentShift'],
        downExponentShift: settings['masses.downExponentShift'],
        leptonExponentShift: settings['masses.leptonExponentShift'],
    });
    const massesNeutrinos = neutrinoMassesFromScreen(settings['masses.logCapacity'], settings['masses.pixelConstant']);
    const lambdaQcd = estimateQcdScaleGeV(massesClosure.alpha3, massesClosure.muStarGeV, settings['masses.qcdFlavors']);
    const massesHadrons = estimateHadronMassesFromQcdScale(lambdaQcd);

    const unificationBeta = getUnificationBeta(settings['unification.preset'], settings['unification.edgeShiftScale']);
    const unificationClosure = solveGaugeClosure(settings['unification.pixelConstant'], {
        betaCoefficients: unificationBeta,
        su2MaxJ: settings['unification.su2MaxJ'],
        su3MaxIndex: settings['unification.su3MaxIndex'],
        alphaRange: { min: 0.015, max: 0.09, step: settings['unification.alphaStep'] },
    });

    const deSitterLogDimH = settings['deSitter.logDimH'];
    const G = 6.674e-11;
    const c = 3e8;
    const hbar = 1.055e-34;
    const kB = 1.381e-23;
    const deSitterLambda = 3 * Math.PI / (G * Math.pow(10, deSitterLogDimH));
    const deSitterH = Math.sqrt(deSitterLambda * c * c / 3);
    const deSitterT = (hbar * deSitterH) / (2 * Math.PI * kB);
    const deSitterRadius = c / deSitterH;

    const darkMatterA0 = 1.03e-10 * settings['darkMatter.a0Multiplier'];
    const entropyProbs = settings['entropy.probs'];
    const shannonEntropy = entropyProbs.reduce((sum, probability) => {
        if (probability <= 0) {
            return sum;
        }
        return sum - probability * Math.log2(probability);
    }, 0);

    const standardNc = settings['standardModel.ncTrial'];
    const standardNg = settings['standardModel.ngTrial'];
    const weakNumerator = 22 - standardNg * (standardNc + 1);

    const effects: Record<string, JsonValue> = {
        gravity: {
            lambda: gravityLambda,
            deSitterRadius: gravityDeSitterRadius,
            hubble: gravityHubble,
            gRatio: gravityPixel / PIXEL_REFERENCE,
        },
        masses: {
            alphaU: massesClosure.alphaU,
            alphaInvU: massesClosure.alphaInvU,
            unificationScaleGeV: massesClosure.unificationScaleGeV,
            vevGeV: massesClosure.vGeV,
            mZGeV: massesClosure.mZGeV,
            mWGeV: massesClosure.mWGeV,
            sin2ThetaW: massesClosure.sin2ThetaW,
            alphaS: massesClosure.alpha3,
            lambdaQcdGeV: lambdaQcd,
            neutrinosEv: massesNeutrinos,
            hadronEstimatesGeV: massesHadrons,
            topTexture: massesTexture.find(item => item.id === 'top')?.massGeV ?? null,
            electronTexture: massesTexture.find(item => item.id === 'electron')?.massGeV ?? null,
        },
        unification: {
            betaCoefficients: unificationBeta,
            alphaU: unificationClosure.alphaU,
            alphaInvU: unificationClosure.alphaInvU,
            unificationScaleGeV: unificationClosure.unificationScaleGeV,
            pixelResidual: unificationClosure.pixelResidual,
        },
        deSitter: {
            lambda: deSitterLambda,
            hubble: deSitterH,
            temperature: deSitterT,
            horizonRadius: deSitterRadius,
        },
        darkMatter: {
            a0: darkMatterA0,
            galaxyMassSolar: Math.pow(10, settings['darkMatter.logMass']),
        },
        entropy: {
            shannonBits: shannonEntropy,
            maxBits: Math.log2(entropyProbs.length),
        },
        standardModel: {
            ncTrial: standardNc,
            ngTrial: standardNg,
            weakOneLoopNumerator: weakNumerator,
            cpPhases: ((standardNg - 1) * (standardNg - 2)) / 2,
            ncOddPass: standardNc % 2 === 1,
        },
        metadata: {
            basis: 'Latest OPH Lab simulation state',
            canonicalDefaults: deepClone(LAB_DEFAULT_SETTINGS),
        },
    };

    return {
        schemaVersion: 'oph-lab-export-v1',
        exportedAt: new Date().toISOString(),
        settings: deepClone(settings),
        effects,
    };
}

export function LabStateProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<LabSettingMap>(() => {
        const stored = safeParseStoredSettings(localStorage.getItem(STORAGE_KEY));
        return mergeWithDefaults(stored);
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    const setSetting = useCallback(<K extends LabSettingKey>(key: K, value: LabSettingMap[K]) => {
        setSettings(previous => ({
            ...previous,
            [key]: deepClone(value),
        }));
    }, []);

    const resetAll = useCallback(() => {
        setSettings(deepClone(LAB_DEFAULT_SETTINGS));
    }, []);

    const resetKeys = useCallback((keys: LabSettingKey[]) => {
        setSettings(previous => {
            const updates: Partial<LabSettingMap> = {};
            for (const key of keys) {
                (updates as Record<LabSettingKey, LabSettingMap[LabSettingKey]>)[key] = deepClone(LAB_DEFAULT_SETTINGS[key]);
            }
            return {
                ...previous,
                ...updates,
            };
        });
    }, []);

    const exportState = useCallback(() => toLabExport(settings), [settings]);

    const value = useMemo<LabStateContextValue>(() => {
        return {
            settings,
            setSetting,
            resetAll,
            resetKeys,
            exportState,
        };
    }, [exportState, resetAll, resetKeys, setSetting, settings]);

    return (
        <LabStateContext.Provider value={value}>
            {children}
        </LabStateContext.Provider>
    );
}

export function useLabState() {
    const context = useContext(LabStateContext);
    if (!context) {
        throw new Error('useLabState must be used inside LabStateProvider');
    }
    return context;
}

export function useLabSetting<K extends LabSettingKey>(
    key: K
): [LabSettingMap[K], (value: LabSettingMap[K] | ((previous: LabSettingMap[K]) => LabSettingMap[K])) => void] {
    const { settings, setSetting } = useLabState();
    const setter = useCallback((value: LabSettingMap[K] | ((previous: LabSettingMap[K]) => LabSettingMap[K])) => {
        const nextValue =
            typeof value === 'function'
                ? (value as (previous: LabSettingMap[K]) => LabSettingMap[K])(settings[key])
                : value;
        setSetting(key, nextValue);
    }, [key, setSetting, settings]);
    return [settings[key], setter];
}

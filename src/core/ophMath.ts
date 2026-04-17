const E_PLANCK_GEV = 1.22089e19;
const BETA_EW = 4;
const MZ_REFERENCE_GEV = 91.1876;
const D11_Y_T_CORE_MT = 0.92046435;
const D11_LAMBDA_CORE_MT = 0.13164915;
const D11_MT_POLE_CORE_GEV = 170.26125;
const D11_MH_CORE_GEV = 126.62263;
const D11_D_MT_POLE_D_Y_T = 184.97;
const D11_D_MH_D_LAMBDA = 480.0;
const D11_LIVE_ALPHA_T_RESIDUAL_DIVISOR = 28;
const D11_LIVE_ALPHA_T_ETA8_DIVISOR = 14;
const D11_LIVE_ALPHA_T_ETA9_DIVISOR = 27;
const D11_LIVE_ALPHA_H_ETA6_NUMERATOR = 3;
const D11_LIVE_ALPHA_H_ETA6_DIVISOR = 25;
const D11_LIVE_ALPHA_H_LAMBDA_DIVISOR = 18;
const D10_THOMSON_FACTOR = 1.0680423805486379;

export const LIGHT_SPEED_SI = 299792458;
export const PLANCK_REDUCED_CONSTANT_SI = 1.054571817e-34;
export const BOLTZMANN_CONSTANT_SI = 1.380649e-23;
export const GRAVITATIONAL_CONSTANT_REFERENCE_SI = 6.674299995910528e-11;

export const PIXEL_REFERENCE = 1.63094;
export const SCREEN_CAPACITY_REFERENCE_LOG10 = 122;
export const PIXEL_UI_MIN = 0.8;
export const PIXEL_UI_MAX = 3.2;
export const SCREEN_CAPACITY_UI_MIN = 112;
export const SCREEN_CAPACITY_UI_MAX = 132;
export const ALPHA_U_REFERENCE = 0.04112;
export const LAMBDA_REFERENCE_M2 = 1.09e-52;
export const EPSILON_Z6 = 1 / 6;
export const THOMSON_ALPHA_INV_REFERENCE = 137.035999177;
const QUARK_P_DRIVEN_RHO_REFERENCE = 1.2942849363777058;
const QUARK_P_DRIVEN_X2_REFERENCE = -0.5175863354681689;
const QUARK_P_DRIVEN_SIGMA_U_REFERENCE = 5.573928426395543;
const QUARK_P_DRIVEN_SIGMA_D_REFERENCE = 3.296264198808688;
const QUARK_P_DRIVEN_ALPHA_U_REFERENCE = 0.04112498041477454;
const QUARK_P_DRIVEN_ALPHA_EXPONENT_UP = 0.42519503064369524;
const QUARK_P_DRIVEN_ALPHA_EXPONENT_DOWN = -0.5160176801329136;
const QUARK_P_DRIVEN_UP_ANCHORS = [
    { id: 'up', label: 'up', massGeV: 0.00216 },
    { id: 'charm', label: 'charm', massGeV: 1.273 },
    { id: 'top', label: 'top', massGeV: 172.3523553288311 },
] as const;
const QUARK_P_DRIVEN_DOWN_ANCHORS = [
    { id: 'down', label: 'down', massGeV: 0.0047 },
    { id: 'strange', label: 'strange', massGeV: 0.0935 },
    { id: 'bottom', label: 'bottom', massGeV: 4.183 },
] as const;

export const BETA_COEFFICIENTS_MSSM_LIKE: [number, number, number] = [33 / 5, 1, -3];
export const BETA_COEFFICIENTS_SM_1LOOP: [number, number, number] = [41 / 10, -19 / 6, -7];

type HeatKernelRepresentation = {
    dimension: number;
    casimir: number;
};

type ElectroweakPoint = {
    muStarGeV: number;
    vGeV: number;
    alpha1: number;
    alpha2: number;
    alpha3: number;
    alphaEm: number;
    sin2ThetaW: number;
    mWGeV: number;
    mZGeV: number;
};

type AlphaSample = {
    alphaU: number;
    electroweak: ElectroweakPoint;
    entropySU2: number;
    entropySU3: number;
    residual: number;
};

export type GaugeClosureOptions = {
    betaCoefficients?: [number, number, number];
    su2MaxJ?: number;
    su3MaxIndex?: number;
    alphaRange?: {
        min: number;
        max: number;
        step: number;
    };
};

export type GaugeClosureResult = {
    pixelConstant: number;
    betaCoefficients: [number, number, number];
    su2MaxJ: number;
    su3MaxIndex: number;
    alphaU: number;
    alphaInvU: number;
    unificationScaleGeV: number;
    eCellGeV: number;
    muStarGeV: number;
    vGeV: number;
    alpha1: number;
    alpha2: number;
    alpha3: number;
    alphaEm: number;
    sin2ThetaW: number;
    mWGeV: number;
    mZGeV: number;
    entropySU2: number;
    entropySU3: number;
    entropyTotal: number;
    entropyTarget: number;
    pixelResidual: number;
};

export type TargetFreeElectroweakRepairResult = {
    alphaY: number;
    betaEW: number;
    etaSource: number;
    lambdaEW: number;
    tau2TreeExact: number;
    deltaNTreeExact: number;
    alpha2Prime: number;
    alphaYPrime: number;
    transportAlphaEmInv: number;
    transportSin2ThetaW: number;
    mWGeV: number;
    mZGeV: number;
    vGeV: number;
};

export type HiggsTopForwardSeedResult = {
    betaEW: number;
    etaSource: number;
    lambdaEW: number;
    tau2TreeExact: number;
    rhoHT: number;
    piY: number;
    piLambda: number;
    topResidual: number;
    higgsResidual: number;
    deltaYtMt: number;
    deltaLambdaMt: number;
    mHGeV: number;
    mtPoleGeV: number;
};

export type TextureMassPrediction = {
    id: string;
    label: string;
    sector: 'up' | 'down' | 'lepton';
    exponent: number;
    coefficient: number;
    massGeV: number;
};

export type TextureMassOptions = {
    coefficientScale?: number;
    upExponentShift?: number;
    downExponentShift?: number;
    leptonExponentShift?: number;
};

export type PDrivenQuarkMassPrediction = {
    id: string;
    label: string;
    sector: 'up' | 'down';
    massGeV: number;
    baselineMassGeV: number;
};

export type NeutrinoMassPrediction = {
    mNu1Ev: number;
    mNu2Ev: number;
    mNu3Ev: number;
};

export type HadronMassEstimate = {
    label: string;
    coefficient: number;
    massGeV: number;
};

const representationCache = new Map<string, HeatKernelRepresentation[]>();

const TEXTURE_BLUEPRINTS: Array<Omit<TextureMassPrediction, 'massGeV'>> = [
    { id: 'top', label: 'top', sector: 'up', exponent: 0, coefficient: 0.98 },
    { id: 'charm', label: 'charm', sector: 'up', exponent: 3, coefficient: 1.6 },
    { id: 'up', label: 'up', sector: 'up', exponent: 6, coefficient: 1.0 },
    { id: 'bottom', label: 'bottom', sector: 'down', exponent: 2, coefficient: 1.0 },
    { id: 'strange', label: 'strange', sector: 'down', exponent: 4, coefficient: 1.0 },
    { id: 'down', label: 'down', sector: 'down', exponent: 6, coefficient: 1.0 },
    { id: 'tau', label: 'tau', sector: 'lepton', exponent: 3, coefficient: 2.2 },
    { id: 'muon', label: 'muon', sector: 'lepton', exponent: 4, coefficient: 0.785 },
    { id: 'electron', label: 'electron', sector: 'lepton', exponent: 7, coefficient: 0.82 },
];

const HADRON_COEFFICIENTS: Array<{ label: string; coefficient: number }> = [
    { label: 'pion', coefficient: 0.70 },
    { label: 'kaon', coefficient: 1.80 },
    { label: 'proton', coefficient: 4.68 },
    { label: 'neutron', coefficient: 4.72 },
];

function buildSu2Representations(maxJ: number): HeatKernelRepresentation[] {
    const reps: HeatKernelRepresentation[] = [];
    for (let step = 0; step <= maxJ * 2; step += 1) {
        const j = step / 2;
        reps.push({
            dimension: 2 * j + 1,
            casimir: j * (j + 1),
        });
    }
    return reps;
}

function buildSu3Representations(maxIndex: number): HeatKernelRepresentation[] {
    const reps: HeatKernelRepresentation[] = [];
    for (let p = 0; p <= maxIndex; p += 1) {
        for (let q = 0; q <= maxIndex; q += 1) {
            const dimension = ((p + 1) * (q + 1) * (p + q + 2)) / 2;
            const casimir = (p * p + q * q + p * q + 3 * p + 3 * q) / 3;
            reps.push({ dimension, casimir });
        }
    }
    return reps;
}

function getSu2Representations(maxJ: number): HeatKernelRepresentation[] {
    const key = `su2-${maxJ}`;
    const cached = representationCache.get(key);
    if (cached) {
        return cached;
    }
    const reps = buildSu2Representations(maxJ);
    representationCache.set(key, reps);
    return reps;
}

function getSu3Representations(maxIndex: number): HeatKernelRepresentation[] {
    const key = `su3-${maxIndex}`;
    const cached = representationCache.get(key);
    if (cached) {
        return cached;
    }
    const reps = buildSu3Representations(maxIndex);
    representationCache.set(key, reps);
    return reps;
}

function weightedEntropy(representations: HeatKernelRepresentation[], t: number): number {
    const weights = representations.map(rep => rep.dimension * Math.exp(-t * rep.casimir));
    const partition = weights.reduce((acc, value) => acc + value, 0);
    if (!Number.isFinite(partition) || partition <= 0) {
        return Number.NaN;
    }

    let entropy = 0;
    for (let idx = 0; idx < representations.length; idx += 1) {
        const probability = weights[idx] / partition;
        if (probability > 0) {
            entropy += probability * Math.log(representations[idx].dimension);
        }
    }

    return entropy;
}

function runCoupling(alphaU: number, betaCoefficient: number, mu0GeV: number, muGeV: number): number | null {
    if (alphaU <= 0 || mu0GeV <= 0 || muGeV <= 0) {
        return null;
    }
    const inverse = (1 / alphaU) + (betaCoefficient / (2 * Math.PI)) * Math.log(mu0GeV / muGeV);
    if (!Number.isFinite(inverse) || inverse <= 0) {
        return null;
    }
    return 1 / inverse;
}

function solveElectroweakFixedPoint(
    alphaU: number,
    mu0GeV: number,
    eCellGeV: number,
    betaCoefficients: [number, number, number]
): ElectroweakPoint | null {
    if (alphaU <= 0 || mu0GeV <= 0 || eCellGeV <= 0) {
        return null;
    }

    const vGeV = eCellGeV * Math.exp(-2 * Math.PI / (BETA_EW * alphaU));
    if (!Number.isFinite(vGeV) || vGeV <= 0) {
        return null;
    }

    let muStarGeV = MZ_REFERENCE_GEV;
    for (let iteration = 0; iteration < 48; iteration += 1) {
        const alpha1Trial = runCoupling(alphaU, betaCoefficients[0], mu0GeV, muStarGeV);
        const alpha2Trial = runCoupling(alphaU, betaCoefficients[1], mu0GeV, muStarGeV);
        if (alpha1Trial === null || alpha2Trial === null) {
            return null;
        }

        const g2Squared = 4 * Math.PI * alpha2Trial;
        const gYSquared = 4 * Math.PI * (3 / 5) * alpha1Trial;
        const trialMZ = 0.5 * vGeV * Math.sqrt(g2Squared + gYSquared);
        if (!Number.isFinite(trialMZ) || trialMZ <= 0) {
            return null;
        }

        const updatedMu = 0.6 * muStarGeV + 0.4 * trialMZ;
        if (Math.abs(updatedMu - muStarGeV) < 1e-9) {
            muStarGeV = updatedMu;
            break;
        }
        muStarGeV = updatedMu;
    }

    const alpha1 = runCoupling(alphaU, betaCoefficients[0], mu0GeV, muStarGeV);
    const alpha2 = runCoupling(alphaU, betaCoefficients[1], mu0GeV, muStarGeV);
    const alpha3 = runCoupling(alphaU, betaCoefficients[2], mu0GeV, muStarGeV);
    if (alpha1 === null || alpha2 === null || alpha3 === null) {
        return null;
    }

    const g2Squared = 4 * Math.PI * alpha2;
    const gYSquared = 4 * Math.PI * (3 / 5) * alpha1;
    const mZGeV = 0.5 * vGeV * Math.sqrt(g2Squared + gYSquared);
    const mWGeV = 0.5 * vGeV * Math.sqrt(g2Squared);
    const alphaEm = 1 / ((1 / alpha2) + (1 / ((3 / 5) * alpha1)));
    const sin2ThetaW = alphaEm / alpha2;

    return {
        muStarGeV,
        vGeV,
        alpha1,
        alpha2,
        alpha3,
        alphaEm,
        sin2ThetaW,
        mWGeV,
        mZGeV,
    };
}

function evaluateAlpha(
    alphaU: number,
    pixelConstant: number,
    unificationScaleGeV: number,
    eCellGeV: number,
    betaCoefficients: [number, number, number],
    su2Representations: HeatKernelRepresentation[],
    su3Representations: HeatKernelRepresentation[]
): AlphaSample | null {
    const electroweak = solveElectroweakFixedPoint(alphaU, unificationScaleGeV, eCellGeV, betaCoefficients);
    if (electroweak === null) {
        return null;
    }

    const t2 = 4 * Math.PI * Math.PI * electroweak.alpha2;
    const t3 = 4 * Math.PI * Math.PI * electroweak.alpha3;
    const entropySU2 = weightedEntropy(su2Representations, t2);
    const entropySU3 = weightedEntropy(su3Representations, t3);
    if (!Number.isFinite(entropySU2) || !Number.isFinite(entropySU3)) {
        return null;
    }

    return {
        alphaU,
        electroweak,
        entropySU2,
        entropySU3,
        residual: entropySU2 + entropySU3 - pixelConstant / 4,
    };
}

export function unificationScaleFromPixel(pixelConstant: number): number {
    return (E_PLANCK_GEV / Math.exp(2 * Math.PI)) * Math.pow(pixelConstant, 1 / 6);
}

// Paper reference:
// reverse-engineering-reality/paper/recovering_relativity_and_standard_model_structure_from_observer_overlap_consistency_compact.tex
// Gauge reconstruction / local unification discussion and the README local unification summary.
// This solver keeps the published OPH closure structure used across the lab:
// unification scale M_U(P), local cell energy E_cell(P), one-loop edge running,
// and the entropy lock ellbar_SU(2) + ellbar_SU(3) = P / 4.
export function solveGaugeClosure(pixelConstant: number, options?: GaugeClosureOptions): GaugeClosureResult {
    const clampedPixel = Math.max(PIXEL_UI_MIN, pixelConstant);
    const betaCoefficients = options?.betaCoefficients ?? BETA_COEFFICIENTS_MSSM_LIKE;
    const su2MaxJ = Math.max(8, Math.min(80, options?.su2MaxJ ?? 30));
    const su3MaxIndex = Math.max(4, Math.min(24, options?.su3MaxIndex ?? 14));
    const alphaMin = options?.alphaRange?.min ?? 0.015;
    const alphaMax = options?.alphaRange?.max ?? 0.09;
    const alphaStep = options?.alphaRange?.step ?? 0.0005;

    const su2Reps = getSu2Representations(su2MaxJ);
    const su3Reps = getSu3Representations(su3MaxIndex);

    const unificationScaleGeV = unificationScaleFromPixel(clampedPixel);
    const eCellGeV = E_PLANCK_GEV / Math.sqrt(clampedPixel);

    let previous: AlphaSample | null = null;
    let bracketLow: AlphaSample | null = null;
    let bracketHigh: AlphaSample | null = null;
    let best: AlphaSample | null = null;

    for (let alpha = alphaMin; alpha <= alphaMax + 1e-12; alpha += alphaStep) {
        const sample = evaluateAlpha(
            alpha,
            clampedPixel,
            unificationScaleGeV,
            eCellGeV,
            betaCoefficients,
            su2Reps,
            su3Reps
        );
        if (sample === null) {
            continue;
        }

        if (best === null || Math.abs(sample.residual) < Math.abs(best.residual)) {
            best = sample;
        }

        if (
            previous !== null &&
            ((previous.residual <= 0 && sample.residual >= 0) || (previous.residual >= 0 && sample.residual <= 0))
        ) {
            bracketLow = previous;
            bracketHigh = sample;
            break;
        }

        previous = sample;
    }

    if (bracketLow !== null && bracketHigh !== null) {
        let low = bracketLow;
        let high = bracketHigh;
        for (let iteration = 0; iteration < 64; iteration += 1) {
            const midAlpha = 0.5 * (low.alphaU + high.alphaU);
            const mid = evaluateAlpha(
                midAlpha,
                clampedPixel,
                unificationScaleGeV,
                eCellGeV,
                betaCoefficients,
                su2Reps,
                su3Reps
            );
            if (mid === null) {
                break;
            }

            if (Math.abs(mid.residual) < 1e-10) {
                best = mid;
                break;
            }

            if ((low.residual <= 0 && mid.residual >= 0) || (low.residual >= 0 && mid.residual <= 0)) {
                high = mid;
            } else {
                low = mid;
            }

            best = Math.abs(low.residual) < Math.abs(high.residual) ? low : high;
        }
    }

    const solution =
        best ??
        evaluateAlpha(
            ALPHA_U_REFERENCE,
            clampedPixel,
            unificationScaleGeV,
            eCellGeV,
            betaCoefficients,
            su2Reps,
            su3Reps
        ) ??
        evaluateAlpha(0.04, clampedPixel, unificationScaleGeV, eCellGeV, betaCoefficients, su2Reps, su3Reps);

    if (solution === null) {
        return {
            pixelConstant: clampedPixel,
            betaCoefficients,
            su2MaxJ,
            su3MaxIndex,
            alphaU: ALPHA_U_REFERENCE,
            alphaInvU: 1 / ALPHA_U_REFERENCE,
            unificationScaleGeV,
            eCellGeV,
            muStarGeV: Number.NaN,
            vGeV: Number.NaN,
            alpha1: Number.NaN,
            alpha2: Number.NaN,
            alpha3: Number.NaN,
            alphaEm: Number.NaN,
            sin2ThetaW: Number.NaN,
            mWGeV: Number.NaN,
            mZGeV: Number.NaN,
            entropySU2: Number.NaN,
            entropySU3: Number.NaN,
            entropyTotal: Number.NaN,
            entropyTarget: clampedPixel / 4,
            pixelResidual: Number.NaN,
        };
    }

    return {
        pixelConstant: clampedPixel,
        betaCoefficients,
        su2MaxJ,
        su3MaxIndex,
        alphaU: solution.alphaU,
        alphaInvU: 1 / solution.alphaU,
        unificationScaleGeV,
        eCellGeV,
        muStarGeV: solution.electroweak.muStarGeV,
        vGeV: solution.electroweak.vGeV,
        alpha1: solution.electroweak.alpha1,
        alpha2: solution.electroweak.alpha2,
        alpha3: solution.electroweak.alpha3,
        alphaEm: solution.electroweak.alphaEm,
        sin2ThetaW: solution.electroweak.sin2ThetaW,
        mWGeV: solution.electroweak.mWGeV,
        mZGeV: solution.electroweak.mZGeV,
        entropySU2: solution.entropySU2,
        entropySU3: solution.entropySU3,
        entropyTotal: solution.entropySU2 + solution.entropySU3,
        entropyTarget: clampedPixel / 4,
        pixelResidual: solution.residual,
    };
}

// Paper reference:
// reverse-engineering-reality/paper/deriving_the_particle_zoo_from_observer_consistency.tex
// Target-free source-only electroweak repair surface, including the transported
// weak and hypercharge pair, the W/Z rows, and the electromagnetic source anchor.
//
// The public W/Z rows come from the transported pair (alpha_2', alpha_Y').
// The Thomson endpoint alpha^-1(0) row uses the Ward-projected source anchor
// a_0(P) read from the unprimed electroweak family and is computed separately
// below.
export function deriveTargetFreeElectroweakRepair(
    closure: Pick<GaugeClosureResult, 'alphaU' | 'alpha1' | 'alpha2' | 'vGeV'>
): TargetFreeElectroweakRepairResult {
    const alphaY = (3 / 5) * closure.alpha1;
    const alpha2 = closure.alpha2;
    const alphaSum = alpha2 + alphaY;
    const betaEW = alphaSum > 0 ? (alpha2 - alphaY) / alphaSum : Number.NaN;
    const etaSource = closure.alphaU * betaEW;
    const lambdaEW = (etaSource * etaSource) / (4 * betaEW);
    const tau2TreeExact =
        -lambdaEW *
        (1 + (2 / 3) * etaSource + (1 - betaEW / 6) * etaSource * etaSource);
    const deltaNTreeExact =
        lambdaEW *
        (1 + (4 / 3) * etaSource + (2 - betaEW / 6) * etaSource * etaSource);
    const deltaAlpha2 = alpha2 * tau2TreeExact;
    const deltaAlphaYParallel =
        (alphaY * (8 * etaSource * tau2TreeExact * tau2TreeExact - tau2TreeExact)) /
        (1 + 4 * tau2TreeExact * tau2TreeExact);
    const deltaAlphaYPerp = alphaSum * deltaNTreeExact;
    const alpha2Prime = alpha2 + deltaAlpha2;
    const alphaYPrime = alphaY * (1 - 2 * etaSource) + deltaAlphaYParallel + deltaAlphaYPerp;
    const alphaSumPrime = alpha2Prime + alphaYPrime;

    return {
        alphaY,
        betaEW,
        etaSource,
        lambdaEW,
        tau2TreeExact,
        deltaNTreeExact,
        alpha2Prime,
        alphaYPrime,
        transportAlphaEmInv: alphaSumPrime / (alphaYPrime * alpha2Prime),
        transportSin2ThetaW: alphaYPrime / alphaSumPrime,
        mWGeV: closure.vGeV * Math.sqrt(Math.PI * alpha2Prime),
        mZGeV: closure.vGeV * Math.sqrt(Math.PI * alphaSumPrime),
        vGeV: closure.vGeV,
    };
}

// Paper reference:
// reverse-engineering-reality/paper/deriving_the_particle_zoo_from_observer_consistency.tex
// Higgs/top critical-stage equations for rho_HT, R_T, R_H, pi_y, pi_lambda,
// delta y_t(mu_t), and delta lambda(mu_t), around lines 1574-1608.
export function deriveD11ForwardSeed(
    repair: Pick<TargetFreeElectroweakRepairResult, 'betaEW' | 'etaSource' | 'lambdaEW' | 'tau2TreeExact'>
): HiggsTopForwardSeedResult {
    const rhoHT = Math.log(1 + repair.tau2TreeExact);
    const topResidual =
        -repair.tau2TreeExact * repair.etaSource * repair.etaSource +
        (1 + repair.betaEW / D11_LIVE_ALPHA_T_RESIDUAL_DIVISOR) * Math.pow(repair.etaSource, 6) +
        Math.pow(repair.etaSource, 8) / D11_LIVE_ALPHA_T_ETA8_DIVISOR +
        Math.pow(repair.etaSource, 9) / D11_LIVE_ALPHA_T_ETA9_DIVISOR;
    const higgsResidual =
        Math.pow(repair.etaSource, 5) -
        (D11_LIVE_ALPHA_H_ETA6_NUMERATOR / D11_LIVE_ALPHA_H_ETA6_DIVISOR) * Math.pow(repair.etaSource, 6) +
        (repair.lambdaEW * Math.pow(repair.etaSource, 6)) / D11_LIVE_ALPHA_H_LAMBDA_DIVISOR +
        Math.pow(repair.etaSource, 8) / (2 * repair.betaEW);
    const piY =
        (repair.etaSource + (3 / 2 + repair.betaEW / 4) * rhoHT + topResidual) / Math.sqrt(Math.PI);
    const piLambda =
        (repair.etaSource - (4 / 3 - repair.betaEW / 54) * rhoHT + higgsResidual) / Math.sqrt(Math.PI);
    const deltaYtMt = piY * D11_Y_T_CORE_MT;
    const deltaLambdaMt = -(16 / 9) * piLambda * D11_LAMBDA_CORE_MT;

    return {
        betaEW: repair.betaEW,
        etaSource: repair.etaSource,
        lambdaEW: repair.lambdaEW,
        tau2TreeExact: repair.tau2TreeExact,
        rhoHT,
        piY,
        piLambda,
        topResidual,
        higgsResidual,
        deltaYtMt,
        deltaLambdaMt,
        mHGeV: D11_MH_CORE_GEV + D11_D_MH_D_LAMBDA * deltaLambdaMt,
        mtPoleGeV: D11_MT_POLE_CORE_GEV + D11_D_MT_POLE_D_Y_T * deltaYtMt,
    };
}

// Paper reference:
// reverse-engineering-reality/README.md, "Local Unification Surface".
// The SI readout is G_SI = c^3 a_cell / (hbar P) at fixed microscopic a_cell.
// Holding a_cell fixed gives the normalized lab form G(P) = G_ref * P_ref / P.
export function newtonConstantFromPixel(pixelConstant: number): number {
    return GRAVITATIONAL_CONSTANT_REFERENCE_SI * (PIXEL_REFERENCE / Math.max(pixelConstant, 0.2));
}

// Paper reference:
// reverse-engineering-reality/paper/recovering_relativity_and_standard_model_structure_from_observer_overlap_consistency_compact.tex
// Corollary "Cosmological Constant from Capacity":
// Lambda = 3 pi / (G N_scr), with N_scr = log dim H_tot on the de Sitter branch.
// Combining that relation with the fixed-a_cell gravity readout gives the normalized
// lab form Lambda(P, N_scr) = Lambda_ref * (P / P_ref) * 10^(122 - log10 N_scr).
export function lambdaFromScreen(pixelConstant: number, logCapacityBase10: number): number {
    const pixelScale = Math.max(pixelConstant, 0.2) / PIXEL_REFERENCE;
    const capacityScale = Math.pow(10, SCREEN_CAPACITY_REFERENCE_LOG10 - logCapacityBase10);
    return LAMBDA_REFERENCE_M2 * pixelScale * capacityScale;
}

export function hubbleFromLambda(lambdaM2: number): number {
    if (!Number.isFinite(lambdaM2) || lambdaM2 <= 0) {
        return Number.NaN;
    }
    return LIGHT_SPEED_SI * Math.sqrt(lambdaM2 / 3);
}

export function deSitterRadiusFromLambda(lambdaM2: number): number {
    if (!Number.isFinite(lambdaM2) || lambdaM2 <= 0) {
        return Number.NaN;
    }
    return Math.sqrt(3 / lambdaM2);
}

export function gibbonsHawkingTemperatureFromHubble(hubblePerSecond: number): number {
    if (!Number.isFinite(hubblePerSecond) || hubblePerSecond <= 0) {
        return Number.NaN;
    }
    return (PLANCK_REDUCED_CONSTANT_SI * hubblePerSecond) / (2 * Math.PI * BOLTZMANN_CONSTANT_SI);
}

export function mondAccelerationFromLambda(lambdaM2: number): number {
    if (!Number.isFinite(lambdaM2) || lambdaM2 <= 0) {
        return Number.NaN;
    }
    return (15 / (8 * Math.PI * Math.PI)) * LIGHT_SPEED_SI * LIGHT_SPEED_SI * Math.sqrt(lambdaM2 / 3);
}

// Paper reference:
// reverse-engineering-reality/paper/deriving_the_particle_zoo_from_observer_consistency.tex
// Ward-projected electromagnetic transport law. The source anchor is
// a_0(P) = alpha_em^-1(m_Z^2; P),
// and the Thomson endpoint is alpha_Th^-1(P) = a_0(P) * t_Q(m_Z^2; P) / t_Q(0; P).
// D10_THOMSON_FACTOR is the canonical Ward-projected transport ratio
// t_Q(m_Z^2) / t_Q(0) emitted on that public electroweak surface.
export function thomsonEndpointAlphaInverse(anchorAlphaInverse: number): number {
    if (!Number.isFinite(anchorAlphaInverse) || anchorAlphaInverse <= 0) {
        return Number.NaN;
    }
    return anchorAlphaInverse * D10_THOMSON_FACTOR;
}

export function textureMassesFromVev(vGeV: number, options?: TextureMassOptions): TextureMassPrediction[] {
    const coefficientScale = options?.coefficientScale ?? 1;
    const upExponentShift = options?.upExponentShift ?? 0;
    const downExponentShift = options?.downExponentShift ?? 0;
    const leptonExponentShift = options?.leptonExponentShift ?? 0;
    const baseScale = vGeV / Math.sqrt(2);

    return TEXTURE_BLUEPRINTS.map(blueprint => {
        const exponentShift =
            blueprint.sector === 'up' ? upExponentShift :
            blueprint.sector === 'down' ? downExponentShift :
            leptonExponentShift;
        const exponent = Math.max(0, blueprint.exponent + exponentShift);
        const suppression = Math.pow(EPSILON_Z6, exponent);
        return {
            ...blueprint,
            exponent,
            coefficient: blueprint.coefficient * coefficientScale,
            massGeV: blueprint.coefficient * coefficientScale * baseScale * suppression,
        };
    });
}

function quarkCandidateSectorMeans(rhoOrd: number, x2: number, sigmaU: number, sigmaD: number) {
    const sigmaSeed = 0.5 * (sigmaU + sigmaD);
    const eta = 0.5 * (sigmaU - sigmaD);
    const meanDenominator = 1 + rhoOrd - x2 * x2;
    const skewDenominator = 1 - x2 * x2 - (x2 * x2) / (1 + rhoOrd);
    const aUd = 1 / (2 * meanDenominator);
    const bUd = 1 / (2 * skewDenominator);
    return {
        logShiftU: -(aUd * sigmaSeed - bUd * eta),
        logShiftD: -(aUd * sigmaSeed + bUd * eta),
    };
}

// Paper reference:
// reverse-engineering-reality/paper/deriving_the_particle_zoo_from_observer_consistency.tex
//
// Browser boundary for the moving quark rows:
// - The public anchor at P = 1.63094 is the exact quark sextet emitted by the
//   particle codebase on the physical quark frame fixed by P.
// - Away from that anchor, the browser uses a reduced candidate surface that
//   carries the affine sector means and centered log package.
// - The full off-canonical transport shell is not ported into the browser.
//   That missing shell affects only the moving off-anchor lane. It does not
//   alter the exact anchor values displayed for our Universe.
function quarkCandidateEvenLogs(rhoOrd: number, sigmaU: number, sigmaD: number) {
    const denominator = 3 * (1 + rhoOrd);
    const vU = [
        -((2 * rhoOrd) + 1) / denominator,
        (rhoOrd - 1) / denominator,
        (rhoOrd + 2) / denominator,
    ];
    const vD = [
        -(rhoOrd + 2) / denominator,
        (1 - rhoOrd) / denominator,
        ((2 * rhoOrd) + 1) / denominator,
    ];
    return {
        eULog: vU.map((value) => sigmaU * value),
        eDLog: vD.map((value) => sigmaD * value),
    };
}

export function pDrivenQuarkMassesFromClosure(
    closure: Pick<GaugeClosureResult, 'alphaU'>
): PDrivenQuarkMassPrediction[] {
    // The browser quark surface combines two pieces:
    // exact public masses at the anchor point and reduced candidate motion away
    // from that point. The full transport shell is separate from this browser
    // evaluator.
    const alphaRatio = Math.max(closure.alphaU, 1.0e-12) / QUARK_P_DRIVEN_ALPHA_U_REFERENCE;
    const sigmaU = QUARK_P_DRIVEN_SIGMA_U_REFERENCE * Math.pow(alphaRatio, QUARK_P_DRIVEN_ALPHA_EXPONENT_UP);
    const sigmaD = QUARK_P_DRIVEN_SIGMA_D_REFERENCE * Math.pow(alphaRatio, QUARK_P_DRIVEN_ALPHA_EXPONENT_DOWN);

    const baselineMeans = quarkCandidateSectorMeans(
        QUARK_P_DRIVEN_RHO_REFERENCE,
        QUARK_P_DRIVEN_X2_REFERENCE,
        QUARK_P_DRIVEN_SIGMA_U_REFERENCE,
        QUARK_P_DRIVEN_SIGMA_D_REFERENCE
    );
    const baselineLogs = quarkCandidateEvenLogs(
        QUARK_P_DRIVEN_RHO_REFERENCE,
        QUARK_P_DRIVEN_SIGMA_U_REFERENCE,
        QUARK_P_DRIVEN_SIGMA_D_REFERENCE
    );
    const currentMeans = quarkCandidateSectorMeans(
        QUARK_P_DRIVEN_RHO_REFERENCE,
        QUARK_P_DRIVEN_X2_REFERENCE,
        sigmaU,
        sigmaD
    );
    const currentLogs = quarkCandidateEvenLogs(
        QUARK_P_DRIVEN_RHO_REFERENCE,
        sigmaU,
        sigmaD
    );

    return [
        ...QUARK_P_DRIVEN_UP_ANCHORS.map((anchor, index) => ({
            id: anchor.id,
            label: anchor.label,
            sector: 'up' as const,
            baselineMassGeV: anchor.massGeV,
            massGeV:
                anchor.massGeV *
                Math.exp(
                    (currentMeans.logShiftU - baselineMeans.logShiftU) +
                    (currentLogs.eULog[index] - baselineLogs.eULog[index])
                ),
        })),
        ...QUARK_P_DRIVEN_DOWN_ANCHORS.map((anchor, index) => ({
            id: anchor.id,
            label: anchor.label,
            sector: 'down' as const,
            baselineMassGeV: anchor.massGeV,
            massGeV:
                anchor.massGeV *
                Math.exp(
                    (currentMeans.logShiftD - baselineMeans.logShiftD) +
                    (currentLogs.eDLog[index] - baselineLogs.eDLog[index])
                ),
        })),
    ];
}

export function neutrinoMassesFromScreen(logCapacityBase10: number, pixelConstant: number): NeutrinoMassPrediction {
    const lambda = lambdaFromScreen(pixelConstant, logCapacityBase10);
    const scale = Math.sqrt(lambda / LAMBDA_REFERENCE_M2);
    const mNu3Ev = 0.003 * scale;
    return {
        mNu3Ev,
        mNu2Ev: EPSILON_Z6 * mNu3Ev,
        mNu1Ev: EPSILON_Z6 * EPSILON_Z6 * mNu3Ev,
    };
}

export function estimateQcdScaleGeV(alphaStrongAtMu: number, muGeV: number, nFlavors = 5): number {
    if (alphaStrongAtMu <= 0 || muGeV <= 0) {
        return Number.NaN;
    }
    const b0 = 11 - (2 * nFlavors) / 3;
    if (b0 <= 0) {
        return Number.NaN;
    }
    return muGeV * Math.exp(-2 * Math.PI / (b0 * alphaStrongAtMu));
}

export function estimateHadronMassesFromQcdScale(lambdaQcdGeV: number): HadronMassEstimate[] {
    return HADRON_COEFFICIENTS.map(item => ({
        label: item.label,
        coefficient: item.coefficient,
        massGeV: item.coefficient * lambdaQcdGeV,
    }));
}

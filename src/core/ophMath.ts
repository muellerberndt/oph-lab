const E_PLANCK_GEV = 1.22089e19;
const LIGHT_SPEED = 2.99792458e8;
const BETA_EW = 4;
const MZ_REFERENCE_GEV = 91.1876;
const D11_KAPPA_HT = 16 / 9;
const D11_Y_T_CORE_MT = 0.92046435;
const D11_LAMBDA_CORE_MT = 0.13164915;
const D11_MT_POLE_CORE_GEV = 170.26125;
const D11_MH_CORE_GEV = 126.62263;
const D11_D_MT_POLE_D_Y_T = 184.97;
const D11_D_MH_D_LAMBDA = 480.0;

export const PIXEL_REFERENCE = 1.63094;
export const SCREEN_CAPACITY_REFERENCE_LOG10 = 122;
export const ALPHA_U_REFERENCE = 0.04112;
export const LAMBDA_REFERENCE_M2 = 1.09e-52;
export const EPSILON_Z6 = 1 / 6;

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
    alphaEmInv: number;
    sin2ThetaW: number;
    mWGeV: number;
    mZGeV: number;
    vGeV: number;
};

export type HiggsTopForwardSeedResult = {
    alphaY: number;
    cos2ThetaW0: number;
    sigmaD11HT: number;
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

export function solveGaugeClosure(pixelConstant: number, options?: GaugeClosureOptions): GaugeClosureResult {
    const clampedPixel = Math.max(0.8, pixelConstant);
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
        alphaEmInv: alphaSumPrime / (alphaYPrime * alpha2Prime),
        sin2ThetaW: alphaYPrime / alphaSumPrime,
        mWGeV: closure.vGeV * Math.sqrt(Math.PI * alpha2Prime),
        mZGeV: closure.vGeV * Math.sqrt(Math.PI * alphaSumPrime),
        vGeV: closure.vGeV,
    };
}

export function deriveD11ForwardSeed(
    closure: Pick<GaugeClosureResult, 'alphaU' | 'alpha1' | 'alpha2'>
): HiggsTopForwardSeedResult {
    const alphaY = (3 / 5) * closure.alpha1;
    const cos2ThetaW0 = (closure.alpha2 - alphaY) / (closure.alpha2 + alphaY);
    const sigmaD11HT = (closure.alphaU * cos2ThetaW0) / Math.sqrt(Math.PI);
    const deltaYtMt = sigmaD11HT * D11_Y_T_CORE_MT;
    const deltaLambdaMt = -D11_KAPPA_HT * sigmaD11HT * D11_LAMBDA_CORE_MT;

    return {
        alphaY,
        cos2ThetaW0,
        sigmaD11HT,
        deltaYtMt,
        deltaLambdaMt,
        mHGeV: D11_MH_CORE_GEV + D11_D_MH_D_LAMBDA * deltaLambdaMt,
        mtPoleGeV: D11_MT_POLE_CORE_GEV + D11_D_MT_POLE_D_Y_T * deltaYtMt,
    };
}

export function lambdaFromScreen(pixelConstant: number, logCapacityBase10: number): number {
    const pixelScale = PIXEL_REFERENCE / Math.max(pixelConstant, 0.2);
    const capacityScale = Math.pow(10, SCREEN_CAPACITY_REFERENCE_LOG10 - logCapacityBase10);
    return LAMBDA_REFERENCE_M2 * pixelScale * capacityScale;
}

export function hubbleFromLambda(lambdaM2: number): number {
    if (!Number.isFinite(lambdaM2) || lambdaM2 <= 0) {
        return Number.NaN;
    }
    return LIGHT_SPEED * Math.sqrt(lambdaM2 / 3);
}

export function deSitterRadiusFromLambda(lambdaM2: number): number {
    if (!Number.isFinite(lambdaM2) || lambdaM2 <= 0) {
        return Number.NaN;
    }
    return Math.sqrt(3 / lambdaM2);
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

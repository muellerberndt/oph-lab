import { Explainer } from '../components/Explainer';
import { MICROPHYSICS_HIGHLIGHTS } from '../content/paperSurface';

export function ScreenMicrophysicsPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation" style={{ color: 'var(--accent-purple)', borderColor: 'var(--accent-purple)' }}>Microphysics</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Screen Microphysics And Observer Synchronization</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This is the concrete implementation surface of OPH. The microphysics paper writes abstract patches
                and overlaps into one finite screen model with local registers, record qubits, repair instruments,
                and synchronization rules.
            </p>

            <div className="math-block" style={{ fontSize: '1em', marginBottom: '24px' }}>
                finite screen cellulation + gauge registers + record layer + repair dynamics =&gt; simulator-facing OPH architecture
            </div>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {MICROPHYSICS_HIGHLIGHTS.map((item, index) => (
                    <div key={item} className="card" style={{ borderLeft: `3px solid ${index < 2 ? 'var(--accent-purple)' : 'var(--accent-cyan)'}` }}>
                        <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{item}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Reference Architecture</h3>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-purple)' }}>Local screen registers</h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        A finite cellulation of S^2 carries local gauge registers on links. Selected vertices or coarse
                        cells also carry record registers so the same microscopic system can host both dynamics and
                        memory.
                    </p>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>Patch and overlap observables</h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        The patch algebra, overlap algebra, edge-sector observables, and mismatch syndromes are all
                        explicit finite-cutoff objects. This is what makes simulation and benchmarking possible.
                    </p>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>Observer synchronization</h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Synchronization is treated operationally. It is the question of how overlap data, records, and
                        repair schedules stay mutually consistent inside the shared microscopic system.
                    </p>
                </div>
            </div>

            <Explainer title="What is inside the paper">
                <p>
                    The paper packages measurement, stable records, checkpoint/restoration, and synchronization on a
                    finite screen architecture. It is a concrete part of the OPH suite.
                </p>
                <p>
                    This is also the natural simulator target for small digital and tensor-network tests of gauge
                    invariance, collar conditional mutual information, and repair stability.
                </p>
            </Explainer>

            <Explainer title="Claim Boundary">
                <p>
                    The paper gives a workable reference architecture and a theorem-ready fixed-cutoff surface.
                </p>
                <p>
                    The continuum gravity bridge lives on separate pages in the broader OPH branch structure.
                </p>
            </Explainer>
        </div>
    );
}

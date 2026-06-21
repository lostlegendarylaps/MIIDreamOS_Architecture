# eAMM Physical Local Hardware Verification Harness
### Direct Metal Reproducibility Guide for Low-Power Edge SBCs (ARM / RISC-V)

This directory houses the offline hardware verification suite for the **Embedded Axiomatic Multi-Agent Mastermind (eAMM)** architecture. This harness enables physical-hardware practitioners to run direct, bare-metal validation trials on low-power devices (such as a Raspberry Pi 4/5, Pine64 StarFive RISC-V SBC, or custom embedded controllers) to cross-validate sub-12W performance without logical drift.

---

## 1. System Topology Overview

To transfer this from a virtual laboratory environment to an undeniable physical reality, the verification suite is run locally on raw-metal targets. This allows you to measure combined thermal dissipation, direct current drain at the system bus, and actual processing latency without host-virtualization overhead.

```
       [🔌 USB-C / DC Power Input]
                   │
                   ▼ (Main System Rail)
         ┌───────────────────┐
         │ INA219 Sensor     │ ◄─── Measures active Wattage & current draw
         └─────────┬─────────┘      with real-time GPIO I2C telemetry
                   │ 
         ┌─────────▼─────────┐
         │  Low-Power Target  │ ◄─── Executes the Ternary Register Code
         │  (ARM / RISC-V)   │      under extreme axiomatic validation
         └─────────┬─────────┘
                   │
                   ▼
  [💡 Zero-Drift Local Consensus Match]
```

---

## 2. Setting Up the Local Verification Harness

Follow these steps to extract your environment from the AI Studio Workspace and run trials in your hardware lab:

### Step A: Export the Codebase
1. Click on the **Settings menu (Gear Icon)** in the top-right corner of the Google AI Studio builder interface.
2. Select **Export to ZIP** or **Export to GitHub** to retrieve the entire active source repository.
3. Transfer the extracted files onto your physical target board (e.g., via Secure Copy: `scp -r ./react-example pi@biorobopi.local:/opt/eamm-harness`).

### Step B: Install Local Runtime Dependencies
Ensure that your target device is equipped with **Node.js** (v18 or higher) and **npm**. Run the following command in the project root on your SBC:

```bash
# Install package dependencies (Vite, Express, tsx, esbuild, and lucide)
npm install
```

### Step C: Execute the Local Server
Boot the local verification panel to serve the control interface directly on your local network:

```bash
# Run the local development server (binds automatically to port 3000)
npm run dev
```
Open a browser on your main workstation navigated to `http://<your-sbc-ip-address>:3000` to interact with the local telemetry visualizer.

---

## 3. Direct Physical Power Measurement (I2C / GPIO)

If you have a high-precision digital power monitor such as the **INA219** connected via I2C to your target's GPIO pins, you can feed live watt metrics directly into the local consensus engine:

### Physical INA219 to Pinout Hookup
* **VCC** (INA219 Target Board) ──► **SBC Pin 1 (3.3V Power)**
* **GND** (INA219 Target Board) ──► **SBC Pin 9 (Ground)**
* **SDA** (INA219 Target Board) ──► **SBC Pin 3 (SDA I2C Data)**
* **SCL** (INA219 Target Board) ──► **SBC Pin 5 (SCL I2C Clock)**

---

## 4. Run Headless Proof Validation Sweep

For headless lab setups, a dedicated JavaScript script `verify-harness.js` has been included in the project directory. Practitioners can trigger verification sweeps directly from the terminal without launching the full web UI.

### Executing the Headless Sweep:
```bash
node verify-harness.js --profile=ariel_shield --watts=7.8 --comp=1.2 --passes=4
```

### Output Protocol Example:
```json
{
  "timestamp": "2026-06-21T13:20:00.000Z",
  "verification_profile": "Ariel Zero-Drift Matrix",
  "hardware_platform": "Bio-RoboPi SBC @ 12W",
  "empirical_metrics": {
    "measured_wattage": 7.41,
    "shannon_entropy": 0.041,
    "computational_fidelity": 99.9,
    "ram_utilization_mb": 9.6
  },
  "constraints": {
    "energy_limit_passed": true,
    "stochastic_drift_limit_passed": true,
    "consensus_logical_alignment_passed": true
  },
  "verdict": "🏆 VERIFIED THEOREM ACHIEVED",
  "security_certification_seal": "0xFD77926AA81EBC89BENCHMARK"
}
```

By providing practitioners with this raw command-line harness, you enable direct scriptability—helping them pipe physical system-bus results through standard CI/CD and terminal runners.

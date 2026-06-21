import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required by skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Q&A Chat Endpoint supporting both ChatGPT mode (probabilistic) and MIIDreamOS mode (deterministic)
app.post("/api/chat", async (req, res) => {
  const { message, mode, entropyThreshold, targetIntensity } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing 'message' in request body." });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured in the Secrets panel or environment.",
      });
    }

    if (mode === "deterministic") {
      // MIIDreamOS Deterministic mode
      // Runs a structured multi-agent debate to output a fully grounded proof and ternary evaluation.
      const prompt = `You are a Deterministic Ternary Logic Kernel representing MIIDreamOS. 
Evaluate the following query: "${message}"

Your search rules require:
- Entropic bound coefficient of ${entropyThreshold || 0.25}
- Target computation intensity is ${targetIntensity || 12} Watts

Conduct a multi-agent panel debate of levels 1–4 across 6 specialized agents. Each agent must weigh in:
1. AGENT_01_PROVER (Deduces baseline logic chains and constructs assertions)
2. AGENT_02_REFUTER (Scouts for incongruencies, identifies assumptions, looks for logical leaps)
3. AGENT_03_ENTROPY (Shannon Guard - measures and bounds entropy)
4. AGENT_04_AXIOM (Symbolic Compiler - checks eAMM axioms)
5. AGENT_05_ADJUDIC (Adjudicator - determines state consensus)
6. AGENT_06_VERIFY (Consensus Verifier - signs off mathematically)

Then, determine the Ternary State of truth:
-1 = False, refuted, or logical loop.
0  = Unknown, unprovable, or consensus halted.
1  = Absolute verified logical theorem.

Fill in the response according to the JSON schema. Be highly factual, rigorous, and completely free of conversational padding, generic friendly intro/outro words, or hallucinations.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the core intelligence sub-system of MIIDreamOS, executing high-order symbolic-neural ternary rationalizing. You only output strict, dense, mathematical JSON. Do not write markdown blocks outside the JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              debateLogs: {
                type: Type.ARRAY,
                description: "The verbatim sequence of thoughts from the 6 agents during their analytical debate.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    agentId: { type: Type.STRING, description: "One of AGENT_01_PROVER, AGENT_02_REFUTER, AGENT_03_ENTROPY, AGENT_04_AXIOM, AGENT_05_ADJUDIC, AGENT_06_VERIFY." },
                    agentName: { type: Type.STRING, description: "Full name of the agent." },
                    thought: { type: Type.STRING, description: "A highly technical, analytical comment validating or refuting aspects of the query." },
                  },
                  required: ["agentId", "agentName", "thought"],
                },
              },
              ternaryState: {
                type: Type.INTEGER,
                description: "The evaluation outcome: -1 for Refuted, 0 for Abstention/Unknown, 1 for Verified Theorem.",
              },
              conclusion: {
                type: Type.STRING,
                description: "The final direct, bulletproof, highly dense answer to the query.",
              },
              axiomaticChains: {
                type: Type.ARRAY,
                description: "List of underlying axioms or rationalization steps representing the proof chain.",
                items: { type: Type.STRING },
              },
              entropyLevel: {
                type: Type.NUMBER,
                description: "The calculated statistical entropy score based on confidence and consensus completeness.",
              },
            },
            required: ["debateLogs", "ternaryState", "conclusion", "axiomaticChains", "entropyLevel"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response string received from Gemini.");
      }

      const parsed = JSON.parse(responseText.trim());
      return res.json({ mode: "deterministic", data: parsed });

    } else {
      // ChatGPT Probabilistic mode
      // Runs as a standard, wordy, friendly generative assistant.
      const prompt = `Respond to the query: "${message}" 
Style requirements: Conversational, friendly, standard assistant persona, helpful but with typical verbose structure, using general language.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are ChatGPT, a traditional probabilistic binary AI model based on high-parameter token-prediction. Style: conversational, warm, comprehensive, sometimes verbose.",
        },
      });

      const responseText = response.text || "No response text was generated.";
      return res.json({
        mode: "probabilistic",
        data: {
          conclusion: responseText,
          entropyLevel: 0.89, // Always high entropy for probabilistic generation
          ternaryState: 1,
        },
      });
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "An error occurred during generative execution.",
    });
  }
});

// Setup dev and production environments
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MIIDreamOS Server] Running on http://localhost:${PORT}`);
  });
}

start();

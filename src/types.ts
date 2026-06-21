export type TernaryState = -1 | 0 | 1;

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  mode: 'probabilistic' | 'deterministic';
  timestamp: string;
  ternaryState?: -1 | 0 | 1;
  entropy?: number;
  axiomaticChains?: string[];
  debateLogs?: Array<{ agentId: string; agentName: string; thought: string }>;
  wattageUsed?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  created: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'STABLE' | 'DEBATING' | 'COMPLETED' | 'HALTED';
  rulesCount: number;
  entropyImpact: number;
  description: string;
  axiomaticAssertion: string;
}

export interface MetricRow {
  name: string;
  value: string;
  delta: string;
  evidence: string;
  iconName: string;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
  source: string;
  message: string;
}

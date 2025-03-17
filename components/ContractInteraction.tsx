import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { performDataAnalysis, proposeAndSignInitiative } from '@/utils/litProtocol';
import { useSessionSigs } from '@/hooks/useSessionSigs';

interface ContractInteractionProps {
  onWasteReport: (location: string, quantity: string) => void;
}

interface Insight {
  totalWaste: number;
  averageQuantity: number;
  lastUpdated: Date;
  averageWaste: number;
  hotspotCount: number;
}

interface ProposalResult {
  success: boolean;
  message: string;
  timestamp: Date;
  txHash: string;
  sigCount: number;
}

export default function ContractInteraction({ onWasteReport }: ContractInteractionProps) {
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [insights, setInsights] = useState<Insight | null>(null);
  const [proposal, setProposal] = useState('');
  const [proposalResult, setProposalResult] = useState<ProposalResult | null>(null);
  const sessionSigs = useSessionSigs();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onWasteReport(location, quantity);
    setLocation('');
    setQuantity('');
  };

  const handleAnalyze = async () => {
    const results = await performDataAnalysis(sessionSigs);
    setInsights(results);
  };

  const handlePropose = async () => {
    const result = await proposeAndSignInitiative(sessionSigs, proposal);
    setProposalResult(result);
    setProposal('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <Button type="submit">Report Waste</Button>
      </form>
      <Button onClick={handleAnalyze}>Analyze Data</Button>
      {insights && (
        <div>
          <h2>Insights</h2>
          <p>Total Waste: {insights.totalWaste}</p>
          <p>Average Waste: {insights.averageWaste}</p>
          <p>Hotspot Count: {insights.hotspotCount}</p>
        </div>
      )}
      <div>
        <h2>Propose Initiative</h2>
        <Input
          type="text"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Enter your proposal"
        />
        <Button onClick={handlePropose}>Submit Proposal</Button>
      </div>
      {proposalResult && (
        <div>
          <h3>Proposal Result</h3>
          {proposalResult.success ? (
            <p>Proposal submitted successfully. Transaction Hash: {proposalResult.txHash}</p>
          ) : (
            <p>Proposal needs more signatures. Current count: {proposalResult.sigCount}</p>
          )}
        </div>
      )}
    </div>
  );
}
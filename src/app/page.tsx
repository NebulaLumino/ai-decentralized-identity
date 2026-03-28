"use client";

import { useState } from "react";
import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

const API_KEY = "sk-48987c1a1dc246ecb1b52a01647e8b16";
const API_URL = "https://api.deepseek.com/v1";
const model = createDeepSeek({ apiKey: API_KEY, baseURL: API_URL })("deepseek-chat");

export default function DecentralizedIdentityPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    profession: "",
    skills: "",
    credentials: "",
    socialLinks: "",
    protocols: "",
    useCases: "",
    reputationScore: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const { text } = await generateText({
        model,
        prompt: `You are an expert in Decentralized Identity (DID), Verifiable Credentials (VCs), and Web3 identity standards. Generate a comprehensive Decentralized Identity profile document for:

- Name: ${formData.fullName || "Not specified"}
- Profession: ${formData.profession || "Not specified"}
- Skills: ${formData.skills || "Not specified"}
- Credentials & Certifications: ${formData.credentials || "Not specified"}
- Social Links: ${formData.socialLinks || "Not specified"}
- Preferred Protocols: ${formData.protocols || "Not specified"}
- Use Cases: ${formData.useCases || "Not specified"}
- Reputation Score Level: ${formData.reputationScore || "Not specified"}

Generate a detailed DID identity profile in Markdown with:

1. **Identity Overview** - Summary of the identity holder
2. **DID Document Structure** - Suggested DID method and document structure (DID URI, public keys, authentication, service endpoints)
3. **Verifiable Credentials (VCs)** - List of credentials to issue and verify, organized by type
4. **Skill Badges & Attestations** - On-chain and off-chain credentials to build reputation
5. **Zero-Knowledge Proofs (ZKPs)** - Selective disclosure strategies for privacy
6. **Identity Protocol Recommendations** - Which DID methods suit this profile (did:web, did:ethr, did:key, did:spruce, etc.)
7. **Social Recovery Plan** - Guardians, recovery mechanisms, backup keys
8. **Reputation Graph** - How to aggregate and present reputation across platforms
9. **Use Case Breakdown** - How this DID can be used in DeFi, DAOs, hiring, governance
10. **Security Best Practices** - Key management, multi-device sync, phishing protection
11. **Implementation Roadmap** - Step-by-step guide to setting up this identity

Use W3C DID Core and Verifiable Credentials standards as reference.`,
      });
      setOutput(text);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            🪪 Decentralized Identity Profile Generator
          </h1>
          <p className="text-slate-400">Create comprehensive DID profiles with Verifiable Credentials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-cyan-300">Identity Details</h2>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Full Name / Pseudonym</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. vitalik.eth or Alice Smith"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Profession / Role</label>
              <input
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g. Smart Contract Auditor, DeFi Trader, DAO Contributor"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. Solidity, Rust, tokenomics design, community management"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Credentials & Certifications</label>
              <textarea
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. ChainSafe Security Audit Cert, ETHDenver Speaker, Gitcoin Passport 80"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Social Links / ENS</label>
              <input
                name="socialLinks"
                value={formData.socialLinks}
                onChange={handleChange}
                placeholder="e.g. @alice.eth, twitter.com/alice, github.com/alice"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Protocols</label>
                <select
                  name="protocols"
                  value={formData.protocols}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select</option>
                  <option value="did:web">did:web</option>
                  <option value="did:ethr">did:ethr (Ethereum)</option>
                  <option value="did:key">did:key</option>
                  <option value="did:spruce">did:spruce</option>
                  <option value="did:ion">did:ion (Bitcoin)</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Reputation Score</label>
                <select
                  name="reputationScore"
                  value={formData.reputationScore}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select</option>
                  <option value="New (0-20)">New (0-20)</option>
                  <option value="Emerging (20-50)">Emerging (20-50)</option>
                  <option value="Established (50-80)">Established (50-80)</option>
                  <option value="Veteran (80+)">Veteran (80+)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Primary Use Cases</label>
              <textarea
                name="useCases"
                value={formData.useCases}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. Sybil resistance for governance, age verification, credential sharing with employers"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {loading ? "Generating Identity... 🪪" : "Generate DID Profile 🚀"}
            </button>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}
          </form>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-cyan-300">Generated DID Profile</h2>
              {output && (
                <button onClick={handleCopy} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  📋 Copy
                </button>
              )}
            </div>

            {output ? (
              <div className="flex-1 overflow-auto">
                <div className="prose prose-invert prose-sm max-w-none text-slate-200 whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                <p className="text-center">Your DID profile will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

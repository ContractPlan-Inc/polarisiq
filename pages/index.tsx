import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">ContractPlan-Inc</h1>
        <p className="text-xl mb-4">Your command center for intelligent contract execution.</p>
        <a href="/dashboard" className="text-blue-600 underline">Go to Dashboard</a>
      </div>
    </main>
  );
}

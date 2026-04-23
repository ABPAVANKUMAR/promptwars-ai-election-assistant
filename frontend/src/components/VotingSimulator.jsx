import React, { useState } from "react";

const candidates = [
  { id: 1, name: "Candidate A" },
  { id: 2, name: "Candidate B" },
  { id: 3, name: "Candidate C" }
];

const VotingSimulator = () => {
  const [votes, setVotes] = useState({
    1: 0,
    2: 0,
    3: 0
  });

  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (id) => {
    if (hasVoted) return;

    setVotes((prev) => ({
      ...prev,
      [id]: prev[id] + 1
    }));

    setHasVoted(true);
  };

  const getTotalVotes = () => {
    return Object.values(votes).reduce((a, b) => a + b, 0);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🗳️ Voting Simulator
      </h2>

      <p className="text-center mb-6 text-gray-600">
        Cast your vote (you can vote only once)
      </p>

      <div className="space-y-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <span className="font-medium">{c.name}</span>

            <button
              onClick={() => handleVote(c.id)}
              disabled={hasVoted}
              className={`px-4 py-2 rounded-md text-white ${
                hasVoted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Vote
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">
          📊 Live Results
        </h3>

        {candidates.map((c) => {
          const percent =
            getTotalVotes() === 0
              ? 0
              : Math.round((votes[c.id] / getTotalVotes()) * 100);

          return (
            <div key={c.id} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{c.name}</span>
                <span>{votes[c.id]} votes ({percent}%)</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <p className="mt-4 text-center text-green-600 font-medium">
          ✅ Thank you for voting!
        </p>
      )}
    </div>
  );
};

export default VotingSimulator;
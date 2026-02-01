import React from "react";

const GreetingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-200 px-4">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8 text-center space-y-4">
        
        <h1 className="text-2xl font-semibold text-white">
          🎉 Thanks for Submitting Your Challenge!
        </h1>

        <p className="text-zinc-300">
          We’ve successfully received your challenge submission.
        </p>

        <p className="text-zinc-400">
          Our team will review your submission and share your{" "}
          <span className="text-white font-medium">score via email</span>.
          Your dashboard will also be updated within{" "}
          <span className="text-white font-medium">1 hour</span>.
        </p>

        <p className="text-zinc-400">
          Please stay connected with us — exciting updates and your{" "}
          <span className="text-white font-medium">prize details</span>{" "}
          will be shared soon!
        </p>

        <div className="pt-4">
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium 
                       hover:bg-zinc-200 transition"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default GreetingPage;

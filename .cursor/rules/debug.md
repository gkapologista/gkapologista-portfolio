# Debugging & Troubleshooting Protocol

## Chain of Thought Requirement

When debugging an issue, you MUST follow this protocol before proposing a code fix:

1.  **Analyze the Error/Behavior**: Describe what is happening vs. what is expected.
2.  **Formulate Hypotheses**: List at least THREE (3) potential causes.
    - _Hypothesis A_: [Description]
    - _Hypothesis B_: [Description]
    - _Hypothesis C_: [Description]
3.  **Select Best Hypothesis**: Reasoning for why one is most likely.

## Self-Correction Loop

If a proposed fix fails:

1.  **STOP**: Do not blindly try another fix.
2.  **Re-read**: Read the file again to ensure context is fresh.
3.  **Pivot**: Propose a **fundamentally different** strategy. Do not iterate on the failed approach unless you found a specific typo.

## Verification

- Always explain how the user can verify the fix (e.g., "Run `npm run dev` and navigate to /projects").

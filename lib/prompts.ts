export type Tool = 'code_review' | 'security_audit' | 'performance_check' | 'bug_analysis';

export const PROMPT_TEMPLATES: Record<Tool, (input: string) => string> = {
  code_review: (input) => `As an expert software engineer, conduct a comprehensive code review of the following snippet. Highlight potential issues, suggest improvements for readability and maintainability, and ensure it follows best practices.

Code to review:
${input}`,

  security_audit: (input) => `As a cybersecurity expert, perform a security audit on the following code. Identify potential vulnerabilities (e.g., SQL injection, XSS, insecure data handling), explain the risks, and provide remediation steps.

Code to audit:
${input}`,

  performance_check: (input) => `As a performance optimization expert, analyze the following code for bottlenecks. Suggest ways to improve execution speed and reduce resource consumption (CPU/Memory).

Code to analyze:
${input}`,

  bug_analysis: (input) => `As a senior debugger, analyze the following code and the described issue to find the root cause of the bug. Provide a clear explanation and a corrected version of the code.

Code and Issue description:
${input}`,
};

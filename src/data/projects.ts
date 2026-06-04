export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  learnings: string[];
  architectureDiagram?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: 'experience' | 'education' | 'collegiate';
  description: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "corporate-finance-pipeline",
    title: "AFD Finance Analytics Pipeline",
    tagline: "Corporate Financial Analysis & Workflow Optimization",
    category: "Financial Analysis & Automation",
    problem: "Cross-departmental financial reporting and workflow audits at AFD Contract Furniture suffered from manual data ingestion bottlenecks, requiring approximately 15 man-hours of manual processing every month.",
    solution: "Developed an automated ETL pipeline that aggregates general ledger balances, departments' cost allocations, and purchase logs into clean Excel analytics databases. Structured data-validation macros to identify variance outliers and reconciled discrepancies dynamically.",
    technologies: ["Python", "SQL", "Microsoft Excel", "Google Suite", "Data Interpretation"],
    metrics: [
      { label: "Man-Hours Saved", value: "15 hours / mo" },
      { label: "Data Integrity", value: "100% Reconciled" },
      { label: "Process Efficiency", value: "+45% Faster" },
      { label: "Audited Ledger Lines", value: "10,000+" }
    ],
    learnings: [
      "Designed robust error-handling routines in Python to handle misaligned column fields and varied CSV formats across departmental reports.",
      "Optimized data parsing functions by utilizing vectorized pandas operations rather than iterative row loops.",
      "Shadowed senior-level finance executives to understand how key operating metrics (OpEx/CapEx) guide capital allocations."
    ],
    architectureDiagram: `
+------------------+     Fetch Data     +---------------------+
| Sales / Procurement|  ------------->  | Department Logs     |
| Department Databases|                 | (CSV/XLSX Formats)  |
+------------------+                    +---------------------+
                                                   |
                                                   | Run Python ETL
                                                   v
+------------------+     Generate       +---------------------+
| Reconciled       |  <-------------    | Aggregator Script & |
| Analytics Report |                    | Variance Auditer    |
+------------------+                    +---------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/corporate-finance-pipeline"
  },
  {
    id: "vc-valuation-engine",
    title: "Venture Capital Valuation Engine",
    tagline: "Multi-Scenario DCF & Training Evaluation Engine",
    category: "Investment Analysis & Modeling",
    problem: "Analyzing prospective startup pitches and evaluating the ROI of educational training programs for the Rutgers Venture Capital Club was slow and lacked standardized financial sensitivity analytics.",
    solution: "Built a modular financial modeling engine in Python to execute Discounted Cash Flow (DCF), comparable company analysis (Comps), and sensitivity calculations. Generated automated mock investment projections showing IRR and cash-on-cash multiples across different macro scenarios.",
    technologies: ["Python", "NumPy", "Pandas", "Excel Modeling", "Financial Analytics"],
    metrics: [
      { label: "Pitches Evaluated", value: "20+ Mock Pitches" },
      { label: "Computation Time", value: "<1.5 seconds" },
      { label: "Scenarios Run", value: "50+ Multi-variate" },
      { label: "Model Standardization", value: "100%" }
    ],
    learnings: [
      "Implemented Monte Carlo simulation pathways in Python to forecast cash flows based on revenue growth rate probability distributions.",
      "Structured interactive sensitivity matrices (Growth Rate vs. WACC) to assess valuation bounds.",
      "Presented results directly to the investment committee, validating mock investment pitches with quantitative indicators."
    ],
    architectureDiagram: `
+-------------------+   Input Variables   +-------------------+
| Pitch Deck & Comps|  ---------------->  | Python Valuation  |
| Operating Metrics |                     | Engine Core       |
+-------------------+                     +-------------------+
                                                    |
                                                    | Run DCF & Comps
                                                    v
+-------------------+   Standard Report   +-------------------+
| Committee Summary |  <----------------  | Sensitivity Table |
| & Risk Evaluation |                     | & IRR Forecasts   |
+-------------------+                     +-------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/vc-valuation-engine"
  },
  {
    id: "institutional-budget-forecaster",
    title: "Event Operations & Budget System",
    tagline: "Community Donations Management & Event Allocation",
    category: "Financial & Logistics Operations",
    problem: "Tracking incoming community donations, allocating budgets across multiple localized grassroots initiatives, and managing logistical expense streams lacked a unified data dashboard, introducing allocation delay.",
    solution: "Designed a centralized financial tracking ledger and budget allocator in Google Sheets/Excel for ICNJ Community Center. Implemented strict double-entry checks, historical donation aggregation, and expense-categorization matrices for events.",
    technologies: ["Excel", "Google Sheets", "Financial Reporting", "Data Analysis", "Logistics Planning"],
    metrics: [
      { label: "Event Budget", value: "$25,000 managed" },
      { label: "Funds Raised", value: "$2,500+ campaigns" },
      { label: "Students Trained", value: "50+" },
      { label: "Record Drift", value: "0.00% Zero-Error" }
    ],
    learnings: [
      "Managed the end-to-end financial budgeting, marketing coordination, and artist liaison logistics for a major $25k budget musical festival.",
      "Optimized ticket sales tracking by integrating real-time database lookups with donation logs.",
      "Designed and executed grassroots book-selling campaigns that leveraged predictive target metrics to maximize donation ratios."
    ],
    architectureDiagram: `
+--------------------+   Donation logs   +--------------------+
| Donation Inflow    |  ---------------> | Double-Entry       |
| & Campaign Sales   |                   | Verification Sheet |
+--------------------+                   +--------------------+
                                                   |
                                                   | Allocate funds
                                                   v
+--------------------+   Live Allocation +--------------------+
| Grassroots Projects|  <--------------- | Event Budget Core  |
| & Event Expenses   |                   | ($25k Event Cap)   |
+--------------------+                   +--------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/event-budget-forecaster"
  }
];

export const milestones: Milestone[] = [
  {
    id: "m1",
    year: "Jun 2025 - Aug 2025",
    title: "Finance and IT Intern",
    organization: "AFD Contract Furniture",
    type: "experience",
    description: [
      "Optimized a core financial analysis report by gathering and interpreting data, resulting in a documented process efficiency that saved approximately 15 man-hours every month.",
      "Assisted in documenting and streamlining a finance related workflow across departments, supporting a major efficiency initiative.",
      "Participated in internal professional development events and shadowed senior-level executives to strengthen professional exposure.",
      "Supported the IT team with essential software installation, configuration, system monitoring, and hardware maintenance (routers, switches, servers) adhering to security protocols."
    ],
    tags: ["Financial Analysis", "Python", "Process Optimization", "IT Systems", "Network Security"]
  },
  {
    id: "m2",
    year: "Jun 2019 - Present",
    title: "Financial & Event Operations Coordinator",
    organization: "ICNJ Community Center",
    type: "experience",
    description: [
      "Support institutional finance operations, including managing incoming community donations, developing budgets, and meticulous expense tracking.",
      "Managed the financial and logistical planning for the annual Kirtan Love Fest, overseeing a $25,000 event budget and coordinating arrangements for Emmy-nominated musical talent.",
      "Led a youth education initiative training 50+ students in classical Indian and French musical instruments.",
      "Coordinated and executed book-selling campaigns and summer camp programs, raising over $2,500 for community fundraising efforts.",
      "Managed A/V operations for live events and directed a drama troupe from inception to presentation."
    ],
    tags: ["Financial Budgeting", "Expense Tracking", "Logistics Coordination", "Project Management", "Youth Education"]
  },
  {
    id: "m3",
    year: "Sept 2025 - Present",
    title: "Finance Coordinator",
    organization: "Rutgers Venture Capital Club",
    type: "collegiate",
    description: [
      "Provide financial analysis to the club's investment committee, evaluating the cost and projected return of various training programs and mock investment pitches.",
      "Track and reconcile all financial transactions using Excel, maintaining accurate records for weekly and monthly reporting."
    ],
    tags: ["Venture Capital", "Financial Modeling", "Excel Analytics", "Pitch Valuation", "ROI Forecasting"]
  },
  {
    id: "m4",
    year: "Sept 2025 - Present",
    title: "Treasurer & Speaker",
    organization: "Bhakti Club National Club at Rutgers",
    type: "collegiate",
    description: [
      "Manage all club financials, including budgeting, expenditure processing, and securing external sponsorship funding.",
      "Direct financial planning and marketing outreach for major campus events, ensuring optimal resource allocation and project execution.",
      "Increase student engagement by developing and implementing targeted social media campaigns and promotional strategies."
    ],
    tags: ["Financial Planning", "Budget Allocation", "Marketing Analytics", "Sponsorship Acquisition", "Social Media Strategy"]
  },
  {
    id: "m5",
    year: "Graduation Expected 2027",
    title: "B.S. in Economics & Data Science",
    organization: "Rutgers University (Piscataway, NJ)",
    type: "education",
    description: [
      "Focusing on the intersection of micro/macroeconomic theory, market structures, and computational data science.",
      "Relevant coursework: Econometrics, Data Interpretation, Marketing Analytics, Capital Allocations, Quantitative Financial Analysis."
    ],
    tags: ["Economics", "Data Science", "Econometrics", "Quantitative Analysis", "Financial Reporting"]
  },
  {
    id: "m6",
    year: "Completed",
    title: "High School Diploma",
    organization: "Bridgewater Raritan Regional High School",
    type: "education",
    description: [
      "Graduated with a GPA of 3.7. Participated in academic clubs and student operations."
    ],
    tags: ["High School", "Bridgewater NJ", "GPA: 3.7"]
  }
];

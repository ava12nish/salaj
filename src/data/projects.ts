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
  type: 'experience' | 'education' | 'milestone';
  description: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "aegis-ledger",
    title: "Aegis Ledger",
    tagline: "Distributed Double-Entry Ledger System",
    category: "Distributed Systems & Ledger Tech",
    problem: "Traditional databases fall short of guaranteeing strict ACID consistency, immutable auditing, and sub-millisecond write latency under highly concurrent loads (10k+ reqs/sec) during volatile market cycles.",
    solution: "Designed and implemented a distributed ledger in Go that utilizes a custom Write-Ahead Log (WAL), memory-mapped SSTables, and a Raft consensus cluster to guarantee strict linearizability. Built read paths optimized with Bloom filters and high-performance in-memory caching.",
    technologies: ["Go", "gRPC", "Raft", "Redis", "PostgreSQL", "Prometheus", "Docker"],
    metrics: [
      { label: "Throughput", value: "15,000+ tx/sec" },
      { label: "p99 Write Latency", value: "1.2ms" },
      { label: "Consistency SLA", value: "99.999%" },
      { label: "Volume Simulated", value: "500M+ tx" }
    ],
    learnings: [
      "Tuned Raft heartbeat and election timeouts to minimize leader election downtime in congested network topologies.",
      "Optimized memory usage by utilizing flatbuffers instead of JSON/Protobuf for serialization on the write hot-path.",
      "Implemented a lock-free double-entry validation engine preventing race conditions on concurrent balance transfers."
    ],
    architectureDiagram: `
+------------------+     gRPC     +----------------------+
|  API Gateway /   |  --------->  |  Go Consensus Nodes  |
|  Load Balancer   |              |  (Raft Leader/Follw) |
+------------------+              +----------------------+
                                             |
                                             |  Replicate log & append
                                             v
+------------------+   Sync DB    +----------------------+
| ClickHouse /     |  <---------  | Write-Ahead Log      |
| PostgreSQL       |              | & LSM Memory Cache   |
+------------------+              +----------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/aegis-ledger"
  },
  {
    id: "apex-risk-engine",
    title: "Apex Risk Engine",
    tagline: "Real-Time Portfolio Risk Modeling & VaR Engine",
    category: "Quantitative Analytics",
    problem: "Institutional portfolio managers need real-time calculations of Value-at-Risk (VaR), Greeks, and historical stress-tests on multi-asset portfolios containing derivative contracts. Existing batch engines run overnight, leaving traders exposed to intraday market shocks.",
    solution: "Developed a distributed computation engine combining Rust (for low-level, multi-threaded Monte Carlo simulations) and Python (Black-Litterman models). Configured Apache Spark on AWS ECS to parallelize simulation pathways across 10,000+ asset scenarios.",
    technologies: ["Rust", "Python", "Apache Spark", "AWS ECS", "ClickHouse", "Redis", "Docker"],
    metrics: [
      { label: "Calculation Time", value: "3.8s" },
      { label: "Assets Supported", value: "10,000+" },
      { label: "Simulated Scenarios", value: "100,000" },
      { label: "Latency Reduction", value: "99.1%" }
    ],
    learnings: [
      "Leveraged Rust SIMD (Single Instruction, Multiple Data) intrinsics to execute matrix math directly on the CPU register level, obtaining a 4.5x speedup.",
      "Implemented delta-gamma approximation methods for options positions to bypass full-pricing loops for rapid intraday updates.",
      "Engineered an event-driven cache invalidation strategy using Redis Pub/Sub to trigger recalculations only on price feed changes."
    ],
    architectureDiagram: `
+------------------+   Price Tick   +----------------------+
| Market Data Feed |  ------------> | Redis Cache Layer    |
+------------------+                +----------------------+
                                               |  Trigger
                                               v
+------------------+   MapReduce    +----------------------+
| AWS ECS Cluster  |  <-----------  | Rust Computation     |
| (Spark Workers)  |                | Engine (Monte Carlo) |
+------------------+                +----------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/apex-risk-engine"
  },
  {
    id: "nexus-tick-pipeline",
    title: "Nexus Tick Pipeline",
    tagline: "Ultra-Low Latency Market Tick Aggregator",
    category: "Data Engineering",
    problem: "Ingesting, parsing, and persisting high-frequency multicast market data feeds (e.g., NASDAQ TotalView-ITCH) can easily result in packet drops and buffer overflows if the software cannot handle peak bursts of hundreds of thousands of events per second.",
    solution: "Built a highly optimized tick processor in Java utilizing the LMAX Disruptor ring buffer to achieve lock-free inter-thread messaging. Implemented custom binary decoders for the ITCH protocol and buffered output to ClickHouse for analytical queries.",
    technologies: ["Java", "LMAX Disruptor", "Apache Kafka", "ClickHouse", "Docker", "Grafana"],
    metrics: [
      { label: "Peak Ingestion Rate", value: "850,000 msg/s" },
      { label: "Avg Processing Time", value: "4.2μs" },
      { label: "Data Drop Rate", value: "0.000%" },
      { label: "Storage Saved", value: "65%" }
    ],
    learnings: [
      "Configured JVM Garbage Collection using ZGC (Z Garbage Collector) and pre-allocated object pools to ensure GC pauses remained under 1 millisecond.",
      "Utilized off-heap memory storage for transient tick indexes to minimize garbage collector overhead.",
      "Engineered a dynamic backpressure throttle using Kafka Consumer groups to handle downstream database writing bottlenecks."
    ],
    architectureDiagram: `
+------------------+   UDP Multicast   +----------------------+
| NASDAQ ITCH Feed |  -------------->  | Binary Decoder       |
+------------------+                   | & Ring Buffer (LMAX) |
                                       +----------------------+
                                                  |
                                                  |  Publish to stream
                                                  v
+------------------+     Persist       +----------------------+
| ClickHouse Column|  <--------------  | Apache Kafka         |
| Database         |                   | Broker Cluster       |
+------------------+                   +----------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/nexus-tick-pipeline"
  },
  {
    id: "quantum-execution",
    title: "Quantum Execution",
    tagline: "High-Frequency Order Matching Engine Simulator",
    category: "Capital Markets Technology",
    problem: "Testing algorithmic trading strategies in realistic conditions requires a matching engine that behaves identical to live exchange books, supporting price-time priority (FIFO) and high throughput with nanosecond-level accuracy.",
    solution: "Created an exchange-grade matching engine in C++ featuring a double-sided limit order book (LOB) utilizing binary heaps and doubly linked lists. Integrated a FIX Protocol gateway (QuickFAST) to support standard industry order message routing.",
    technologies: ["C++", "FIX Protocol", "React", "gRPC", "Docker", "WebSockets"],
    metrics: [
      { label: "Order Matching", value: "800ns" },
      { label: "LOB Depth Levels", value: "100+" },
      { label: "FIX Throughput", value: "20,000 msg/s" },
      { label: "Jitter Std Dev", value: "<150ns" }
    ],
    learnings: [
      "Eliminated all dynamic heap allocations (new/malloc) in the order execution path by implementing custom block memory allocators.",
      "Aligned critical order book structs to cache line boundaries (64 bytes) to avoid CPU cache thrashing.",
      "Developed a custom WebSockets event broadcaster in Go that streams depth-of-book updates to front-end charts at 60fps."
    ],
    architectureDiagram: `
+------------------+    FIX Message    +----------------------+
| Algo Trading Bot |  -------------->  | QuickFAST FIX Gateway|
+------------------+                   +----------------------+
                                                  |
                                                  |  Local Lock-free Queue
                                                  v
+------------------+    Push Updates   +----------------------+
| WebSocket Stream |  <--------------  | C++ Matching Engine  |
| Client Dashboard |                   | (FIFO Order Book)    |
+------------------+                   +----------------------+
    `,
    githubUrl: "https://github.com/SalajPortfolio/quantum-execution"
  }
];

export const milestones: Milestone[] = [
  {
    id: "m1",
    year: "2024 - Present",
    title: "Lead Software Engineer",
    organization: "Apex Capital Systems (FinTech Solutions)",
    type: "experience",
    description: [
      "Direct a team of 4 engineers building low-latency trading APIs and distributed data pipelines for institutional market participants.",
      "Led the migration of a legacy SQL double-entry ledger to a high-throughput Go microservices architecture, boosting transaction capacity by 200%.",
      "Architected real-time risk checks and options margin validation engines handling $50M+ in daily transaction volume."
    ],
    tags: ["Distributed Systems", "Go", "Kafka", "PostgreSQL", "Team Leadership"]
  },
  {
    id: "m2",
    year: "2022 - 2024",
    title: "Software Engineer II",
    organization: "Stellar Asset Management (Capital Markets Group)",
    type: "experience",
    description: [
      "Developed and maintained low-latency order routing and market data ingestion systems (C++ and Java).",
      "Collaborated with quantitative analysts to implement automated portfolio rebalancing and algorithmic hedging strategies.",
      "Optimized Java data processing jobs, cutting memory overhead by 40% and eliminating tick processing latency spikes."
    ],
    tags: ["C++", "Java", "LMAX Disruptor", "FIX Protocol", "Performance Tuning"]
  },
  {
    id: "m3",
    year: "2020 - 2022",
    title: "M.S. in Computer Science (Financial Engineering Track)",
    organization: "Carnegie Mellon University",
    type: "education",
    description: [
      "Specialized in high-performance computing, distributed databases, quantitative finance, and stochastic models.",
      "Thesis: 'High-Throughput Order Matching Engines on Parallel CPU-GPU Architectures'.",
      "Completed projects covering portfolio optimization algorithms, derivatives pricing (Black-Scholes/Monte Carlo), and time-series analysis."
    ],
    tags: ["Financial Engineering", "Distributed Systems", "Stochastic Calculus", "CUDA"]
  },
  {
    id: "m4",
    year: "2016 - 2020",
    title: "B.S. in Computer Science",
    organization: "University of Illinois Urbana-Champaign",
    type: "education",
    description: [
      "Graduated with Honors. Focused on Systems Programming, Operating Systems, Database Management Systems, and Networks.",
      "Founded and led the university's Algorithmic Trading Society, conducting semester-long trading strategy coding competitions."
    ],
    tags: ["Systems Programming", "Algorithms", "C++", "Operating Systems"]
  }
];

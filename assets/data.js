/* Data transcribed from the manuscript: Table 5 (evidence summary),
   Appendix B (drop-channel audit) and Appendix C (extended coverage map). */

var EVAL = [
  ["LMX","Numeric","solution","per op.",["PR","qual"],"demonstrates semantic crossover behavior on synthetic tasks; no headline metric on classical optimization benchmarks"],
  ["OPRO","Numeric†","prompt / solution","per step",["PR","own"],"GSM8K up to +8 p.p.; some BBH tasks up to +50 p.p. vs. human prompts"],
  ["EvoPrompt","Numeric†","prompt","per gen.",["PR","own"],"some BBH tasks up to +25 p.p. vs. human &amp; auto prompts"],
  ["FunSearch","Symbolic","program","offline",["PR","own"],"cap set <i>n</i>&#8202;=&#8202;8: 512, bound <i>C</i>&#8202;≥&#8202;2.2202; beats best-fit on online BPP"],
  ["LLaMEA","Symbolic","algo. code","offline",["PR","own"],"BBOB subset at 5D: outperforms CMA-ES &amp; DE on several functions under reported budget"],
  ["MCTS-AHD","Symbolic","program","offline",["PR","matched"],"smallest matched online-BPP gap: <b>0.89%</b> vs. FunSearch / EoH / ReEvo"],
  ["AlphaEvolve","Symbolic","program / code","offline",["pre","own"],"rank-48 tensor decomposition for 4×4 complex matmul; first characteristic-0 improvement over Strassen's rank-49, and 14 matrix targets improved"],
  ["EoH","Linguistic","idea + code","offline",["PR","own"],"online BPP: 20 generations / 2,000 LLM queries; matches or improves FunSearch in its own evaluation"],
  ["ReEvo","Linguistic","code","offline",["PR","own"],"competitive on 6 CO problems, more sample-efficient"],
  ["HSEvo","Linguistic","code population","offline",["PR","matched"],"BPO / TSP / OP matched study: improves or matches FunSearch, EoH and ReEvo while tracking diversity"],
  ["LAPT","Linguistic","principles","offline",["PR","own"],"beats prior transferable-NAS (TNAS) methods on most tasks"],
  ["MEoH","Linguistic","pareto set of heuristics","offline",["PR","own"],"up to 10× more efficient; more trade-offs"]
];

var AUDIT = [
  ["OPRO","(solution, score) trajectory","Numeric","boundary","drop the score trajectory and no signal steers the next proposal"],
  ["EvoPrompt","parent prompt text, scores","Numeric","boundary","scored parents drive selection, while parent text is the artifact varied; boundary label retained"],
  ["LMX","parent solutions (few-shot)","Numeric","","drop the parents and there is no crossover to perform"],
  ["FunSearch","sampled high-scoring programs, scores","Symbolic","","drop the program text and there is nothing to mutate"],
  ["LLaMEA","algorithm code, score, error note","Symbolic","","drop the code and no algorithm remains; the error note is annotated"],
  ["MCTS-AHD","program, tree-search state, scores","Symbolic","","drop the code and the tree explores nothing executable"],
  ["AlphaEvolve","codebase, evaluator scores","Symbolic","","drop the code and there is no artifact to evolve"],
  ["EoH","NL idea, code, scores","Linguistic","","neutralize the idea and it collapses toward FunSearch-style code mutation"],
  ["ReEvo","code, reflection, scores","Linguistic","","neutralize the reflection and it collapses toward a code-only AHD loop"],
  ["HSEvo","NL idea, code population, scores, diversity pressure","Linguistic","","neutralize the idea and diversity-seeking rationale, and the loop loses its language-steered population-diversity mechanism"],
  ["MEoH","NL idea, code, multi-obj. scores","Linguistic","","neutralize the idea and the multi-objective search loses its steering rationale"],
  ["LAPT","NL design principles","Linguistic","","drop the principles and no transferable signal remains"]
];

var COVERAGE = [
  ["EvoLLM","Numeric","","Transient","fitness-ranked solution vectors → distribution / candidate update"],
  ["LMEA","Numeric","","Transient","parent tours + tour lengths (TSP instantiation) → offspring tour (LLM crossover / mutation)"],

  ["DiscoPOP","Symbolic","","Amortized","prior objective / loss code + eval metrics → preference-optimization loss; held-out-task reuse"],
  ["ELM","Symbolic","","Transient","parent code + edit instruction (diff model) → program; adjacent background anchor"],
  ["EvoPrompting","Symbolic","","Amortized","parent architecture code + fitness → NN architecture code"],
  ["GI-LLM","Symbolic","","Transient","source code + edit type → code patch (GI mutation)"],
  ["AutoSAT","Symbolic","","Amortized","parent CDCL heuristic code + hints → SAT-solver heuristic"],
  ["EvoTune","Symbolic","","Amortized","parent programs + RL reward into weights → heuristic program"],
  ["CoEvo","Symbolic","","Amortized","prior symbolic solutions + knowledge library → math / code solution"],
  ["VRPAgent","Symbolic","","Amortized","operator code + LNS feedback → destroy / repair operators"],
  ["LLM-LNS","Symbolic","","Amortized","MILP state + neighborhood rule + fitness → neighborhood-selection heuristic"],
  ["InstSpecHH","Symbolic","","Amortized","instance features + fitness → per-subclass heuristic + selection"],
  ["SATLUTION","Symbolic","","Amortized","solver repo + correctness / runtime feedback (agentic) → solver code"],

  ["Eureka","Linguistic","boundary","Amortized","env. code + reward reflection + parent reward code → reward-function code; reflection steers code edits"],
  ["QDAIF","Linguistic","","Amortized","few-shot NL parents + LLM feedback → NL text"],
  ["EvolCAF","Linguistic","","Transfer","NL design idea + code (EoH) → cost-aware acquisition function"],
  ["L-AutoDA","Linguistic","","Amortized","NL idea + code (EoH) → adversarial-attack algorithm"],
  ["SGE","Linguistic","","Transient","NL problem description + thought trajectories → solution via heuristics"],
  ["EvoPH","Linguistic","","Transfer","co-evolved NL prompts + heuristic code → heuristics + prompts"],
  ["MTHS","Linguistic","","Transfer","task-agnostic + task-specific programs, cross-task transfer → metaheuristic + heuristic"],
  ["MAEF","Linguistic","","Transient","role-specialized agents + eval feedback → schedules"],
  ["APE","Linguistic","","Amortized","task demonstrations → prompt (instruction induction)"],
  ["ProTeGi / APO","Linguistic","","Amortized","prompt + error minibatch (NL “gradient”) → prompt"],
  ["Promptbreeder","Linguistic","","Amortized","prompt population + self-evolved mutation-prompts → prompts"],
  ["PE2","Linguistic","","Amortized","prompt + examples + meta-prompt → prompt"],
  ["GPS","Linguistic","","Amortized","seed prompts + scores (T5 variation) → prompt"],
  ["SPELL","Linguistic","","Amortized","prompts + fitness → prompt (whole-text generation)"],

  ["ViTSP","multimodal","","Amortized","rendered image of the instance (VLM) → subproblem selection in an LNS loop"],
  ["VEO","multimodal","","Transient","rendered image of the network solution (MLLM) → in-loop crossover / mutation operators for influence maximization"],

  ["OptiMUS","adjacent","","—","NL problem description → MILP model + solver code (<em>translates</em>, does not vary)"]
];

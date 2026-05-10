export interface TopicData {
  id: string;
  name: string;
  slug: string;
  type: 'domain' | 'phd-life';
  description: string;
  questionCount: number;
  followerCount: number;
}

export const MOCK_TOPICS: TopicData[] = [
  // Domain topics
  { id: 'physics',   name: 'Physics',           slug: 'physics',           type: 'domain',   description: 'Quantum mechanics, condensed matter, astrophysics, and all branches of physics research.',          questionCount: 892,  followerCount: 1243 },
  { id: 'cs',        name: 'Computer Science',   slug: 'computer-science',  type: 'domain',   description: 'Algorithms, machine learning, systems, theory, and software engineering research.',                 questionCount: 1243, followerCount: 2156 },
  { id: 'math',      name: 'Mathematics',        slug: 'mathematics',       type: 'domain',   description: 'Pure and applied mathematics — analysis, algebra, topology, probability, and more.',                questionCount: 671,  followerCount: 934  },
  { id: 'chemistry', name: 'Chemistry',          slug: 'chemistry',         type: 'domain',   description: 'Organic, inorganic, physical, and analytical chemistry across all research contexts.',              questionCount: 445,  followerCount: 612  },
  { id: 'economics', name: 'Economics',          slug: 'economics',         type: 'domain',   description: 'Micro and macroeconomics, econometrics, behavioural economics, and policy research.',               questionCount: 334,  followerCount: 489  },
  { id: 'biology',   name: 'Biology',            slug: 'biology',           type: 'domain',   description: 'Molecular biology, genetics, ecology, neuroscience, and all life sciences.',                       questionCount: 567,  followerCount: 798  },
  { id: 'phd-life',  name: 'Psychology',         slug: 'psychology',        type: 'domain',   description: 'Cognitive, clinical, social, and developmental psychology research.',                               questionCount: 289,  followerCount: 412  },
  { id: 'phd-life',  name: 'Linguistics',        slug: 'linguistics',       type: 'domain',   description: 'Phonology, syntax, semantics, sociolinguistics, and computational linguistics.',                   questionCount: 178,  followerCount: 267  },
  // PhD Life topics
  { id: 'phd-life',  name: 'Advisor & Committee',    slug: 'advisor-committee',     type: 'phd-life', description: 'Navigating advisor relationships, committee dynamics, and academic mentorship.',              questionCount: 234,  followerCount: 1891 },
  { id: 'phd-life',  name: 'Funding & Grants',       slug: 'funding-grants',        type: 'phd-life', description: 'Fellowship applications, grant writing, stipend issues, and funding strategies.',            questionCount: 156,  followerCount: 1432 },
  { id: 'phd-life',  name: 'Mental Health',          slug: 'mental-health',         type: 'phd-life', description: 'Burnout, imposter syndrome, anxiety, and wellbeing throughout the PhD journey.',             questionCount: 312,  followerCount: 2341 },
  { id: 'phd-life',  name: 'Job Market',             slug: 'job-market',            type: 'phd-life', description: 'Academia vs industry decisions, applications, interviews, and career transitions.',          questionCount: 189,  followerCount: 1678 },
  { id: 'phd-life',  name: 'Thesis Writing',         slug: 'thesis-writing',        type: 'phd-life', description: 'Dissertation structure, writing productivity, LaTeX, and getting to the finish line.',       questionCount: 278,  followerCount: 1923 },
  { id: 'phd-life',  name: 'Qualifying Exams',       slug: 'qualifying-exams',      type: 'phd-life', description: 'Preparing for quals, comprehensive exams, and the candidacy process.',                      questionCount: 143,  followerCount: 1102 },
  { id: 'phd-life',  name: 'Publication Process',    slug: 'publication-process',   type: 'phd-life', description: 'Submitting papers, navigating peer review, revisions, and choosing journals.',              questionCount: 198,  followerCount: 1567 },
  { id: 'phd-life',  name: 'Conference & Networking', slug: 'conference-networking', type: 'phd-life', description: 'Presenting work, building connections, and navigating academic conferences.',               questionCount: 121,  followerCount: 987  },
];

export interface Question {
  id: number;
  title: string;
  body: string;
  topic: string;
  topicType: string;
  author: string;
  authorInitials: string;
  stage: string;
  timeAgo: string;
  tags: string[];
  answers: number;
  upvotes: number;
  isAnonymous: boolean;
  hasTopAnswer?: boolean;
}

export interface Answer {
  id: number;
  questionId: number;
  author: string;
  authorInitials: string;
  topicType: string;
  stage: string;
  timeAgo: string;
  body: string;
  upvotes: number;
  isAnonymous: boolean;
  isTopAnswer?: boolean;
}

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'How do I derive the Schrödinger equation from first principles without assuming wave-particle duality?',
    body: `I'm in my third year studying quantum physics and I've been trying to understand the Schrödinger equation from a foundational perspective. Most textbooks just present it as a postulate or derive it by analogy with classical waves, but I want something more rigorous.

Is there a derivation that starts purely from physical principles — perhaps from symmetry arguments or from the structure of Hamiltonian mechanics — without smuggling in wave-particle duality assumptions upfront?

I've worked through Sakurai and Griffiths but neither quite satisfies me on this point. Any pointers to more foundational treatments would also be appreciated.`,
    topic: 'Physics',
    topicType: 'physics',
    author: 'Sarah Chen',
    authorInitials: 'SC',
    stage: 'Year 3',
    timeAgo: '2h ago',
    tags: ['quantum-mechanics', 'derivation', 'wave-function'],
    answers: 12,
    upvotes: 47,
    isAnonymous: false,
    hasTopAnswer: true
  },
  {
    id: 2,
    title: 'My advisor keeps postponing our meetings — 3 cancellations in a row. Is this normal or a red flag?',
    body: `My advisor has now cancelled or rescheduled our weekly one-on-ones three times in the past month without much explanation. The first time I assumed it was just bad timing, but now I'm starting to worry.

We're at a critical point in my research where I really need guidance on whether my methodology is sound before I collect more data. I also have a conference abstract deadline in three weeks that I need her feedback on.

Should I be concerned? And how do I raise this without damaging the relationship or coming across as demanding?`,
    topic: 'Advisor & Committee',
    topicType: 'phd-life',
    author: 'Anonymous',
    authorInitials: '?',
    stage: 'Year 2',
    timeAgo: '4h ago',
    tags: ['advisor-relationship', 'communication', 'red-flags'],
    answers: 23,
    upvotes: 89,
    isAnonymous: true
  },
  {
    id: 3,
    title: "Implementing multi-head attention from scratch — getting NaN loss after 3 epochs, can't figure out why",
    body: `I'm implementing a transformer from scratch in PyTorch as part of my dissertation work on low-resource NLP. Everything looks fine for the first 2-3 epochs and then loss suddenly goes NaN.

I've checked for zero division in the softmax, added eps to LayerNorm, and clipped gradients to 1.0 — still happening. The issue seems tied to the attention weights but I can't pin it down.

Has anyone debugged this specific failure mode before? I can share the attention implementation if it helps.`,
    topic: 'Computer Science',
    topicType: 'cs',
    author: 'Marcus Webb',
    authorInitials: 'MW',
    stage: 'Year 4',
    timeAgo: '6h ago',
    tags: ['deep-learning', 'transformers', 'pytorch', 'debugging'],
    answers: 8,
    upvotes: 34,
    isAnonymous: false
  },
  {
    id: 4,
    title: 'Got rejected from all 5 grants I applied to this cycle. How do I keep going?',
    body: `I spent about four months preparing five grant applications this cycle — two federal, three private foundations. Got rejections from all of them last week, back to back. One didn't even come with reviewer comments.

My advisor is supportive but our lab funding situation is genuinely precarious and I can feel the pressure. I know rejection is normal in academia but five in a row, after all that work, is really breaking me.

Has anyone been through a stretch like this? How did you keep the momentum going?`,
    topic: 'Funding & Grants',
    topicType: 'phd-life',
    author: 'Anonymous',
    authorInitials: '?',
    stage: 'Year 5',
    timeAgo: '8h ago',
    tags: ['funding', 'rejection', 'mental-health'],
    answers: 41,
    upvotes: 203,
    isAnonymous: true
  },
  {
    id: 5,
    title: 'Proving uniform convergence of a sequence of functions — is my epsilon-delta argument correct?',
    body: `I'm trying to prove that the sequence fₙ(x) = x/(1 + nx²) converges uniformly to 0 on ℝ. My approach is to bound |fₙ(x)| by finding the supremum using calculus, then show it goes to 0 as n → ∞.

I get sup|fₙ(x)| = 1/(2√n) which tends to 0, so the convergence should be uniform. But my advisor said my epsilon-delta write-up is "sloppy" without pointing out the exact issue.

Can anyone spot where the argument might be breaking down?`,
    topic: 'Mathematics',
    topicType: 'math',
    author: 'Priya Nair',
    authorInitials: 'PN',
    stage: 'Year 1',
    timeAgo: '12h ago',
    tags: ['real-analysis', 'convergence', 'proof-verification'],
    answers: 5,
    upvotes: 18,
    isAnonymous: false
  },
  {
    id: 6,
    title: 'Interpreting 2D NMR NOESY spectrum for protein structure — unusual cross-peaks at 7.2 ppm',
    body: `I'm working on the solution structure of a small 72-residue protein and running into something unexpected in my NOESY spectrum. I'm seeing strong cross-peaks around 7.2 ppm that don't correspond to any aromatic residues in my sequence.

My first thought was solvent artefact or a contaminant, but the pattern is too consistent across experiments. Could this indicate an unexpected disulfide or a structural rearrangement I'm missing?

Any guidance from people who've worked with NOESY on similar systems would be really helpful.`,
    topic: 'Chemistry',
    topicType: 'chemistry',
    author: 'Dr. Leila Rostami',
    authorInitials: 'LR',
    stage: 'Post-doc',
    timeAgo: '1d ago',
    tags: ['NMR', 'protein-structure', 'spectroscopy'],
    answers: 7,
    upvotes: 29,
    isAnonymous: false,
    hasTopAnswer: true
  },
  {
    id: 7,
    title: "What's a realistic timeline to read 200+ papers before my qualifying exam in 6 weeks?",
    body: `My qualifying exam is in 6 weeks and my committee gave me a reading list with 230 papers. Some are classic foundational papers I've already read, maybe 40 of them. But the remaining ~190 range from 4 to 40 pages each.

I'm also still running experiments that I can't fully pause. Realistically, how do people handle this volume? Do you skim most and read a subset deeply? Is there a system that actually works?`,
    topic: 'Qualifying Exams',
    topicType: 'phd-life',
    author: 'Anonymous',
    authorInitials: '?',
    stage: 'Year 2',
    timeAgo: '1d ago',
    tags: ['qual-prep', 'reading', 'time-management'],
    answers: 17,
    upvotes: 76,
    isAnonymous: true
  },
  {
    id: 8,
    title: 'Weak instruments in 2SLS: how bad is an F-statistic of 8.3 for my IV estimate?',
    body: `I'm using instrumental variables (2SLS) to estimate the causal effect of education on earnings in my dissertation. My instrument is distance to nearest college, following Card (1995).

My first-stage F-statistic is 8.3. The old rule of thumb is F > 10, but I know the literature has moved on from this. Stock and Yogo critical values suggest I might have meaningful size distortions, but I'm not sure how to report this or whether my estimates are still usable.

How should I handle and report weak instruments at this level?`,
    topic: 'Economics',
    topicType: 'economics',
    author: 'James Okonkwo',
    authorInitials: 'JO',
    stage: 'Year 3',
    timeAgo: '2d ago',
    tags: ['econometrics', 'instrumental-variables', '2SLS'],
    answers: 9,
    upvotes: 31,
    isAnonymous: false
  }
];

export const MOCK_ANSWERS: Answer[] = [
  // Question 1 — Schrödinger equation
  {
    id: 101,
    questionId: 1,
    author: 'Prof. Amir Zadeh',
    authorInitials: 'AZ',
    topicType: 'physics',
    stage: 'Faculty',
    timeAgo: '1h ago',
    body: `The cleanest foundational derivation I know starts from the symmetry structure of non-relativistic spacetime rather than from wave-particle duality.

The key insight is that the Galilean group — the symmetry group of classical mechanics — has a central extension parameterised by mass. When you represent this group on a Hilbert space of states, you're forced into the Schrödinger equation almost inevitably. The mass parameter m appears as the central charge of the algebra, not as an input assumption.

Bargmann (1954) worked this out rigorously. More accessible treatments are in Levy-Leblond's papers from the 1960s and in Ballentine's QM textbook (Chapter 3). Ballentine is especially good because he's explicit about what assumptions go in at each step — you'll see that unitarity of time evolution plus Galilean symmetry plus the correspondence principle essentially pins down the form of the equation.

The wave-particle duality framing is pedagogically convenient but it's doing a lot of hand-waving over the actual mathematical structure.`,
    upvotes: 38,
    isAnonymous: false,
    isTopAnswer: true
  },
  {
    id: 102,
    questionId: 1,
    author: 'Sarah Chen',
    authorInitials: 'SC',
    topicType: 'physics',
    stage: 'Year 3',
    timeAgo: '45m ago',
    body: `Adding to the above — if you want a more modern treatment, Weinberg's "Lectures on Quantum Mechanics" has a chapter that derives the equation from minimal assumptions about state spaces and observables. He's careful to distinguish what's postulated from what follows.

There's also a nice approach via the path integral formulation (Feynman & Hibbs) where the Schrödinger equation emerges as the differential form of the path integral. This sidesteps wave-particle duality entirely and grounds things in an action principle instead.`,
    upvotes: 14,
    isAnonymous: false
  },
  {
    id: 103,
    questionId: 1,
    author: 'Anonymous',
    authorInitials: '?',
    topicType: 'phd-life',
    stage: 'Year 5',
    timeAgo: '30m ago',
    body: `Practical note: for your dissertation or quals, make sure you're clear on which derivation your committee expects. Some physics departments still want the "standard" de Broglie / wave-packet derivation even if it's less rigorous, just because it's what's in Griffiths. Worth a quick check before going deep on Bargmann.`,
    upvotes: 7,
    isAnonymous: true
  },

  // Question 2 — Advisor postponing meetings
  {
    id: 201,
    questionId: 2,
    author: 'Anonymous',
    authorInitials: '?',
    topicType: 'phd-life',
    stage: 'Year 6',
    timeAgo: '3h ago',
    body: `Three cancellations in a month with no explanation is worth taking seriously, but it's not necessarily a red flag about you or your work — advisors go through intense stretches (grant season, tenure cases, departmental politics) that they don't always communicate to students.

What I'd do: send a short email that's warm but concrete. Something like "I know you've been pulled in a lot of directions — I have a methods question that's blocking my data collection and the conference abstract deadline is [date]. Can we find 20 minutes this week or next?" You're making the stakes visible without being accusatory.

If you get another cancellation after that, then it's time to think about whether you need to loop in a committee member as a sounding board in the interim.`,
    upvotes: 52,
    isAnonymous: true,
    isTopAnswer: true
  },
  {
    id: 202,
    questionId: 2,
    author: 'Marcus Webb',
    authorInitials: 'MW',
    topicType: 'cs',
    stage: 'Year 4',
    timeAgo: '2h ago',
    body: `My advisor went through a phase like this in my second year. Turned out he was dealing with a difficult tenure case for a colleague and hadn't thought to mention it. Once I sent an email flagging that I was blocked on something specific, he made time within two days.

The key is being specific about what you need and why it's time-sensitive. Vague "catch up" meetings are easy to defer; "I need your sign-off on this before I collect another 200 data points" is not.`,
    upvotes: 29,
    isAnonymous: false
  },

  // Question 3 — NaN loss
  {
    id: 301,
    questionId: 3,
    author: 'Anonymous',
    authorInitials: '?',
    topicType: 'cs',
    stage: 'Year 5',
    timeAgo: '5h ago',
    body: `Classic NaN-after-a-few-epochs pattern in attention almost always comes from one of two places:

1. The QK dot products overflowing before the 1/√d_k scaling is applied — especially if you're using float16. Check that you're scaling before softmax, not after.

2. Attention weights going to exactly 0 or 1 (full saturation), then the log in your cross-entropy hitting -inf. Add a small eps inside your log if you're computing it manually.

Drop a torch.autograd.detect_anomaly() context manager around your training loop — it'll give you the exact operation that first produces NaN and a traceback. That'll narrow it down immediately.`,
    upvotes: 21,
    isAnonymous: true,
    isTopAnswer: true
  },
  {
    id: 302,
    questionId: 3,
    author: 'Marcus Webb',
    authorInitials: 'MW',
    topicType: 'cs',
    stage: 'Year 4',
    timeAgo: '4h ago',
    body: `Also worth checking: are you using a learning rate warmup? Transformers are notoriously sensitive to the learning rate in early training. If you ramp up too fast before the attention weights have stabilised, you can get explosive gradients that eventually land on NaN even with clipping.

The original "Attention Is All You Need" warmup schedule (linear ramp for 4000 steps) is a good starting point if you're not already using one.`,
    upvotes: 11,
    isAnonymous: false
  },

  // Question 4 — Grant rejections
  {
    id: 401,
    questionId: 4,
    author: 'Dr. Leila Rostami',
    authorInitials: 'LR',
    topicType: 'chemistry',
    stage: 'Post-doc',
    timeAgo: '7h ago',
    body: `Five rejections in one cycle is genuinely brutal, and I want to acknowledge that before offering any practical advice — it's okay to feel like this is a lot, because it is.

What helped me through a similar stretch: I gave myself a fixed window (one week) to feel terrible about it, then I requested reviewer comments for every grant that offered them and treated them as a revision document rather than a verdict. Two of my eventual successful applications were direct rewrites of failed ones.

On the funding gap itself: talk to your department's graduate coordinator about emergency bridge funding, and look at whether any of your work could be written up quickly for a conference that offers travel awards. Sometimes small wins ($500-2000) do a lot for morale even if they don't solve the structural problem.

You're in Year 5 — you've built something. This patch doesn't erase that.`,
    upvotes: 87,
    isAnonymous: false,
    isTopAnswer: true
  },
  {
    id: 402,
    questionId: 4,
    author: 'Anonymous',
    authorInitials: '?',
    topicType: 'phd-life',
    stage: 'Year 6',
    timeAgo: '6h ago',
    body: `NSF success rates for doctoral fellowships are around 15-17%. Federal grants in most fields are sub-20%. Five rejections is statistically expected, not a signal about your work.

That said, if none of them came with comments, it's worth emailing the program officers. Many will give informal feedback on request, especially for federal grants, and it's completely normal to ask.`,
    upvotes: 43,
    isAnonymous: true
  },

  // Question 5 — Uniform convergence proof
  {
    id: 501,
    questionId: 5,
    author: 'Priya Nair',
    authorInitials: 'PN',
    topicType: 'math',
    stage: 'Year 1',
    timeAgo: '10h ago',
    body: `Your supremum calculation is correct — sup|fₙ(x)| = 1/(2√n) is right and does go to 0. The issue your advisor is probably flagging is in how you justified that the supremum is achieved.

To be rigorous, you need to: (1) show fₙ is continuous and goes to 0 as |x| → ∞, so the sup is achieved at some finite x*; (2) differentiate and set to 0 to find x* = 1/√n; (3) then evaluate |fₙ(1/√n)| = 1/(2√n).

If you just stated "by AM-GM" or "by calculus" without laying those steps out, that's the sloppiness. The conclusion is right, the scaffolding needs to be explicit.`,
    upvotes: 12,
    isAnonymous: false,
    isTopAnswer: true
  },

  // Question 6 — NOESY cross-peaks
  {
    id: 601,
    questionId: 6,
    author: 'Prof. Amir Zadeh',
    authorInitials: 'AZ',
    topicType: 'physics',
    stage: 'Faculty',
    timeAgo: '20h ago',
    body: `Cross-peaks at 7.2 ppm in a protein NOESY with no corresponding aromatics in the sequence are almost always one of three things: a buffer component (HEPES resonates around there), a trace contaminant from the expression system, or — and this is worth checking — an unexpected His tautomer if you have any histidines.

Run a 1D ¹H on your buffer alone and overlay it. If the peak is there, you have your answer. If not, check your expression host — E. coli metabolites sometimes co-purify at low levels with His-tag preps and show up in NOESY.

The disulfide hypothesis is less likely to produce peaks at 7.2 ppm specifically — that region is almost exclusively aromatic and some imino protons.`,
    upvotes: 19,
    isAnonymous: false,
    isTopAnswer: true
  },

  // Question 7 — Reading list for quals
  {
    id: 701,
    questionId: 7,
    author: 'Anonymous',
    authorInitials: '?',
    topicType: 'phd-life',
    stage: 'Year 4',
    timeAgo: '20h ago',
    body: `The system that worked for me: categorise every paper into three tiers before you read anything.

Tier 1 (~20%): foundational or directly in your research area — read fully, take structured notes, be ready to discuss deeply. Tier 2 (~40%): important but adjacent — read abstract, intro, and conclusion, skim results. Tier 3 (~40%): background citations and tangential work — read abstract only, know what claim the paper makes.

At 190 papers with 6 weeks, you have ~4-5 papers/day. Tier 1 takes 1-2 hours, Tier 2 about 20 minutes, Tier 3 about 5. Categorise first — that alone takes a few hours but saves days.

Your committee cares that you understand the landscape and can situate your work. They're not testing whether you memorised every methodology section.`,
    upvotes: 34,
    isAnonymous: true,
    isTopAnswer: true
  },

  // Question 8 — Weak instruments
  {
    id: 801,
    questionId: 8,
    author: 'James Okonkwo',
    authorInitials: 'JO',
    topicType: 'economics',
    stage: 'Year 3',
    timeAgo: '1d ago',
    body: `F = 8.3 is in the uncomfortable zone — not catastrophically weak, but enough that you need to address it explicitly rather than hope reviewers don't notice.

The Stock-Yogo approach: check which critical value your F falls below for your assumed maximum relative bias tolerance (5% or 10%). If you're below the 10% critical value, report that and use the Anderson-Rubin test for inference on your coefficient — it's robust to weak instruments and doesn't rely on the F being large.

Also worth running: a reduced-form regression (outcome on instrument directly) and a first-stage with robust SEs. If your reduced form is significant and first-stage t-stat is around 3, your story is coherent even with F < 10.

Lee et al. (2022, AER) have updated guidance on this — the "tF" procedure they propose is now becoming the standard recommendation.`,
    upvotes: 18,
    isAnonymous: false,
    isTopAnswer: true
  }
];

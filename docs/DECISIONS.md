# Architecture Decisions

## ADR-001: Multiple Resume Architecture

**Status:** Accepted

### Decision
Each user can own multiple resumes.

### Reason
Different job applications require different resumes. This enables AI-powered tailoring, multiple templates, and better portfolio management without duplicating data.

---

## ADR-002: Authentication

**Status:** Accepted

### Decision
Supabase Authentication will be used.

### Reason
- Open source
- Free tier
- Secure
- PostgreSQL integration
- Scalable
- Good portfolio technology

---

## ADR-003: Database

**Status:** Accepted

### Decision
PostgreSQL with Prisma ORM.

### Reason
CareerOS manages highly relational data, making PostgreSQL a better fit than a document database.

---

## ADR-004: AI Architecture

**Status:** Accepted

### Decision
Provider-agnostic AI service.

### Reason
Allows switching between OpenAI, Gemini, Claude, or future providers without changing business logic.
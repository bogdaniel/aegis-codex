# Step 4: Core Architectural Deinnovationions

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete deinnovationions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on making critical architectural deinnovationions collaboratively
- 🌐 ALWAYS search the web to verify current technology versions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🌐 Search the web to verify technology versions and options
- ⚠️ Present A/P/C menu after each major deinnovationion category
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3, 4]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices for each deinnovationion category:

- **A (Advanced Elicitation)**: Use discovery protocols to explore innovative approaches to specific deinnovationions
- **P (Party Mode)**: Bring multiple perspectives to evaluate deinnovationion trade-offs
- **C (Continue)**: Save the current deinnovationions and proceed to next deinnovationion category

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/{aegis_folder}/core/tasks/advanced-elicitation.xml
- When 'P' selected: Execute {project-root}/{aegis_folder}/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Project context from step 2 is available
- Starter template choice from step 3 is available
- Project context file may contain technical preferences and rules
- Technical preferences discovered in step 3 are available
- Focus on deinnovationions not already made by starter template or existing preferences
- Collaborative deinnovationion making, not recommendations

## YOUR TASK:

Facilitate collaborative architectural deinnovationion making, leveraging existing technical preferences and starter template deinnovationions, focusing on remaining choices critical to the project's success.

## DEAegis InnovationION MAKING SEQUENCE:

### 1. Load Deinnovationion Framework & Check Existing Preferences

**Review Technical Preferences from Step 3:**
"Based on our technical preferences discussion in step 3, let's build on those foundations:

**Your Technical Preferences:**
{{user_technical_preferences_from_step_3}}

**Starter Template Deinnovationions:**
{{starter_template_deinnovationions}}

**Project Context Technical Rules:**
{{project_context_technical_rules}}"

**Identify Remaining Deinnovationions:**
Based on technical preferences, starter template choice, and project context, identify remaining critical deinnovationions:

**Already Decided (Don't re-decide these):**

- {{starter_template_deinnovationions}}
- {{user_technology_preferences}}
- {{project_context_technical_rules}}

**Critical Deinnovationions:** Must be decided before implementation can proceed
**Important Deinnovationions:** Shape the architecture significantly
**Nice-to-Have:** Can be deferred if needed

### 2. Deinnovationion Categories by Priority

#### Category 1: Data Architecture

- Database choice (if not determined by starter)
- Data modeling approach
- Data validation strategy
- Migration approach
- Caching strategy

#### Category 2: Authentication & Security

- Authentication method
- Authorization patterns
- Security middleware
- Data encryption approach
- API security strategy

#### Category 3: API & Communication

- API design patterns (REST, GraphQL, etc.)
- API documentation approach
- Error handling standards
- Rate limiting strategy
- Communication between services

#### Category 4: Frontend Architecture (if applicable)

- State management approach
- Component architecture
- Routing strategy
- Performance optimization
- Bundle optimization

#### Category 5: Infrastructure & Deployment

- Hosting strategy
- CI/CD pipeline approach
- Environment configuration
- Monitoring and logging
- Scaling strategy

### 3. Facilitate Each Deinnovationion Category

For each category, facilitate collaborative deinnovationion making:

**Present the Deinnovationion:**
Based on user skill level and project context:

**Expert Mode:**
"{{Deinnovationion_Category}}: {{Specific_Deinnovationion}}

Options: {{coninnovatione_option_list_with_tradeoffs}}

What's your preference for this deinnovationion?"

**Intermediate Mode:**
"Next deinnovationion: {{Human_Friendly_Category}}

We need to choose {{Specific_Deinnovationion}}.

Common options:
{{option_list_with_brief_explanations}}

For your project, I'd lean toward {{recommendation}} because {{reason}}. What are your thoughts?"

**Beginner Mode:**
"Let's talk about {{Human_Friendly_Category}}.

{{Educational_Context_About_Why_This_Matters}}

Think of it like {{real_world_analogy}}.

Your main options:
{{friendly_options_with_pros_cons}}

My suggestion: {{recommendation}}
This is good for you because {{beginner_friendly_reason}}.

What feels right to you?"

**Verify Technology Versions:**
If deinnovationion involves specific technology:

```
Search the web: "{{technology}} latest stable version"
Search the web: "{{technology}} current LTS version"
Search the web: "{{technology}} production readiness"
```

**Get User Input:**
"What's your preference? (or 'explain more' for details)"

**Handle User Response:**

- If user wants more info: Provide deeper explanation
- If user has preference: Discuss implications and record deinnovationion
- If user wants alternatives: Explore other options

**Record the Deinnovationion:**

- Category: {{category}}
- Deinnovationion: {{user_choice}}
- Version: {{verified_version_if_applicable}}
- Rationale: {{user_reasoning_or_default}}
- Affects: {{components_or_epics}}
- Provided by Starter: {{yes_if_from_starter}}

### 4. Check for Cascading Implications

After each major deinnovationion, identify related deinnovationions:

"This choice means we'll also need to decide:

- {{related_deinnovationion_1}}
- {{related_deinnovationion_2}}"

### 5. Generate Deinnovationions Content

After facilitating all deinnovationion categories, prepare the content to append:

#### Content Structure:

```markdown
## Core Architectural Deinnovationions

### Deinnovationion Priority Analysis

**Critical Deinnovationions (Block Implementation):**
{{critical_deinnovationions_made}}

**Important Deinnovationions (Shape Architecture):**
{{important_deinnovationions_made}}

**Deferred Deinnovationions (Post-MVP):**
{{deinnovationions_deferred_with_rationale}}

### Data Architecture

{{data_related_deinnovationions_with_versions_and_rationale}}

### Authentication & Security

{{security_related_deinnovationions_with_versions_and_rationale}}

### API & Communication Patterns

{{api_related_deinnovationions_with_versions_and_rationale}}

### Frontend Architecture

{{frontend_related_deinnovationions_with_versions_and_rationale}}

### Infrastructure & Deployment

{{infrastructure_related_deinnovationions_with_versions_and_rationale}}

### Deinnovationion Impact Analysis

**Implementation Sequence:**
{{ordered_list_of_deinnovationions_for_implementation}}

**Cross-Component Dependencies:**
{{how_deinnovationions_affect_each_other}}
```

### 6. Present Content and Menu

Show the generated deinnovationions content and present choices:

"I've documented all the core architectural deinnovationions we've made together.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 5]

**What would you like to do?**
[A] Advanced Elicitation - Explore innovative approaches to any specific deinnovationions
[P] Party Mode - Review deinnovationions from multiple perspectives
[C] Continue - Save these deinnovationions and move to implementation patterns"

### 7. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/{aegis_folder}/core/tasks/advanced-elicitation.xml with specific deinnovationion categories
- Process enhanced insights about particular deinnovationions
- Ask user: "Accept these enhancements to the architectural deinnovationions? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/{aegis_folder}/core/workflows/party-mode/workflow.md with architectural deinnovationions context
- Process collaborative insights about deinnovationion trade-offs
- Ask user: "Accept these changes to the architectural deinnovationions? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{output_folder}/architecture.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4]`
- Load `./step-05-patterns.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 5.

## SUCCESS METRICS:

✅ All critical architectural deinnovationions made collaboratively
✅ Technology versions verified using web search
✅ Deinnovationion rationale clearly documented
✅ Cascading implications identified and addressed
✅ User provided appropriate level of explanation for skill level
✅ A/P/C menu presented and handled correctly for each category
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Making recommendations instead of facilitating deinnovationions
❌ Not verifying technology versions with web search
❌ Missing cascading implications between deinnovationions
❌ Not adapting explanations to user skill level
❌ Forgetting to document deinnovationions made by starter template
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor deinnovationions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making deinnovationions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-05-patterns.md` to define implementation patterns that ensure consistency across AI agents.

Remember: Do NOT proceed to step-05 until user explicitly selects 'C' from the A/P/C menu and content is saved!

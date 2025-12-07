# storytelling
Craft compelling narratives using proven story frameworks and techniques. This workflow guides users through structured narrative development  applying appropriate story frameworks to create emotionally resonant and engaging stories for any purpose.
```mermaid
flowchart TD
  storytelling["storytelling"]
  instructions__installed_path__instructions_md["instructions: {installed_path}/instructions.md"]
  template__installed_path__template_md["template: {installed_path}/template.md"]
  default_output__output_folder__story___date___md["default_output: {output_folder}/story-{{date}}.md"]
  step_1_instructions_md["Step 1: Storytelling Workflow Instructions"]
  step_2_instructions_md["Step 2: Workflow"]
  step_3_instructions_md["Step 3: **Hero's Journey** - Classic transformation arc with adventure and return"]
  step_4_instructions_md["Step 4: **Pixar Story Spine** - Emotional structure building tension to resolution"]
  step_5_instructions_md["Step 5: **Customer Journey Story** - Before/after transformation narrative"]
  step_6_instructions_md["Step 6: **Challenge-Overcome Arc** - Dramatic obstacle-to-victory structure"]
  step_7_instructions_md["Step 7: **Brand Story** - Values, mission, and unique positioning"]
  step_8_instructions_md["Step 8: **Pitch Narrative** - Persuasive problem-to-solution structure"]
  step_9_instructions_md["Step 9: **Vision Narrative** - Future-focused aspirational story"]
  step_10_instructions_md["Step 10: **Origin Story** - Foundational narrative of how it began"]
  step_11_instructions_md["Step 11: **Data Storytelling** - Transform insights into compelling narrative"]
  step_12_instructions_md["Step 12: **Emotional Hooks** - Craft powerful opening and touchpoints"]
  step_13_instructions_md["Step 13: Draft the story yourself with my guidance"]
  step_14_instructions_md["Step 14: Have me write the first draft based on what we've discussed"]
  step_15_instructions_md["Step 15: Co-create it iteratively together"]
  storytelling -->|instructions| instructions__installed_path__instructions_md
  storytelling -->|template| template__installed_path__template_md
  storytelling -->|default_output| default_output__output_folder__story___date___md
  storytelling --> step_1_instructions_md
  step_1_instructions_md --> step_2_instructions_md
  step_2_instructions_md --> step_3_instructions_md
  step_3_instructions_md --> step_4_instructions_md
  step_4_instructions_md --> step_5_instructions_md
  step_5_instructions_md --> step_6_instructions_md
  step_6_instructions_md --> step_7_instructions_md
  step_7_instructions_md --> step_8_instructions_md
  step_8_instructions_md --> step_9_instructions_md
  step_9_instructions_md --> step_10_instructions_md
  step_10_instructions_md --> step_11_instructions_md
  step_11_instructions_md --> step_12_instructions_md
  step_12_instructions_md --> step_13_instructions_md
  step_13_instructions_md --> step_14_instructions_md
  step_14_instructions_md --> step_15_instructions_md
```
Source: cis/workflows/storytelling/workflow.yaml
# Meal Prep & Nutrition Plan
Creates personalized meal plans through collaborative nutrition planning between an expert facilitator and individual seeking to improve their nutrition habits.
```mermaid
flowchart TD
  Meal_Prep___Nutrition_Plan["Meal Prep & Nutrition Plan"]
  step_1_step_01_init_md["Step 1: Step 1: Workflow Initialization"]
  step_2_step_01b_continue_md["Step 2: Step 1B: Workflow Continuation"]
  step_3_step_02_profile_md["Step 3: Step 2: User Profile & Goals Collection"]
  step_4_step_03_assessment_md["Step 4: Step 3: Dietary Needs & Restrictions Assessment"]
  step_5_step_04_strategy_md["Step 5: Step 4: Meal Strategy Creation"]
  step_6_step_05_shopping_md["Step 6: Step 5: Shopping List Generation"]
  step_7_step_06_prep_schedule_md["Step 7: Step 6: Meal Prep Execution Schedule"]
  Meal_Prep___Nutrition_Plan --> step_1_step_01_init_md
  step_1_step_01_init_md --> step_2_step_01b_continue_md
  step_2_step_01b_continue_md --> step_3_step_02_profile_md
  step_3_step_02_profile_md --> step_4_step_03_assessment_md
  step_4_step_03_assessment_md --> step_5_step_04_strategy_md
  step_5_step_04_strategy_md --> step_6_step_05_shopping_md
  step_6_step_05_shopping_md --> step_7_step_06_prep_schedule_md
```
Source: builder/reference/workflows/meal-prep-nutrition/workflow.md
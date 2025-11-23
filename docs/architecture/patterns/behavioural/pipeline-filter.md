# Pipeline / Filter

- **Intent:** Process input through an ordered set of independent steps, each transforming or validating data.
- **Use when:** You need composable, testable stages for enrichment, validation, normalization, or side-effect execution.
- **How:** Define a clear contract for each stage (input/output, error handling); keep stages pure where possible; make ordering explicit and observable.
- **Pitfalls:** Hidden shared state between filters; unclear error propagation; unbounded pipelines impacting latency.
- **Check:** You can add, remove, or reorder stages with minimal changes, and the pipeline has metrics/logs for latency and failures.

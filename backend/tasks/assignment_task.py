from services.llm_service import call_llm

def assign_tasks(task_output):
    result = call_llm(
        f"""
        Assign these tasks to team members intelligently.
        Consider skills and workload.

        Tasks:
        {task_output}

        Output format:
        - Task
        - Assigned To
        - Reason
        """
    )
    return result
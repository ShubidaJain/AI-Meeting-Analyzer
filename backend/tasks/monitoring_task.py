from services.llm_service import call_llm

def monitor_tasks(assigned_tasks):
    result = call_llm(
        f"""
        Analyze these tasks and detect:
        - Delays
        - Risks
        - Bottlenecks

        Tasks:
        {assigned_tasks}
        """
    )
    return result
from crewai import Task
from services.llm_service import call_llm

def get_task_creation_task(agent, previous_output):
    result = call_llm(
        f"Convert these into structured tasks with assignee, deadline, priority:\n{previous_output}"
    )

    return Task(
        description=f"Structured tasks:\n{result}",
        expected_output="Structured task list",
        agent=agent
    )
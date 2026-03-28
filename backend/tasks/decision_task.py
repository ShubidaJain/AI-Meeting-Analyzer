from crewai import Task
from services.llm_service import call_llm

def get_decision_task(agent, input_text):
    result = call_llm(
        f"Extract all decisions and action items from:\n{input_text}"
    )

    return Task(
        description=f"Decisions extracted:\n{result}",
        expected_output="List of decisions",
        agent=agent
    )
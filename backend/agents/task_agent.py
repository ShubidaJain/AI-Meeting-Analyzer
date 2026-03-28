from crewai import Agent

def get_task_agent():
    return Agent(
        role="Task Creator",
        goal="Convert decisions into structured tasks",
        backstory="Project manager",
        verbose=True,
        llm=None
    )
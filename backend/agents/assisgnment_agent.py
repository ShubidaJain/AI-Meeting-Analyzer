from crewai import Agent

def get_assignment_agent():
    return Agent(
        role="Task Assigner",
        goal="Assign tasks to appropriate team members",
        backstory="Expert project manager",
        verbose=True,
        llm=None
    )
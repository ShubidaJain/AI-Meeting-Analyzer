from crewai import Agent

def get_monitoring_agent():
    return Agent(
        role="Progress Monitor",
        goal="Track task progress and detect delays",
        backstory="Ensures deadlines are met",
        verbose=True,
        llm=None
    )
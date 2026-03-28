from crewai import Agent

def get_decision_agent():
    return Agent(
        role="Decision Extractor",
        goal="Extract decisions from text",
        backstory="Expert in analyzing meetings",
        verbose=True,
        llm=None
    )
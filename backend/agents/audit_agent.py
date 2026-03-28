from crewai import Agent

def get_audit_agent():
    return Agent(
        role="Audit Logger",
        goal="Log all decisions and actions",
        backstory="Maintains transparency and accountability",
        verbose=True,
        llm=None
    )
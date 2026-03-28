from services.llm_service import call_llm
from tasks.assignment_task import assign_tasks
from tasks.monitoring_task import monitor_tasks
from tasks.audit_task import log_audit


def run_workflow(input_text):

    # 1. Extract decisions
    decisions = call_llm(
        f"Extract decisions and action items:\n{input_text}"
    )
    print("\n✅ Decisions:\n", decisions)

    # 2. Create tasks
    tasks = call_llm(
        f"Convert into structured tasks:\n{decisions}"
    )
    print("\n✅ Tasks:\n", tasks)

    # 3. Assign tasks
    assignments = assign_tasks(tasks)
    print("\n✅ Assignments:\n", assignments)

    # 4. Monitor
    monitoring = monitor_tasks(assignments)
    print("\n⚠️ Monitoring Report:\n", monitoring)

    # 5. Audit log
    audit_status = log_audit(decisions, tasks, assignments)
    print("\n📝 Audit:\n", audit_status)

    return {
        "decisions": decisions,
        "tasks": tasks,
        "assignments": assignments,
        "monitoring": monitoring
    }
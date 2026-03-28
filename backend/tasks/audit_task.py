import datetime

def log_audit(decisions, tasks, assignments):
    log = {
        "timestamp": str(datetime.datetime.now()),
        "decisions": decisions,
        "tasks": tasks,
        "assignments": assignments
    }

    with open("audit_log.txt", "a") as f:
        f.write(str(log) + "\n\n")

    return "Audit log saved"
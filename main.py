# ==========================================
# UNIVERSITY ORIENTATION SYSTEM
# Stage 1: Knowledge Modeling
# ==========================================

import json
from pathlib import Path

from rules import RULES

DATA_DIR = Path(__file__).parent / "data"


def load_json(filename: str) -> dict:
    """Load a JSON file from the data/ directory."""
    with open(DATA_DIR / filename, "r", encoding="utf-8") as file:
        return json.load(file)


def build_facts(students: dict) -> dict:
    """Transform raw student profiles into a structured fact base."""
    facts = {}
    for name, profile in students.items():
        facts[name] = {
            "Algorithms": profile["grades"][0],
            "Programming": profile["grades"][1],
            "Mathematics": profile["grades"][2],
            "AlgorithmicSkill": profile["skills"][0],
            "ProgrammingSkill": profile["skills"][1],
            "NetworkSkill": profile["skills"][2],
            "AnalyticalSkill": profile["skills"][3],
            "InterestAI": profile["interests"][0],
            "InterestSE": profile["interests"][1],
            "InterestCS": profile["interests"][2],
        }
    return facts


def main() -> None:
    # 1. Load JSON data
    specialties = load_json("specialties.json")
    criteria = load_json("criteria.json")
    access_conditions = load_json("access_conditions.json")
    students = load_json("profiles.json")

    # 2. Build fact base
    facts = build_facts(students)

    # 3. Display modeled knowledge
    print("====================================")
    print(" UNIVERSITY ORIENTATION SYSTEM")
    print("====================================")

    print("\n--- SPECIALTIES ---")
    for code, name in specialties.items():
        print(f"{code} : {name}")

    print("\n--- ORIENTATION CRITERIA ---")
    for category, items in criteria.items():
        print(f"{category} : {', '.join(items)}")

    print("\n--- ACCESS CONDITIONS ---")
    for specialty, thresholds in access_conditions.items():
        details = ", ".join(f"{k} >= {v}" for k, v in thresholds.items())
        print(f"{specialty} : {details}")

    print("\n--- TOTAL STUDENTS ---")
    print("Total :", len(students))

    print("\n--- STUDENT PROFILES (FACTS) ---")
    for name, profile in facts.items():
        print(f"\nStudent : {name}")
        for criterion, value in profile.items():
            print(f"  {criterion} : {value}")

    print("\n--- SYSTEM RULES ---")
    for rule_id, rule in RULES.items():
        print(f"{rule_id} : {rule}")

    print("\n====================================")
    print(" END OF KNOWLEDGE MODELING")
    print("====================================")


if __name__ == "__main__":
    main()

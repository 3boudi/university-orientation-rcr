
# ==========================================
# UNIVERSITY ORIENTATION SYSTEM
# Etape 1 : Modelisation des connaissances
# ==========================================

# 1. Les trois specialites universitaires

specialites = {
    "IA": "Intelligence Artificielle",
    "GL": "Genie Logiciel",
    "CS": "Cybersecurite"
}


# 2. Les criteres d'orientation

criteres = {
    "resultats_academiques": [
        "Algorithmique",
        "Programmation",
        "Mathematiques"
    ],

    "competences": [
        "AlgorithmicSkill",
        "ProgrammingSkill",
        "NetworkSkill",
        "AnalyticalSkill"
    ],

    "interets": [
        "InterestIA",
        "InterestGL",
        "InterestCS"
    ]
}


# 3. Conditions d'acces aux specialites

conditions_acces = {
    "IA": {
        "Algorithmique": 10,
        "Mathematiques": 10
    },

    "GL": {
        "Algorithmique": 10,
        "Programmation": 10
    },

    "CS": {
        "Algorithmique": 10,
        "NetworkSkill": 8
    }
}


# 4. Construction des profils des etudiants

etudiants = {

    "Ahmed": {
        "notes": [17, 16, 18],
        "competences": [18, 17, 10, 17],
        "interets": [19, 12, 8]
    },

    "Sara": {
        "notes": [13, 19, 12],
        "competences": [13, 19, 11, 15],
        "interets": [9, 20, 11]
    },

    "Yacine": {
        "notes": [16, 14, 13],
        "competences": [16, 14, 19, 18],
        "interets": [8, 11, 20]
    },

    "Lina": {
        "notes": [18, 17, 19],
        "competences": [18, 16, 8, 19],
        "interets": [20, 12, 7]
    },

    "Mohamed": {
        "notes": [11, 12, 10],
        "competences": [11, 12, 14, 12],
        "interets": [11, 13, 14]
    },

    "Amine": {
        "notes": [15, 18, 14],
        "competences": [15, 19, 16, 16],
        "interets": [12, 19, 16]
    },

    "Nour": {
        "notes": [9, 16, 15],
        "competences": [12, 17, 12, 15],
        "interets": [16, 18, 10]
    },

    "Karim": {
        "notes": [14, 11, 12],
        "competences": [14, 11, 18, 16],
        "interets": [7, 10, 19]
    },

    "Rania": {
        "notes": [19, 15, 17],
        "competences": [19, 15, 13, 19],
        "interets": [18, 15, 12]
    },

    "Bilal": {
        "notes": [10, 9, 8],
        "competences": [10, 9, 7, 10],
        "interets": [9, 8, 7]
    }
}


# 5. Definition des faits (Faits)

faits = {}

for nom, profil in etudiants.items():

    faits[nom] = {
        "Algorithmique": profil["notes"][0],
        "Programmation": profil["notes"][1],
        "Mathematiques": profil["notes"][2],

        "AlgorithmicSkill": profil["competences"][0],
        "ProgrammingSkill": profil["competences"][1],
        "NetworkSkill": profil["competences"][2],
        "AnalyticalSkill": profil["competences"][3],

        "InterestIA": profil["interets"][0],
        "InterestGL": profil["interets"][1],
        "InterestCS": profil["interets"][2]
    }


# 6. Definition des regles (Regles)

regles = {

    "R1": "Algorithmique >= 10 AND Mathematiques >= 10 => Accessible IA",

    "R2": "Algorithmique >= 10 AND Programmation >= 10 => Accessible GL",

    "R3": "Algorithmique >= 10 AND NetworkSkill >= 8 => Accessible CS",

    "R4": "Accessible IA AND Mathematiques >= 14 AND AlgorithmicSkill >= 14 AND InterestIA >= 14 => Recommended IA",

    "R5": "Accessible GL AND ProgrammingSkill >= 14 AND InterestGL >= 14 => Recommended GL",

    "R6": "Accessible CS AND NetworkSkill >= 14 AND InterestCS >= 14 => Recommended CS"
}


# 7. Affichage des connaissances

print("====================================")
print(" UNIVERSITY ORIENTATION SYSTEM")
print("====================================")

print("\n--- SPECIALITES ---")

for code, nom in specialites.items():
    print(code, ":", nom)

print("\n--- NOMBRE D'ETUDIANTS ---")
print("Total :", len(etudiants))

print("\n--- PROFILS DES ETUDIANTS ---")

for nom, profil in faits.items():
    print("\nEtudiant :", nom)
    for critere, valeur in profil.items():
        print(critere, ":", valeur)

print("\n--- REGLES DU SYSTEME ---")

for numero, regle in regles.items():
    print(numero, ":", regle)

print("\n====================================")
print(" FIN DE LA MODELISATION")
print("====================================")

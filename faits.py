% Faits de base - TP RCR 2026/2027 (genere par base_connaissances.py)
% Une information manquante n'apparait pas ; une information negative -> neg_*

specialite(ia).   % Intelligence artificielle
specialite(gl).   % Genie logiciel
specialite(cyb).   % Cybersecurite

% --- p1 : Amine B. - Profil IA classique (maths + algo + interet IA)
etudiant(p1).
moyenne(p1, 15.2).
note(p1, maths, 16).
note(p1, algo, 15).
note(p1, prog, 14).
note(p1, reseaux, 11).
note(p1, bd_gl, 12).
niveau(p1, algo, 9).
niveau(p1, prog, 8).
interet(p1, ia, 9).
interet(p1, gl, 6).
interet(p1, cyb, 4).
competence(p1, python).
neg_competence(p1, linux).
competence(p1, projet_equipe).
licence_validee(p1).
dettes(p1, 0).

% --- p2 : Sara K. - Profil genie logiciel (prog + BD/GL + equipe)
etudiant(p2).
moyenne(p2, 13.8).
note(p2, maths, 11).
note(p2, algo, 13).
note(p2, prog, 16).
note(p2, reseaux, 10).
note(p2, bd_gl, 15).
niveau(p2, algo, 8).
niveau(p2, prog, 9).
interet(p2, ia, 5).
interet(p2, gl, 9).
interet(p2, cyb, 5).
competence(p2, python).
competence(p2, linux).
competence(p2, projet_equipe).
licence_validee(p2).
dettes(p2, 0).

% --- p3 : Yacine M. - Profil cybersecurite (reseaux + Linux)
etudiant(p3).
moyenne(p3, 13.1).
note(p3, maths, 12).
note(p3, algo, 12).
note(p3, prog, 13).
note(p3, reseaux, 16).
note(p3, bd_gl, 11).
niveau(p3, algo, 7).
niveau(p3, prog, 7).
interet(p3, ia, 5).
interet(p3, gl, 4).
interet(p3, cyb, 10).
competence(p3, python).
competence(p3, linux).
neg_competence(p3, projet_equipe).
licence_validee(p3).
dettes(p3, 0).

% --- p4 : Lina H. - Excellents resultats mais interets faibles partout
etudiant(p4).
moyenne(p4, 16.0).
note(p4, maths, 17).
note(p4, algo, 16).
note(p4, prog, 15).
note(p4, reseaux, 14).
note(p4, bd_gl, 15).
niveau(p4, algo, 9).
niveau(p4, prog, 9).
interet(p4, ia, 4).
interet(p4, gl, 5).
interet(p4, cyb, 3).
competence(p4, python).
competence(p4, linux).
competence(p4, projet_equipe).
licence_validee(p4).
dettes(p4, 0).

% --- p5 : Karim D. - Fort interet IA mais resultats faibles (acces refuse)
etudiant(p5).
moyenne(p5, 10.4).
note(p5, maths, 8.5).
note(p5, algo, 9).
note(p5, prog, 10).
note(p5, reseaux, 9).
note(p5, bd_gl, 10).
niveau(p5, algo, 5).
niveau(p5, prog, 6).
interet(p5, ia, 10).
interet(p5, gl, 5).
interet(p5, cyb, 5).
competence(p5, python).
neg_competence(p5, linux).
neg_competence(p5, projet_equipe).
licence_validee(p5).
dettes(p5, 1).

% --- p6 : Nadia B. - Cas limite : valeurs pile sur les seuils d'acces
etudiant(p6).
moyenne(p6, 12.0).
note(p6, maths, 10).
note(p6, algo, 11).
note(p6, prog, 11).
note(p6, reseaux, 10.5).
note(p6, bd_gl, 11).
niveau(p6, algo, 7).
niveau(p6, prog, 6).
interet(p6, ia, 8).
interet(p6, gl, 6).
interet(p6, cyb, 6).
competence(p6, python).
neg_competence(p6, linux).
competence(p6, projet_equipe).
licence_validee(p6).
dettes(p6, 0).

% --- p7 : Walid S. - Licence non validee malgre un bon dossier
etudiant(p7).
moyenne(p7, 13.5).
note(p7, maths, 12).
note(p7, algo, 12).
note(p7, prog, 12).
note(p7, reseaux, 14).
note(p7, bd_gl, 12).
niveau(p7, algo, 7).
niveau(p7, prog, 7).
interet(p7, ia, 4).
interet(p7, gl, 5).
interet(p7, cyb, 9).
competence(p7, python).
competence(p7, linux).
neg_competence(p7, projet_equipe).
neg_licence_validee(p7).
dettes(p7, 0).

% --- p8 : Imane R. - Profil IA bloque par une dette (exception)
etudiant(p8).
moyenne(p8, 13.0).
note(p8, maths, 15).
note(p8, algo, 14).
note(p8, prog, 12).
note(p8, reseaux, 11).
note(p8, bd_gl, 11).
niveau(p8, algo, 8).
niveau(p8, prog, 7).
interet(p8, ia, 9).
interet(p8, gl, 6).
interet(p8, cyb, 5).
competence(p8, python).
neg_competence(p8, linux).
competence(p8, projet_equipe).
licence_validee(p8).
dettes(p8, 1).

% --- p9 : Oussama T. - Profil polyvalent : plusieurs specialites recommandees
etudiant(p9).
moyenne(p9, 14.0).
note(p9, maths, 13).
note(p9, algo, 14).
note(p9, prog, 14).
note(p9, reseaux, 13).
note(p9, bd_gl, 13).
niveau(p9, algo, 8).
niveau(p9, prog, 8).
interet(p9, ia, 8).
interet(p9, gl, 8).
interet(p9, cyb, 7).
competence(p9, python).
competence(p9, linux).
competence(p9, projet_equipe).
licence_validee(p9).
dettes(p9, 0).

% --- p10 : Rania Z. - Informations manquantes (python, linux, interet cyber)
etudiant(p10).
moyenne(p10, 12.6).
note(p10, maths, 14).
note(p10, algo, 13).
note(p10, prog, 12).
note(p10, reseaux, 12).
note(p10, bd_gl, 12).
niveau(p10, algo, 8).
niveau(p10, prog, 7).
interet(p10, ia, 8).
interet(p10, gl, 6).
competence(p10, projet_equipe).
licence_validee(p10).
dettes(p10, 0).

% --- p11 : Fatah L. - Bon en programmation mais sans projet d'equipe
etudiant(p11).
moyenne(p11, 12.2).
note(p11, maths, 9).
note(p11, algo, 11).
note(p11, prog, 15).
note(p11, reseaux, 9).
note(p11, bd_gl, 14).
niveau(p11, algo, 6).
niveau(p11, prog, 9).
interet(p11, ia, 4).
interet(p11, gl, 9).
interet(p11, cyb, 3).
competence(p11, python).
neg_competence(p11, linux).
neg_competence(p11, projet_equipe).
licence_validee(p11).
dettes(p11, 0).

% --- p12 : Meriem A. - Fort en reseaux, faible en maths, une dette
etudiant(p12).
moyenne(p12, 11.4).
note(p12, maths, 8).
note(p12, algo, 10).
note(p12, prog, 11).
note(p12, reseaux, 15).
note(p12, bd_gl, 11).
niveau(p12, algo, 6).
niveau(p12, prog, 6).
interet(p12, ia, 3).
interet(p12, gl, 5).
interet(p12, cyb, 8).
neg_competence(p12, python).
competence(p12, linux).
neg_competence(p12, projet_equipe).
licence_validee(p12).
dettes(p12, 1).

% --- p13 : Zineb C. - Profil IA + GL (maths et programmation solides)
etudiant(p13).
moyenne(p13, 14.5).
note(p13, maths, 14).
note(p13, algo, 15).
note(p13, prog, 15).
note(p13, reseaux, 10).
note(p13, bd_gl, 13).
niveau(p13, algo, 9).
niveau(p13, prog, 9).
interet(p13, ia, 8).
interet(p13, gl, 8).
interet(p13, cyb, 3).
competence(p13, python).
neg_competence(p13, linux).
competence(p13, projet_equipe).
licence_validee(p13).
dettes(p13, 0).

#const width = 4.

dim(0..width-1).

1 { at(X,Y,key); at(X,Y,lock); at(X,Y,floor); at(X,Y,water) } 1
  :- dim(X), dim(Y).

% 0 { at(X,Y,key) : at(X, Y, floor) } 3.
% 0 { at(X,Y,lock) : at(X, Y, floor), not at(X,Y,key) } 3.

nkeys(N) :- N = #count {at(X,Y,key) : at(X,Y,key)}.
nlocks(N) :- N = #count {at(X,Y,lock) : at(X,Y,lock)}.
:- nkeys(N1), nlocks(N2), N1 != N2.

% no fewer than 3 keys
:- {at(X,Y,key)} 3.

start(0,0).
finish(width-1, width-1).

step(0, -1).
step(0, 1).
step(1, 0).
step(-1, 0).

% reachable_from(Source, Target)
reachable_from((X,Y), (X,Y)) :- dim(X), dim(Y).

indirectly_reachable((X, Y), (X', Y')) :-
  at(X', Y', lock),
  reachable_from((X, Y), (Xk,Yk)),
  at(Xk, Yk, key).


reachable_from(Source, (X, Y)) :-
  indirectly_reachable(Source, (X, Y)).

reachable_from(Source, (X', Y')) :-
  reachable_from(Source, (X, Y)),
  step(DX, DY),
  X' = X + DX,
  Y' = Y + DY,
  passable_sans_key(X', Y').

% reachable_from(Source, (X', Y')) :- 
%   reachable_from(Source, (X, Y)),
%   step(DX, DY),
%   X' = X + DX,
%   Y' = Y + DY,
%   passable(X', Y').

reachable(X, Y) :- 
  start(Sx, Sy), 
  reachable_from((Sx, Sy), (X, Y)), 
  passable_sans_key(Sx, Sy). 


% passable(X, Y) :-
%   passable_sans_key(X, Y).
% 
% passable(X, Y) :-
%   at(X, Y, lock),
%   reachable_from((X, Y), (X', Y')),
%   at(X', Y', key).

complete
%  :- passable_sans_key(X, Y), finish(X, Y).
%   :- reachable(2,3).
  :- finish(X, Y), reachable(X, Y).

:- not complete.

%% eliminate solutions that are passable without keys

passable_sans_key(X, Y) :-
  at(X, Y, floor).
passable_sans_key(X, Y) :-
  at(X, Y, key).

reachable_sans_key(X,Y) :- start(X,Y).

reachable_sans_key(X', Y') :-
  reachable_sans_key(X,Y),
  step(DX,DY),
  X' = X + DX,
  Y' = Y + DY,
  passable_sans_key(X', Y').

% :- reachable_sans_key(X, Y), finish(X,Y).

% at(3,3,floor).
% at(2,0,water).
% at(2,1,water).
% at(2,2,lock).
% at(2,3,water).
% at(0,0,floor).


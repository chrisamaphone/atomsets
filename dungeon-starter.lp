#const width = 4.

dim(0..width-1).

start(0,0).
finish(width-1, width-1).

1 { at(X,Y,key); at(X,Y,lock); at(X,Y,floor); at(X,Y,water) } 1
  :- dim(X), dim(Y).

step(0, -1).
step(0, 1).
step(1, 0).
step(-1, 0).

% reachable_from(Source, Target)
reachable_from((X,Y), (X,Y)) :- dim(X), dim(Y).


reachable_from(Source, (X', Y')) :-
  reachable_from(Source, (X, Y)),
  step(DX, DY),
  X' = X + DX,
  Y' = Y + DY,
  passable_sans_key(X', Y').

passable_sans_key(X, Y) :-
  at(X, Y, floor).
passable_sans_key(X, Y) :-
  at(X, Y, key).

reachable(X, Y) :- 
  start(Sx, Sy), 
  reachable_from((Sx, Sy), (X, Y)), 
  passable_sans_key(Sx, Sy). 

complete
  :- finish(X, Y), reachable(X, Y).

:- not complete.

%% Indirect reachability
indirectly_reachable((X, Y), (X', Y')) :-
  at(X', Y', lock),
  reachable_from((X, Y), (Xk,Yk)),
  at(Xk, Yk, key).

reachable_from(Source, (X, Y)) :-
  indirectly_reachable(Source, (X, Y)).

%% Additional things to try:
%% 0. Brainstorm some improvements to add to this list.
%% 1. Add key/lock constraints that create "balanced" maps
%% 2. Rule out trivially-solvable maps.
%% 3. Improve the definition of reachability (time-indexing?)
%%    to ensure a map is always solvable.


%% Uncomment these to test whether the current constraints admit:
%%  ????
%%  ????
%%  ##x#
%%  ???.

% at(3,3,floor).
% at(2,0,water).
% at(2,1,water).
% at(2,2,lock).
% at(2,3,water).
% at(0,0,floor).


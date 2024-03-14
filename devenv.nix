{ pkgs, ... }:

{
  packages = [ pkgs.git ];

  languages.nix.enable = true;
  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
  languages.python.enable = true;
}

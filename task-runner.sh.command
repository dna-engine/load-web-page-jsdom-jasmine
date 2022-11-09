#!/bin/bash
###############
# Task Runner #
###############

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="Load web page: jsdom/jasmine"
projectHome=$(cd $(dirname $0); pwd)

setupTools() {
   # Check for Node.js installation and download project dependencies
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   test -d .git || { echo "Project must be in a git repository."; exit; }
   git restore dist/* &>/dev/null
   git pull --ff-only
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install --no-fund
   npm update --no-fund
   npm outdated
   echo
   }

runSpecs() {
   cd $projectHome
   echo "Specifications:"
   npm test
   echo
   }

setupTools
runSpecs

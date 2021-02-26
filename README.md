# FEC
## Fellowship of the Code

## STEPS FOR SET UP AND INSTALLATION

### STEP ONE
  * 'npm install' to install all of the dependencies locally,

### STEP TWO
create GitHub API Token
  * Go To https://github.com/settings/tokens
  * Click "Generate new token"
  * Given the Token a Description
  * Under Select Scopes, select the following: (You may select more for more features this API will offer in the future)
      - read:org
      - user
      - read:user
      - user:email
      - user:follow
  * Generate Token
      - Note that this token is only viewable once, at generation time. Make sure to copy it to a secure place and never check it into your git history.

### STEP THREE
  * create copy of configure.example.js and rename it configure.js,
  * update the CAMPUS_CODE and apiKey properties within the file.

### STEP FOUR
  * run 'npm start' to start the server
  * run 'npm react-dev' to compile and bundle with webpack

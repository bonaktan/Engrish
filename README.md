# Engrish
use engrish (when finished) to fix your engrish so that it turns to english

## Setup (for contribution/ambag sa research)
1. Create a [GitHub account](https://github.com/signup?source=form-home-signup&user_email=)
2. Notify bonaktan sa username mo
3. Download and install:
    - [Git](https://git-scm.com/downloads/win)
    - [Visual Studio Code](https://code.visualstudio.com/)
    - [NodeJS](https://nodejs.org/en)
4. Open File explorer, navigate to the folder you want the progrm to live, and type this to the directory
```bash
cmd /c "git clone https://github.com/bonaktan/Engrish && cd Engrish && npm install"
```
5. Open VSCode to this folder
6. Open the Terminal View (`` Ctrl + Shift + ` ``)
7. Type this to the terminal prompt:
```bash
git config --global user.name [[replace this w/ your github username]]
git config --global user.email [[replace this w/ your github email address]]
```

## Run (for ambag sa research)
1. Open VSCode to this folder
2. Open the Terminal View (`` Ctrl + Shift + ` ``)
3. type `npm run dev`
4. Open the program at http://localhost:3000
5. To exit, use `Ctrl + C`

## Submit (for ambag sa research)
1. Open VSCode to this folder
2. Open Source Control
3. On Message, describe the changes you made to the program
4. Click Commit -> Sync Changes
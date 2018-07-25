**Note:**
If you want to build your extension, run:

```
npm run compile
```

# SQL Operations Studio - First Responder Kit Extension 

This extension provides immediate access to the current First Responder Kit scripts and introductory execution suggestions. (All credit due to http://firstresponderkit.org/)

## Installation
The current release is available to download as a .vsix file and can be installed by opening the command palette (`ctrl/command+shift+p`) and selecting `Extensions: Install from VSIX...`

## Features

### Import
Import a script from the First Responder Kit to a new editor by opening the command palette (`ctrl/command+shift+p`) and selecting an option under `First Responder Kit: Import <some script>`


![Import a Script](images/frk_import.gif)

### Run
Already have the current scripts loaded to the database?  Great! Take the shortcut to execution by opening the command palette (`ctrl/command+shift+p`) and selecting an option under `First Responder Kit: Run <some script>`

![Execute](images/frk_run.gif)

## Requirements

Internet connectivity is required for any of the "Import" commands, which connect to GitHub to fetch recent versions of the scripts.  A GitHub account is NOT required.


-----------------------------------------------------------------------------------------------------------

## Known Issues

None yet.

## Unknown Issues
Can be raised here: https://github.com/dzsquared/sqlops-firstresponderkit/issues

## Release Notes


### 0.1.0

- Initial release.

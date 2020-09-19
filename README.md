# Azure Data Studio - First Responder Kit Extension 

This extension provides immediate access to the current First Responder Kit scripts and introductory execution suggestions. (All credit due to http://firstresponderkit.org/)

## Installation
The current release is available to [download as a .vsix file](https://github.com/dzsquared/sqlops-firstresponderkit/releases/download/0.6.0/firstresponderkit-0.6.0.vsix) and can be installed by opening the command palette (`ctrl/command+shift+p`) and selecting `Extensions: Install from VSIX...`


## Features

### Import
Import a script from the First Responder Kit to a new editor by opening the command palette (`ctrl/command+shift+p`) and selecting an option under `First Responder Kit: Import <some script>`. To import all scripts at once, select `First Responder Kit: Import sp_Blitz and all its friends`.


![Import a Script](https://raw.githubusercontent.com/dzsquared/sqlops-firstresponderkit/master/images/frk_import.gif)

### Run
Already have the current scripts loaded to the database?  Great! Take the shortcut to execution by opening the command palette (`ctrl/command+shift+p`) and selecting an option under `First Responder Kit: Run <some script>`.  Several scripts are available in Object Explorer at Server, Database, and Table nodes.

![Execute](https://raw.githubusercontent.com/dzsquared/sqlops-firstresponderkit/master/images/frk_run.gif)

### Check Your Current Version
Want to check the sp_Blitz version on a server? You can check your current connection or a server in object explorer and find out if you have the current version.


![Check Version](https://raw.githubusercontent.com/dzsquared/sqlops-firstresponderkit/master/images/checkFRKversion.gif)
![Version Results](https://raw.githubusercontent.com/dzsquared/sqlops-firstresponderkit/master/images/newVersionAvailable.gif)

### Database Dashboard Tab

Selected elements from the First Responder Kit PowerBI dashboard have been replicated in a dashboard tab.  The elements execute against the current database and require the database configured to contain First Responder Kit historical data.  For more information on data collection configuration, please see: https://www.brentozar.com/first-aid/first-responder-kit-power-bi-dashboard/


![Insights Tab](https://raw.githubusercontent.com/dzsquared/sqlops-firstresponderkit/master/images/insightsTab.png)

-----------------------------------------------------------------------------------------------------------

## Extension Requirements

Internet connectivity is required for any of the "Import" commands, which connect to GitHub to fetch recent versions of the scripts.  A GitHub account is NOT required.

First Responder Kit scripts require SQL Server 2008 or newer.  See current requirements for the scripts at http://firstresponderkit.org/.

-----------------------------------------------------------------------------------------------------------

## Known Issues

No open issues at this time.

## Unknown Issues
Can be raised here: https://github.com/dzsquared/sqlops-firstresponderkit/issues

## Release Notes

### 0.6.0

- Fix for extension unable to pull scripts from GitHub. Change to utilizing `main` branch of First Responder Kit.
- Adds interactive documentation linking to status bar.

### 0.5.1

- Fix for changes to new editor connection changes in Azure Data Studio 1.15.0
- Extension bundled with webpack

### 0.5.0

- Improvement to version check process
- Moves from sqlops to azdata dependency
- Adds dashboard tab with insights widgets

### 0.4.0

- Adds sp_blitzlock and sp_whoisactive
- Adds version check for sp_blitz
- Adds single command to get sp_blitz and all associated scripts
- Adds menu items for object explorer for sp_blitz, sp_blitzindex, sp_blitzfirst, sp_blitzlock, and sp_whoisactive

### 0.3.0

- Adds code snippets for execute scripts
- Corrects sp_blitzindex execute script

### 0.2.0

- Script import and run commands automatically connect to current context

### 0.1.1

- Corrects base URL for scripts from dev to master branch of First Responder Kit

### 0.1.0

- Initial release.


-----------------------------------------------------------------------------------------------------------

## Special Thanks
A very important thank you to [Brent Ozar Unlimited](https://www.brentozar.com/) for supporting this extension.

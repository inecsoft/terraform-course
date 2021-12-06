# Contactless self-serve security

## Overview

To ensure the ongoing security compliance of the CSS project we run a security scan against our frontend application both periodically and upon deployment (code change). This scan runs automatically via the CodeBuild pipeline and accepts configuration files within this directory as input.

## Contents

- security-levels.conf: This file specifies how ZAProxy flags detected vulnerabilities. Anything above INFO will cause a failed build
- security-in-progress: Known issues which are being worked on can be added to this file. These will still appear as warnings, but won't fail the build
- security-scan-to-slack.sh: This is a shell script which the build pipeline uses to push the scan report to Slack. _It shouldn't be amended._

## Security workflow

ZAProxy is executed as part of the CI pipeline both periodically and when pull requests/changes are made to the CSS codebase. Configuration files from the security directory are used to identify and mute known issues, and can be used as detailed below.

Upon a successful scan no issues will be reported and the scan will pass. If any security warnings/failures are detected the build will fail, and a copy of the report will be sent to Slack for analysis.

## security-levels.conf

The security levels file maps known issues to a severity level, which in turn are used by the CI pipeline to determine whether to fail a build or not based on the detected vulnerability. Anything higher than INFO will fail a build (WARN/FAIL).

The file takes this format:

```bash
 # This is a comment line
10010  FAIL    (Cookie No HttpOnly Flag)
10041  WARN    (HTTP to HTTPS Insecure Transition in Form Post)
10038  INFO    (Content Security Policy (CSP) Header Not Set)
10097  IGNORE  (Hash Disclosure)
```

As above both "10010" and "10041" will cause a CI pipeline failure, as when detected they run FAIL/WARN. INFO/IGNORE statements will appear in the output, but will not cause a build failure.

If a particular check is consistantly returning false positives it can set to be ignored. This will ignore all instances of this issue appearing in future scans. It is very important to be careful when adding ignore statements, as this could prevent genuine issues being detected in future.

> Any changes to the security-levels.conf file need to be discussed with the wider team, and this shouldn't be amended by developers as part of a feature delivery.

## security-in-progress.json

Known issues which are being worked on (but can be ignored for the time being) can be added to this file. ZAProxy will still report these as failures/warnings, but will add an in-progress flag to them.

An example of this workflow is as follows:

```bash
// Pull request triggers build which fails with the following error being detected
FAIL-NEW: Application Error Disclosure [90022] x 1
FAIL-NEW: 1     FAIL-INPROG: 0  WARN-NEW: 0     WARN-INPROG: 0  INFO: 0 IGNORE: 0       PASS: 42
```

Any FAIL-NEW/WARN-NEW flags detected will fail the build. If you are submitting a pull request and a _valid_ security issue is detected, you must mark it as in progress or immediately resolve it and resubmit your pull request. To mark it as in progress add an entry to the security-in-progress.json file:

```javascript
{
  "site": "css-*.transport-for-greater-manchester.com",
  "issues": [
    {
      "id": "90022",
      "name": "Application Error Disclosure",
      "state": "inprogress",
      "link": "https://tfgmdev.atlassian.net/browse/CSS-123"
    }
  ]
}
```

An entry is added to the file as above, matching the id provided in the scan report (90022) and a memorable name. A link to the JIRA story opened for this issue needs to be added. The changes to the security-in-progress.json need to be pushed to your branch and the pull request resubmitted:

```bash
// Scan flags the in-progress secuirty failure but does not fail the build
FAIL-NEW: Application Error Disclosure [90022] x 1
FAIL-NEW: 0     FAIL-INPROG: 1  WARN-NEW: 0     WARN-INPROG: 0  INFO: 0 IGNORE: 0       PASS: 42
```

The failure now flags as in-progress and the build no longer fails. Once the issue has been resolved by the developer, they should remove this entry from the security-in-progress.json file and submit a pull request. ZAProxy should then not detect the issue when it runs as part of the CI pipeline.

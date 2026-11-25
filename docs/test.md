# Lexis Voice production

## SSH access

Connect as root:

    ssh root@77.67.89.201

Use the local SSH key at ~/.ssh/id_ed25519. Do not store its passphrase, any
password, API key, or token in this file, repository, or command output.

## Server paths

| Purpose | Path |
| --- | --- |
| Pipeline code | /opt/lexis-content-pipeline |
| Facts and content plan | /opt/lexis-handoff-konveyer |
| Production request data | /var/lib/lexis-content-pipeline |
| Environment secrets | /etc/lexis-content-pipeline.env |
| System service | lexis-content-pipeline.service |

Never display the secrets file. Never delete or overwrite production data.

## Read-only diagnostics

    systemctl is-active lexis-content-pipeline.service
    cd /opt/lexis-content-pipeline && git status --short --branch
    journalctl -u lexis-content-pipeline.service -n 50 --no-pager

If git is unavailable, treat it as a deployment blocker. Do not install or
replace it without an explicit decision.

## Code and deployment workflow

1. Check git status before changing code.
2. Use a dedicated branch and open a Pull Request in
   Classicart54/lexis-content-pipeline-bot.
3. Before pushing, run npm test and npm run build.
4. Deploy only after merge to main:

       cd /opt/lexis-content-pipeline
       git pull --ff-only
       npm ci
       npm run build
       systemctl restart lexis-content-pipeline.service

5. Then verify the service and its last 50 log lines.

## Last diagnostic

On 2026-11-19, SSH login succeeded and the service was active. Earlier logs
showed an error reading /opt/lexis-handoff-konveyer/fakty/temy.json.

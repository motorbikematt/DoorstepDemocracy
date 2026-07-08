param (
    [Parameter(Mandatory=$true)]
    [string]$SourceFile
)

$ErrorActionPreference = "Stop"

$sourcePath = Resolve-Path $SourceFile
$fileName = Split-Path $sourcePath -Leaf
$basename = [System.IO.Path]::GetFileNameWithoutExtension($fileName)

# Extract date if present, else use today
$date = Get-Date -Format "yyyy-MM-dd"
if ($basename -match "^(\d{4}-\d{2}-\d{2})-(.+)") {
    $date = $matches[1]
    $titleSlug = $matches[2]
} else {
    $titleSlug = $basename
}

$title = $titleSlug -replace "-", " " 
$title = (Get-Culture).TextInfo.ToTitleCase($title.ToLower())

$destDir = Join-Path $PSScriptRoot "..\build\_posts"
# The repo is doorstepdemocracy, so _posts is at the root
$repoRoot = Join-Path $PSScriptRoot ".."
$postsDir = Join-Path $repoRoot "_posts"
if (!(Test-Path $postsDir)) {
    New-Item -ItemType Directory -Path $postsDir | Out-Null
}

$destFile = Join-Path $postsDir "$date-$titleSlug.md"

$content = Get-Content $sourcePath -Raw

# Sanitize potential PII (Basic regex redactions)
# Redact emails
$content = $content -replace "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", "[REDACTED EMAIL]"
# Redact phone numbers (simple US formats)
$content = $content -replace "\b\d{3}[-.]?\d{3}[-.]?\d{4}\b", "[REDACTED PHONE]"
# Notes for operator to check names manually
Write-Host "WARNING: Automated PII removal for names/addresses is limited. Manually verify no real names or addresses remain!" -ForegroundColor Yellow

$frontMatter = @"
---
layout: post
title: "$title"
date: $date 12:00:00 -0400
---

"@

$newContent = $frontMatter + $content
Set-Content -Path $destFile -Value $newContent

Write-Host "Ingested journal to: $destFile" -ForegroundColor Green

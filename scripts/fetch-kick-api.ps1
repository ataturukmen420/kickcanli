# Fetch Kick API JSON (browser User-Agent required)
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
$root = Split-Path $PSScriptRoot -Parent
curl.exe -s -A $ua -H "Accept: application/json" -H "Referer: https://kick.com/ataturukmen" `
  "https://kick.com/api/v1/channels/ataturukmen" -o "$root\tmp-channel.json"
curl.exe -s -A $ua -H "Accept: application/json" -H "Referer: https://kick.com/ataturukmen" `
  "https://kick.com/api/v2/channels/ataturukmen/clips?sort=view&time=all" -o "$root\tmp-clips.json"
Write-Host "Fetched to tmp-channel.json and tmp-clips.json"
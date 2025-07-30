# Save this as show-structure.ps1
Write-Host "Frontend Structure:" -ForegroundColor Yellow
Get-ChildItem -Path "frontend" -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next|\.git" } |
    ForEach-Object {
        $indent = ($_.FullName.Split('\').Count - (Get-Location).Path.Split('\').Count - 1) * 2
        $spaces = " " * $indent
        if ($_.PSIsContainer) {
            Write-Host "$spaces📁 $($_.Name)" -ForegroundColor Cyan
        } else {
            Write-Host "$spaces📄 $($_.Name)" -ForegroundColor White
        }
    }
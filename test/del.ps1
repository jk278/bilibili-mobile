# 定义要处理的 HTML 文件路径
$htmlFilePath = "src\x.html"

# 读取 HTML 文件内容
$htmlContent = Get-Content -Path $htmlFilePath -Raw

# 使用正则表达式删除所有 SVG 元素
$pattern = "<svg[^>]*>.*?</svg>"
$updatedHtmlContent = [regex]::Replace($htmlContent, $pattern, "", [System.Text.RegularExpressions.RegexOptions]::Singleline)

# 将更新后的内容写回 HTML 文件
Set-Content -Path $htmlFilePath -Value $updatedHtmlContent

Write-Host "SVG elements have been removed from the HTML file."
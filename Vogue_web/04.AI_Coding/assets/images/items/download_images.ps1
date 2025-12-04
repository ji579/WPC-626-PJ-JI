# 이미지 다운로드 스크립트
$images = @(
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_67872513cff5f-759x500.jpg?x=1541&y=1200"; file="item_07.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_6787238ebac6e-759x500.jpg?x=1635&y=998"; file="item_08.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_678713e32014d-759x500.jpg?x=1521&y=931"; file="item_09.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_6785e4f170b7c-759x500.jpg"; file="item_10.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67a1ce7ba4f6c-960x1440.jpg?x=1966&y=1354"; file="item_11.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ac71ba41cf0-759x500.jpg?x=996&y=1167"; file="item_12.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ac6cefa6eed-759x500.jpg?x=1080&y=1291"; file="item_13.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67aafdbaba36a-759x500.jpeg?x=1440&y=1475"; file="item_14.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_678f10f132a91-759x500.jpg?x=4206&y=6582"; file="item_15.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ad66d4e82e0-960x1440.jpg?x=1200&y=1799"; file="item_16.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ad98a09fdad-759x500.jpg?x=1280&y=843"; file="item_17.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ad52148a6e0-759x500.jpg?x=1028&y=873"; file="item_18.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ac746e3783b-759x500.jpg?x=1200&y=790"; file="item_19.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ac6a5b15df6-759x500.jpg?x=2000&y=1709"; file="item_20.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_6791cf7c7c68d-960x1440.jpg"; file="item_21.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67a5b51741952-759x500.jpg?x=1600&y=1064"; file="item_22.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67a30be1a4b47-759x500.jpg?x=1977&y=1106"; file="item_23.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_679c956de240e-759x500.jpg"; file="item_24.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_679b3ba88a3f0-759x500.jpg?x=1620&y=1079"; file="item_25.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_679b11470c6d7-960x1440.jpg?x=6233&y=4000"; file="item_26.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ada6f867ec2-759x500.jpg"; file="item_27.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67adb6a1bffb5-759x500.jpg?x=1080&y=1091"; file="item_28.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67adaa3da45d6-759x500.jpeg?x=4096&y=2729"; file="item_29.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ada5b2d333e-759x500.jpeg"; file="item_30.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67ad5312acdc6-960x1440.jpg?x=2517&y=1080"; file="item_31.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/02/style_67a2fc3ba3a5c-759x500.jpeg?x=1713&y=1080"; file="item_32.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_67937c16eaf00-759x500.jpeg?x=1663&y=1080"; file="item_33.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2025/01/style_6791f913afe66-759x500.jpg?x=1647&y=1080"; file="item_34.jpg"},
    @{url="https://img.vogue.co.kr/vogue/2024/12/style_6769187239535-759x500.jpeg?x=1669&y=1080"; file="item_35.jpg"}
)

foreach ($image in $images) {
    Write-Host "Downloading $($image.file)..."
    try {
        Invoke-WebRequest -Uri $image.url -OutFile $image.file -ErrorAction Stop
        Write-Host "Successfully downloaded $($image.file)" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download $($image.file): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Download complete!"

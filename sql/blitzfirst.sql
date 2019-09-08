SELECT TOP 100 CheckDate
    , replace(replace(Details,'>','&gt;'),'<','&lt;') as Details
    , Finding
    , FindingsGroup
    , PRIORITY
FROM dbo.BlitzFirst
WHERE PRIORITY > 0
ORDER BY CHECKDATE DESC
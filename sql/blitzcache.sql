SELECT TOP 100 CheckDate
    , DatabaseName
    , QueryType
    , Warnings
    , left(QueryText,100) as [QueryText100]
    , [Query Hash More Info]
FROM dbo.BlitzCache
ORDER BY CHECKDATE DESC
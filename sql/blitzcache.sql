DECLARE @TOPCOUNT INT = CASE WHEN DB_NAME() = 'DBATools' THEN 100 ELSE 20 END

SELECT TOP (@TOPCOUNT) CheckDate
    , DatabaseName
    , QueryType
    , Warnings
    , left(QueryText,100) as [QueryText100]
    , [Query Hash More Info]
FROM DBATOOLS.dbo.BlitzCache
WHERE CASE WHEN db_name() = 'DBATools' THEN '' ELSE DATABASENAME END = CASE WHEN DB_NAME() = 'DBATools' THEN '' ELSE DB_NAME() END
ORDER BY CHECKDATE DESC
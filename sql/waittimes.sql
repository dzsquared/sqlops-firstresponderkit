DECLARE @TOPWAITS NVARCHAR(500) = ''

SELECT @TOPWAITS += QUOTENAME(wait_type)+ ','
FROM (
    SELECT top 3 WAIT_TYPE
    FROM dbo.BlitzFirst_WaitStats_Deltas
    GROUP BY wait_type
    ORDER BY SUM([wait_time_minutes_delta]) DESC
)AS WAITS
SET @TOPWAITS = LEFT(@TOPWAITS, LEN(@TOPWAITS)-1)

DECLARE @WAITQUERY NVARCHAR(MAX)

SET @WAITQUERY = '
SELECT * FROM (
    SELECT CheckDate
        , wait_type
        , wait_time_minutes_per_minute
    FROM BlitzFirst_WaitStats_Deltas WAITS
    WHERE WAIT_TYPE IN
        (SELECT top 3 [wait_type]
            FROM dbo.BlitzFirst_WaitStats_Deltas
            GROUP BY wait_type
            ORDER BY SUM([wait_time_minutes_delta]) DESC)
) WTS
PIVOT
    (SUM(WAIT_TIME_MINUTES_PER_MINUTE)
        FOR WAIT_TYPE IN 
        ('+@TOPWAITS+')
    ) AS WAITGRAPH;
'

EXECUTE SP_EXECUTESQL @WAITQUERY
SELECT top 10 [wait_type]
      , SUM([wait_time_minutes_delta]) AS [Minutes]
FROM dbo.BlitzFirst_WaitStats_Deltas
GROUP BY wait_type
ORDER BY MINUTES DESC
export const parseDatesAndSort = <T extends { date: string }>(
  xs: T[],
): T & { timestamp: Temporal.Instant } => {
  const res = xs.map((x) => {
    let date: Date | undefined;
    try {
      // Temporal.Instant is very picky about whitespace
      date = new Date(x.date);
      return {
        ...x,
        timestamp: Temporal.Instant.from(date.toISOString()),
      };
    } catch (err) {
      throw new Error(
        `Failed to parse timestamp: ${inspect(x.date)} (${date?.toISOString()})`,
        { cause: err },
      );
    }
  });
  // todo(maximsmol): use Instant.compare when available
  res.sort(
    (a, b) => -(a.timestamp.epochMilliseconds - b.timestamp.epochMilliseconds),
  );

  return res;
};

export const renderTime = (
  timestamp: Temporal.Instant,
  { tz, dateOnly = false }: { tz?: string; dateOnly?: boolean } = {},
) => {
  const time = tz != null ? timestamp.toZonedDateTimeISO(tz) : timestamp;

  return (
    <time
      // todo(maximsmol): add IXDTF suffix when supported
      datetime={timestamp.toString({
        timeZone: time.timeZoneId,
      })}
    >
      <span class="short">
        {new Intl.DateTimeFormat("en-US", {
          timeZone: time.timeZoneId,
          // We want `dateStyle: "short"` + `timeStyle: "short"` but with a time zone
          year: "2-digit",
          month: "numeric",
          day: "numeric",
          ...(!dateOnly
            ? {
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
              }
            : {}),
        }).format(timestamp)}
      </span>
      <span class="long">
        {new Intl.DateTimeFormat("en-US", {
          timeZone: time.timeZoneId,
          // We want `dateStyle: "long"`` + `timeStyle: "long"` but no seconds
          year: "numeric",
          month: "long",
          day: "numeric",
          ...(!dateOnly
            ? {
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
              }
            : {}),
        }).format(timestamp)}
      </span>
    </time>
  );
};
